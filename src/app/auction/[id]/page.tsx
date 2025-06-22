import { featuredAuctions } from '@/src/lib/mock-data';
import AuctionDetailPageClient from '@/src/components/auction-detail-page';

export async function generateStaticParams() {
  return featuredAuctions.map((auction) => ({
    id: auction.id,
  }));
}

export default function AuctionDetailPage({ params }: { params: { id: string } }) {
  const auction = featuredAuctions.find(a => a.id === params.id);

  return <AuctionDetailPageClient auction={auction} />;
}