"use client";

import Link from 'next/link';
import { ArrowLeft, Search, MessageCircle, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/src/components/ui/accordion';
import Header from '@/src/components/header';
import Footer from '@/src/components/footer';

export default function HelpPage() {
  const popularTopics = [
    { title: 'How to place a bid', href: '#bidding' },
    { title: 'Payment methods', href: '#payment' },
    { title: 'Shipping information', href: '#shipping' },
    { title: 'Return policy', href: '#returns' },
    { title: 'Account security', href: '#security' },
    { title: 'Seller fees', href: '#fees' }
  ];

  const faqItems = [
    {
      question: "How do I place a bid on an auction?",
      answer: "To place a bid, simply enter your maximum bid amount in the bid box on the auction page and click 'Place Bid'. Our system will automatically bid for you up to your maximum amount."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers. Payment is processed securely through our encrypted payment system."
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping times vary by seller and location. Most items are shipped within 1-3 business days after payment is received. You'll receive tracking information once your item ships."
    },
    {
      question: "Can I return an item if I'm not satisfied?",
      answer: "Return policies vary by seller. Check the item listing for specific return information. Most sellers offer 30-day returns for items not as described."
    },
    {
      question: "How do I contact a seller?",
      answer: "You can contact sellers through our messaging system. Go to the item page and click 'Contact Seller' or use the messaging feature in your dashboard."
    },
    {
      question: "What fees do sellers pay?",
      answer: "Sellers pay a listing fee and a final value fee when items sell. Fees vary by category and listing type. Check our fee structure page for detailed information."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft size={16} />
              <span>Back to AuctionHub</span>
            </Link>
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Help & Support</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers to your questions and get the help you need
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for help topics..."
              className="pl-12 h-12 text-lg"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          </div>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle>Live Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Chat with our support team in real-time
              </p>
              <Button className="w-full">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Phone className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle>Phone Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Call us for immediate assistance
              </p>
              <Button variant="outline" className="w-full">1-800-AUCTION</Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle>Email Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Send us a detailed message
              </p>
              <Button variant="outline" className="w-full">Send Email</Button>
            </CardContent>
          </Card>
        </div>

        {/* Popular Topics */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular Help Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularTopics.map((topic, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="p-4">
                  <Link href={topic.href} className="flex items-center justify-between">
                    <span className="font-medium">{topic.title}</span>
                    <ArrowLeft className="rotate-180" size={16} />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Support Hours */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Support Hours</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span>8:00 AM - 8:00 PM EST</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>9:00 AM - 6:00 PM EST</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>10:00 AM - 4:00 PM EST</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800 text-sm">We&lsquo;re currently online and ready to help!</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}