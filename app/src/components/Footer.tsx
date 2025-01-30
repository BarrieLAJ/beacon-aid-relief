"use client";

import Link from "next/link";
import { Github, Twitter, Facebook } from "lucide-react";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-beacon-800 text-white mt-20">
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* About Section */}
					<div className="space-y-4">
						<h3 className="text-xl font-semibold">BeaconAid</h3>
						<p className="text-beacon-100 text-sm">
							Empowering disaster relief through blockchain technology. Making
							emergency aid more transparent, efficient, and accessible.
						</p>
					</div>

					{/* Quick Links */}
					<div className="space-y-4">
						<h3 className="text-xl font-semibold">Quick Links</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/campaigns"
									className="text-beacon-100 hover:text-white transition-colors"
								>
									Active Campaigns
								</Link>
							</li>
							<li>
								<Link
									href="/dashboard"
									className="text-beacon-100 hover:text-white transition-colors"
								>
									Start Campaign
								</Link>
							</li>
							<li>
								<Link
									href="/dashboard"
									className="text-beacon-100 hover:text-white transition-colors"
								>
									Dashboard
								</Link>
							</li>
						</ul>
					</div>

					{/* Resources */}
					<div className="space-y-4">
						<h3 className="text-xl font-semibold">Resources</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/about"
									className="text-beacon-100 hover:text-white transition-colors"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="/faq"
									className="text-beacon-100 hover:text-white transition-colors"
								>
									FAQ
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="text-beacon-100 hover:text-white transition-colors"
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>

					{/* Connect */}
					<div className="space-y-4">
						<h3 className="text-xl font-semibold">Connect</h3>
						<div className="flex space-x-4">
							<a
								href="https://github.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-beacon-100 hover:text-white transition-colors"
							>
								<Github className="h-6 w-6" />
							</a>
							<a
								href="https://twitter.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-beacon-100 hover:text-white transition-colors"
							>
								<Twitter className="h-6 w-6" />
							</a>
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-beacon-100 hover:text-white transition-colors"
							>
								<Facebook className="h-6 w-6" />
							</a>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-beacon-700 mt-8 pt-8 text-center text-beacon-100 text-sm">
					<p>© {currentYear} BeaconAid. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};
export default Footer;
