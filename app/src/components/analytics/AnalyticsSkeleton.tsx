import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AnalyticsSkeleton() {
	return (
		<div className="py-6 w-full">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
				<div className="flex justify-between items-center mb-6">
					<Skeleton className="h-8 w-32" />
					<Skeleton className="h-9 w-24" />
				</div>

				{/* Monthly Trends Skeleton */}
				<Card className="mb-6">
					<CardHeader>
						<CardTitle>
							<Skeleton className="h-6 w-40" />
						</CardTitle>
						<Skeleton className="h-4 w-60" />
					</CardHeader>
					<CardContent>
						<div className="h-[300px] flex items-center justify-center">
							<Skeleton className="h-full w-full" />
						</div>
					</CardContent>
				</Card>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Campaign Categories Skeleton */}
					<Card>
						<CardHeader>
							<CardTitle>
								<Skeleton className="h-6 w-40" />
							</CardTitle>
							<Skeleton className="h-4 w-60" />
						</CardHeader>
						<CardContent>
							<div className="h-[300px] flex items-center justify-center">
								<Skeleton className="h-full w-full rounded-full" />
							</div>
						</CardContent>
					</Card>

					{/* Donor Retention Skeleton */}
					<Card>
						<CardHeader>
							<CardTitle>
								<Skeleton className="h-6 w-40" />
							</CardTitle>
							<Skeleton className="h-4 w-60" />
						</CardHeader>
						<CardContent>
							<div className="h-[300px] flex items-center justify-center">
								<Skeleton className="h-full w-full" />
							</div>
						</CardContent>
					</Card>

					{/* Geographic Distribution Skeleton */}
					<Card className="md:col-span-2">
						<CardHeader>
							<CardTitle>
								<Skeleton className="h-6 w-40" />
							</CardTitle>
							<Skeleton className="h-4 w-60" />
						</CardHeader>
						<CardContent>
							<div className="h-[300px] flex items-center justify-center">
								<Skeleton className="h-full w-full" />
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
