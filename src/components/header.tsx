"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingCart, User, Menu, Bell, MessageSquare } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Badge } from '@/src/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/src/components/ui/sheet';
import { useAuth } from '@/src/lib/auth-context';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 text-sm text-muted-foreground">
          <div className="hidden md:flex items-center space-x-4">
            <span>Welcome to AuctionHub</span>
            <Link href="/help" className="hover:text-foreground transition-colors">Help & Contact</Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-1 hover:text-foreground transition-colors">
                  <User size={14} />
                  <span>Hi, {user.name}!</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard?tab=selling">Selling</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard?tab=buying">Buying</Link>
                  </DropdownMenuItem>
                  {user.role === 'admin' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin">Admin Panel</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" className="hover:text-foreground transition-colors">Sign In</Link>
                <span>|</span>
                <Link href="/register" className="hover:text-foreground transition-colors">Register</Link>
              </div>
            )}
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-primary">AuctionHub</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-6">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-12"
              />
              <Button size="sm" className="absolute right-1 top-1/2 -translate-y-1/2">
                <Search size={16} />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {user && (
              <>
                <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-1">
                  <MessageSquare size={16} />
                  <span className="hidden lg:inline">Messages</span>
                  <Badge variant="destructive" className="ml-1 px-1 min-w-[16px] h-4 text-xs">3</Badge>
                </Button>
                <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-1">
                  <Bell size={16} />
                  <span className="hidden lg:inline">Alerts</span>
                  <Badge variant="destructive" className="ml-1 px-1 min-w-[16px] h-4 text-xs">2</Badge>
                </Button>
                <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-1">
                  <Heart size={16} />
                  <span className="hidden lg:inline">Watchlist</span>
                  <Badge variant="secondary" className="ml-1 px-1 min-w-[16px] h-4 text-xs">12</Badge>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <ShoppingCart size={16} />
                  <span className="hidden lg:inline">Cart</span>
                  <Badge variant="secondary" className="ml-1 px-1 min-w-[16px] h-4 text-xs">1</Badge>
                </Button>
              </>
            )}
            
            <Button asChild className="hidden md:inline-flex">
              <Link href="/sell">Sell</Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu size={16} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search for anything..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-12"
                    />
                    <Button size="sm" className="absolute right-1 top-1/2 -translate-y-1/2">
                      <Search size={16} />
                    </Button>
                  </div>
                  {user ? (
                    <>
                      <Button variant="outline" asChild>
                        <Link href="/dashboard">Dashboard</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/dashboard?tab=messages">Messages</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/dashboard?tab=buying">Watchlist</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/sell">Sell an Item</Link>
                      </Button>
                      <Button variant="ghost" onClick={logout}>Sign Out</Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" asChild>
                        <Link href="/login">Sign In</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/register">Register</Link>
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}