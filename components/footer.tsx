import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-primary">AuctionHub</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Your premier destination for online auctions and marketplace trading. 
              Buy, sell, and bid with confidence.
            </p>
            <div className="flex space-x-3">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors">All Categories</Link></li>
              <li><Link href="/help" className="text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="/sell" className="text-muted-foreground hover:text-primary transition-colors">Start Selling</Link></li>
              <li><Link href="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link href="/mobile" className="text-muted-foreground hover:text-primary transition-colors">Mobile App</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/customer-service" className="text-muted-foreground hover:text-primary transition-colors">Customer Service</Link></li>
              <li><Link href="/dispute-resolution" className="text-muted-foreground hover:text-primary transition-colors">Dispute Resolution</Link></li>
              <li><Link href="/buying-guide" className="text-muted-foreground hover:text-primary transition-colors">Buying Guide</Link></li>
              <li><Link href="/selling-guide" className="text-muted-foreground hover:text-primary transition-colors">Selling Guide</Link></li>
              <li><Link href="/safety" className="text-muted-foreground hover:text-primary transition-colors">Safety Center</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/user-agreement" className="text-muted-foreground hover:text-primary transition-colors">User Agreement</Link></li>
              <li><Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link></li>
              <li><Link href="/accessibility" className="text-muted-foreground hover:text-primary transition-colors">Accessibility</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} AuctionHub. All rights reserved.</p>
          <p>Made with ❤️ for auction enthusiasts worldwide</p>
        </div>
      </div>
    </footer>
  );
}