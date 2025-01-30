import { SignInForm } from "@/components/auth/SignInForm";
import Link from "next/link";

export default function LoginPage() {
	return (
		<div className="container flex min-h-screen flex-col items-center justify-center">
			<div className="mx-auto flex w-full flex-col justify-center space-y-6">
				<div className="flex flex-col space-y-2 text-center">
					<h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
					<p className="text-sm text-muted-foreground">
						Sign in to your NGO account to manage campaigns
					</p>
				</div>
				<SignInForm />
				<p className="px-8 text-center text-sm text-muted-foreground">
					Don&apos;t have an account?{" "}
					<Link
						href="/auth/register"
						className="underline underline-offset-4 hover:text-primary"
					>
						Register your NGO
					</Link>
				</p>
			</div>
		</div>
	);
}
