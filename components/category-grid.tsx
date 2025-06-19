import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/lib/mock-data';
import * as Icons from 'lucide-react';

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => {
        const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ComponentType<{ size?: number }>;
        
        return (
          <Link key={category.id} href={`/category/${category.slug}`}>
            <Card className="card-hover h-full">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-lg flex items-center justify-center">
                  {IconComponent && <IconComponent size={24} className="text-primary" />}
                </div>
                <h3 className="font-semibold text-sm mb-2">{category.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {category.count.toLocaleString()} items
                </Badge>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}