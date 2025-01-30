"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { useAppKitAccount } from "@reown/appkit/react";

interface AuthUser extends User {
	user_metadata: {
		organization_name?: string;
		organization_type?: string;
		wallet_address?: string;
	};
}

interface AuthContextType {
	user: AuthUser | null;
	session: Session | null;
	isLoading: boolean;
	isNgo: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (
		email: string,
		password: string,
		metadata: NgoMetadata
	) => Promise<void>;
	signOut: () => Promise<void>;
	updateProfile: (metadata: Partial<NgoMetadata>) => Promise<void>;
}

interface NgoMetadata {
	organization_name: string;
	organization_type: string;
	wallet_address: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [session, setSession] = useState<Session | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();
	const { isConnected, address } = useAppKitAccount();

	const supabase = createClient();

	// Check if user is an NGO
	const isNgo = Boolean(
		user?.user_metadata.organization_name &&
			user?.user_metadata.organization_type &&
			user?.user_metadata.wallet_address
	);

	useEffect(() => {
		// Get initial session
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setUser((session?.user as AuthUser) || null);
			setIsLoading(false);
		});

		// Listen for auth changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setUser((session?.user as AuthUser) || null);
			setIsLoading(false);
		});

		return () => subscription.unsubscribe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const signUp = async (
		email: string,
		password: string,
		metadata: NgoMetadata
	) => {
		if (!isConnected || !address) {
			throw new Error("Please connect your wallet first");
		}

		if (address !== metadata.wallet_address) {
			throw new Error("Connected wallet does not match provided wallet address");
		}

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: metadata,
			},
		});

		if (error) throw error;
		router.push("/auth/verify-email");
	};

	const signIn = async (email: string, password: string) => {
		if (!isConnected || !address) {
			throw new Error("Please connect your wallet first");
		}

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) throw error;

		// Verify wallet matches
		if (data.user.user_metadata.wallet_address !== address) {
			await supabase.auth.signOut();
			throw new Error("Connected wallet does not match registered wallet");
		}

		router.push("/(dashboard)/dashboard");
	};

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) throw error;
		router.push("/");
	};

	const updateProfile = async (metadata: Partial<NgoMetadata>) => {
		const { error } = await supabase.auth.updateUser({
			data: metadata,
		});

		if (error) throw error;
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				session,
				isLoading,
				isNgo,
				signIn,
				signUp,
				signOut,
				updateProfile,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
