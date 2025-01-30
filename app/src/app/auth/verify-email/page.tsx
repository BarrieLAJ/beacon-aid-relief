import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function VerifyEmailPage() {
	return (
		<div className="container flex min-h-screen flex-col items-center justify-center">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Check your email</CardTitle>
					<CardDescription>
						We sent you a verification link. Please check your email to verify your
						account.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col space-y-4">
						<p className="text-sm text-muted-foreground">
							Once verified, you can sign in to your account and start managing
							campaigns.
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
