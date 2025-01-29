# Beacon Aid Relief

A decentralized humanitarian aid platform built on Solana, enabling transparent and efficient fundraising for NGOs and aid organizations.

## Overview

Beacon Aid Relief is a full-stack Web3 application that combines the power of Solana blockchain with a modern web interface to create a transparent, efficient, and secure platform for humanitarian aid fundraising.

## Features

- **Decentralized Fundraising**: Create and manage fundraising campaigns on Solana blockchain
- **Transparent Donations**: Track all donations and fund movements on-chain
- **NGO Authentication**: Secure authentication system for verified NGOs and aid organizations
- **Real-time Updates**: Live tracking of campaign progress and donations
- **Secure Withdrawals**: Smart contract-based withdrawal system for campaign creators

## Tech Stack

### Backend (Solana Program)

- Solana Blockchain
- Anchor Framework
- Rust

### Frontend (Web Application)

- Next.js 15 (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui Components
- Supabase (Database & Auth)

### Blockchain Integration

- Reown AppKit
- @solana/web3.js
- @project-serum/anchor

## Project Structure

```
beacon-aid-relief/
├── app/                    # Next.js web application
│   ├── src/
│   │   ├── app/           # Next.js app router pages
│   │   ├── components/    # React components
│   │   ├── services/      # Business logic & blockchain interactions
│   │   └── integrations/  # External service integrations
├── programs/              # Solana programs
│   └── beacon-aid-relief/ # Main Solana program
└── tests/                 # Program tests
```

## Prerequisites

- Node.js 16+
- Rust and Cargo
- Solana CLI Tools
- Anchor CLI
- Git

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/BarrieLAJ/beacon-aid-relief.git
   cd beacon-aid-relief
   ```

2. **Install dependencies**

   ```bash
   # Install Solana program dependencies
   cd programs/beacon-aid-relief
   cargo build

   # Install web app dependencies
   cd ../../app
   yarn install
   ```

3. **Set up local Solana validator**

   ```bash
   solana-test-validator
   ```

4. **Build and deploy Solana program**

   ```bash
   anchor build
   anchor deploy
   ```

5. **Start the web application**
   ```bash
   yarn dev
   ```

## Development Setup

1. **Solana Development Environment**

   - Install Solana CLI tools: https://docs.solana.com/cli/install-solana-cli-tools
   - Install Anchor: `cargo install --git https://github.com/project-serum/anchor anchor-cli --locked`
   - Set up a local wallet: `solana-keygen new`

2. **Environment Variables**
   Create a `.env.local` file in the `app` directory:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SOLANA_NETWORK=devnet
   ```

3. **Database Setup**
   - Set up a Supabase project
   - Run the database migrations
   - Configure RLS policies

## Testing

### Solana Program Tests

```bash
anchor test
```

## Deployment

1. **Deploy Solana Program**

   ```bash
   anchor build
   anchor deploy --provider.cluster devnet
   ```

2. **Deploy Web Application**
   ```bash
   cd app
   yarn build
   yarn start
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
