import { useState, useEffect } from "react";
import { fetchAnalyticsData } from "@/lib/queries/analytics";
import type { AnalyticsData } from "@/types/analytics";

export function useAnalytics(initialStartDate?: Date, initialEndDate?: Date) {
	const [data, setData] = useState<AnalyticsData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [dateRange, setDateRange] = useState({
		start:
			initialStartDate || new Date(new Date().setMonth(new Date().getMonth() - 6)),
		end: initialEndDate || new Date(),
	});

	async function fetchData() {
		try {
			setIsLoading(true);
			setIsError(false);
			setError(null);
			const analyticsData = await fetchAnalyticsData(
				dateRange.start,
				dateRange.end
			);
			setData(analyticsData);
		} catch (err) {
			setIsError(true);
			setError(
				err instanceof Error ? err : new Error("Failed to fetch analytics data")
			);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchData();
	}, [dateRange.start, dateRange.end]);

	const refetch = () => fetchData();

	return {
		data,
		isLoading,
		isError,
		error,
		dateRange,
		setDateRange,
		refetch,
	};
}
