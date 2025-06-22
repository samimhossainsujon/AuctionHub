import Link from 'next/link';
import { ArrowRight, TrendingUp, Shield, Clock, Users } from 'lucide-react';
import Header from '../components/header';
import { Button } from '../components/ui/button';
import { featuredAuctions, recentAuctions } from '../lib/mock-data';
import AuctionCard from '../components/auction-card';
import CategoryGrid from '../components/category-grid';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import Footer from '../components/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-hero text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Amazing <br />
            <span className="text-yellow-300">Auction Deals</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Join millions of buyers and sellers in the world&lsquo;s largest online auction marketplace. 
            Find unique items, great deals, and sell your treasures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/categories">Start Shopping</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link href="/sell">Start Selling</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">2.5M+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Live Auctions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99.2%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Auctions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Auctions</h2>
              <p className="text-muted-foreground">Handpicked premium items ending soon</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/auctions" className="flex items-center space-x-2">
                <span>View All</span>
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAuctions.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our diverse range of categories and find exactly what you&#39;re looking for
            </p>
          </div>
          <CategoryGrid />
        </div>
      </section>

      {/* Recent Auctions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Recently Listed</h2>
              <p className="text-muted-foreground">Fresh items just added to our marketplace</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/auctions?sort=newest" className="flex items-center space-x-2">
                <span>View All</span>
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentAuctions.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose AuctionHub?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide a secure, reliable, and user-friendly platform for all your auction needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Secure Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Advanced security measures and buyer protection ensure safe transactions
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Real-time Bidding</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Live bidding system with instant updates and notifications
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Global Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Connect with millions of buyers and sellers worldwide
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Best Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Competitive bidding ensures you get the best value for money
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Auction Journey?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join our community today and discover amazing deals or turn your items into cash
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">Join for Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link href="/sell">List Your First Item</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}