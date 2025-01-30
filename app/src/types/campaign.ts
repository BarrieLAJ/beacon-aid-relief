export interface Campaign {
	id: string;
	title: string;
	goal: number;
	raised: number;
	status: "active" | "completed" | "cancelled";
	donors: number;
	created: string;
}

export interface CampaignResponse {
	id: string;
	title: string;
	goal: number;
	raised: number;
	status: string;
	created_at: string;
	donations: Array<{ donor_id: string }>;
}
