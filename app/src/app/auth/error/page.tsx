import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthErrorPage() {
	return (
		<div className="container flex min-h-screen flex-col items-center justify-center">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Authentication Error</CardTitle>
					<CardDescription>
						There was a problem with the authentication process.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col space-y-4">
						<p className="text-sm text-muted-foreground">
							Please try signing in again or contact support if the problem persists.
						</p>
						<Button asChild variant="outline">
							<Link href="/auth/login">Back to Sign In</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
