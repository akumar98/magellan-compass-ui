import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2, MapPin, DollarSign, Tag } from 'lucide-react';
import { useState } from 'react';

export default function RewardsCatalog() {
  const [searchTerm, setSearchTerm] = useState('');

  const rewards = [
    { id: '1', title: 'Weekend in Paris', category: 'Urban', destination: 'Paris, France', points: 500, status: 'active', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400' },
    { id: '2', title: 'Bali Wellness Retreat', category: 'Wellness', destination: 'Bali, Indonesia', points: 1200, status: 'active', imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400' },
    { id: '3', title: 'Swiss Alps Skiing', category: 'Mountain', destination: 'Swiss Alps', points: 1500, status: 'active', imageUrl: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=400' },
    { id: '4', title: 'Tokyo Food Tour', category: 'Cultural', destination: 'Tokyo, Japan', points: 800, status: 'active', imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400' },
    { id: '5', title: 'Barcelona Beach Escape', category: 'Beach', destination: 'Barcelona, Spain', points: 600, status: 'draft', imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400' },
  ];

  const filteredRewards = rewards.filter(reward =>
    reward.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reward.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reward.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Rewards Catalog</h1>
            <p className="text-muted-foreground">Manage travel experiences and rewards</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Reward
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold mb-1">{rewards.length}</p>
                <p className="text-sm text-muted-foreground">Total Rewards</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold mb-1">{rewards.filter(r => r.status === 'active').length}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold mb-1">{rewards.filter(r => r.status === 'draft').length}</p>
                <p className="text-sm text-muted-foreground">Drafts</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold mb-1">{new Set(rewards.map(r => r.category)).size}</p>
                <p className="text-sm text-muted-foreground">Categories</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search rewards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRewards.map((reward) => (
                <Card key={reward.id} className="overflow-hidden hover-lift">
                  <div className="relative h-48">
                    <img
                      src={reward.imageUrl}
                      alt={reward.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 right-3" variant={reward.status === 'active' ? 'default' : 'secondary'}>
                      {reward.status}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{reward.title}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{reward.destination}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        <span>{reward.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-semibold text-primary">{reward.points} points</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
