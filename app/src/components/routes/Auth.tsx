"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const Auth = () => {
	return (
		<div className="min-h-screen pt-16 pb-12 flex flex-col items-center">
			<Card className="w-full max-w-md mx-4">
				<CardHeader>
					<CardTitle>Login</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="space-y-2">
							<Input type="email" placeholder="Email" disabled />
						</div>
						<div className="space-y-2">
							<Input type="password" placeholder="Password" disabled />
						</div>
						<Button className="w-full bg-beacon-600 hover:bg-beacon-700" disabled>
							Sign In
						</Button>
						<Link href="/">
							<Button variant="ghost" className="w-full">
								Back to Home
							</Button>
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Auth;
