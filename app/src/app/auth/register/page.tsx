import { SignUpForm } from "@/components/auth/SignUpForm";
import Link from "next/link";

export default function RegisterPage() {
	return (
		<div className="container flex min-h-screen flex-col items-center justify-center">
			<div className="mx-auto flex w-full flex-col justify-center space-y-6">
				<div className="flex flex-col space-y-2 text-center">
					<h1 className="text-2xl font-semibold tracking-tight">
						Register your NGO
					</h1>
					<p className="text-sm text-muted-foreground">
						Create an account to start managing campaigns
					</p>
				</div>
				<SignUpForm />
				<p className="px-8 text-center text-sm text-muted-foreground">
					Already have an account?{" "}
					<Link
						href="/auth/login"
						className="underline underline-offset-4 hover:text-primary"
					>
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
}
