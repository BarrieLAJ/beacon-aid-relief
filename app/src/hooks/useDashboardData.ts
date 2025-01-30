import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "@/lib/queries/dashboard";

export function useDashboardData() {
	return useQuery({
		queryKey: ["dashboard"],
		queryFn: fetchDashboardData,
		refetchInterval: 30000, // Refetch every 30 seconds
		staleTime: 10000, // Consider data stale after 10 seconds
	});
}
