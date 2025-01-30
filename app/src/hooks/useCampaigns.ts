import { useQuery } from "@tanstack/react-query";
import { fetchUserCampaigns } from "@/lib/queries/campaigns";

export function useCampaigns() {
	return useQuery({
		queryKey: ["campaigns"],
		queryFn: fetchUserCampaigns,
		refetchInterval: 30000, // Refetch every 30 seconds
		staleTime: 10000, // Consider data stale after 10 seconds
	});
}
