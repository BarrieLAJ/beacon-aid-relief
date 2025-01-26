use anchor_lang::prelude::*;
// use anchor_lang::solana_program::system_program;

declare_id!("BhENLVpEECmmibKWHiHKCxch3Q6FHTJ42faPASkLWSMS");

#[program]
pub mod beacon_aid_relief {
    use super::*;

    // Function to initialize a new fundraising campaign
    pub fn create_campaign(
        ctx: Context<CreateCampaign>,
        name: String,
        description: String,
        goal: u64,
    ) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;
        campaign.creator = *ctx.accounts.creator.key;
        campaign.name = name;
        campaign.description = description;
        campaign.goal = goal;
        campaign.raised_amount = 0;
        Ok(())
    }

    // Function to allow users to donate to a campaign
    pub fn donate(ctx: Context<Donate>, amount: u64) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;

        // Transfer the donation to the campaign
        let cpi_accounts = anchor_lang::system_program::Transfer {
            from: ctx.accounts.donor.to_account_info(),
            to: campaign.to_account_info(),
        };
        let _cpi_ctx = CpiContext::new(ctx.accounts.system_program.to_account_info(), cpi_accounts);
        anchor_lang::solana_program::program::invoke(
            &anchor_lang::solana_program::system_instruction::transfer(
                ctx.accounts.donor.key,
                &campaign.key(),
                amount,
            ),
            &[
                ctx.accounts.donor.to_account_info(),
                campaign.to_account_info(),
            ],
        )?;
        campaign.raised_amount += amount;
        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>) -> Result<()> {
        // Ensure the caller is the campaign creator
        require!(
            ctx.accounts.campaign.creator == *ctx.accounts.creator.key,
            CampaignError::Unauthorized
        );

        // Calculate the campaign balance and the amount to withdraw
        let campaign_balance = **ctx.accounts.campaign.to_account_info().lamports.borrow();
        let amount_to_withdraw = ctx.accounts.campaign.raised_amount;

        // Ensure sufficient funds
        require!(
            campaign_balance >= amount_to_withdraw,
            CampaignError::InsufficientFunds
        );

        // Perform lamports transfer safely
        {
            // Separate mutable borrowing scope for lamports update
            let campaign_account_info = ctx.accounts.campaign.to_account_info();
            let creator_account_info = ctx.accounts.creator.to_account_info();

            **creator_account_info.try_borrow_mut_lamports()? += amount_to_withdraw;
            **campaign_account_info.try_borrow_mut_lamports()? -= amount_to_withdraw;
        }

        // After lamport transfer, update the raised amount
        ctx.accounts.campaign.raised_amount = 0;

        Ok(())
    }
}

// Define the campaign account structure
#[account]
pub struct Campaign {
    pub creator: Pubkey,     // Public key of the campaign creator
    pub name: String,        // Campaign name
    pub description: String, // Description of the campaign
    pub goal: u64,           // Fundraising goal in lamports
    pub raised_amount: u64,  // Amount raised so far
}

// Context for creating a campaign
#[derive(Accounts)]
pub struct CreateCampaign<'info> {
    #[account(init, payer = creator, space = 8 + 32 + 4 + 64 + 4 + 1024 + 8 + 8)]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// Context for donating to a campaign
#[derive(Accounts)]
pub struct Donate<'info> {
    #[account(mut)]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub donor: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// Context for withdrawing funds
#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut, has_one = creator)]
    pub campaign: Account<'info, Campaign>,
    pub creator: Signer<'info>,
}

#[error_code]
pub enum CampaignError {
    #[msg("Unauthorized access.")]
    Unauthorized,
    InsufficientFunds,     // When the balance is not enough to withdraw
    InvalidDonationAmount, // When the donation amount is zero or negative
}
