import Footer from "@/components/Footer";

export default function WebsiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<main className="min-h-[calc(100vh-4rem)]">{children}</main>
			<Footer />
		</>
	);
}
