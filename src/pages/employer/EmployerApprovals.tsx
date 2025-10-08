import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Check, X, MessageSquare, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { toast } from 'sonner';

interface RewardRequest {
  id: number;
  employeeName: string;
  employeeAvatar: string;
  department: string;
  requestDate: string;
  rewardTitle: string;
  rewardImage: string;
  level: string;
  tier: string;
  points: number;
  estimatedValue: number;
  suggestedReason: string;
  status: 'pending' | 'approved' | 'declined';
}

export default function EmployerApprovals() {
  const [requests, setRequests] = useState<RewardRequest[]>([
    {
      id: 1,
      employeeName: 'Sarah Johnson',
      employeeAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      department: 'Marketing',
      requestDate: '2 hours ago',
      rewardTitle: 'Alpine Spa Escape',
      rewardImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400',
      level: 'Level 3',
      tier: 'High Tier',
      points: 8500,
      estimatedValue: 750,
      suggestedReason: 'Suggested based on stress risk + milestone completion',
      status: 'pending'
    },
    {
      id: 2,
      employeeName: 'Michael Chen',
      employeeAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      department: 'Engineering',
      requestDate: '1 day ago',
      rewardTitle: 'Tech Summit Pass',
      rewardImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
      level: 'Level 2',
      tier: 'Mid Tier',
      points: 5200,
      estimatedValue: 499,
      suggestedReason: 'Suggested based on skill development pattern + interests',
      status: 'pending'
    },
    {
      id: 3,
      employeeName: 'David Wilson',
      employeeAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      department: 'Sales',
      requestDate: '3 hours ago',
      rewardTitle: 'Tropical Getaway',
      rewardImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
      level: 'Level 4',
      tier: 'Premium',
      points: 12000,
      estimatedValue: 1200,
      suggestedReason: 'Suggested based on burnout risk + quarterly target achievement',
      status: 'pending'
    },
    {
      id: 4,
      employeeName: 'Emma Rodriguez',
      employeeAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      department: 'Customer Success',
      requestDate: 'yesterday',
      rewardTitle: 'Wellness Retreat',
      rewardImage: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400',
      level: 'Level 2',
      tier: 'Mid Tier',
      points: 4800,
      estimatedValue: 450,
      suggestedReason: 'Suggested based on work-life balance goals + milestone',
      status: 'approved'
    },
    {
      id: 5,
      employeeName: 'James Taylor',
      employeeAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
      department: 'IT Support',
      requestDate: '2 days ago',
      rewardTitle: 'Racing Experience',
      rewardImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400',
      level: 'Level 3',
      tier: 'High Tier',
      points: 9200,
      estimatedValue: 850,
      suggestedReason: 'Manual request - not eligible for current milestone level',
      status: 'declined'
    },
  ]);

  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const handleApprove = (id: number) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'approved' as const } : req
    ));
    toast.success('Reward request approved');
  };

  const handleDecline = (id: number) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'declined' as const } : req
    ));
    toast.error('Reward request declined');
  };

  const filteredRequests = requests.filter(req => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return req.status === 'pending';
    if (activeTab === 'approved') return req.status === 'approved';
    if (activeTab === 'declined') return req.status === 'declined';
    return true;
  });

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const declinedCount = requests.filter(r => r.status === 'declined').length;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Reward Approvals</h1>
            <p className="text-muted-foreground">Review and manage employee reward requests</p>
          </div>
          <Button>Bulk Approve</Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Side - Requests List */}
          <div className="lg:col-span-3 space-y-4">
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList>
                <TabsTrigger value="all">
                  All <Badge variant="secondary" className="ml-2">{requests.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pending <Badge variant="secondary" className="ml-2 bg-warning/10 text-warning">{pendingCount}</Badge>
                </TabsTrigger>
                <TabsTrigger value="approved">
                  Approved <Badge variant="secondary" className="ml-2 bg-success/10 text-success">{approvedCount}</Badge>
                </TabsTrigger>
                <TabsTrigger value="declined">
                  Declined <Badge variant="secondary" className="ml-2 bg-destructive/10 text-destructive">{declinedCount}</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Search and Filters */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by employee or reward..." className="pl-10" />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by: Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Sort by: Date</SelectItem>
                  <SelectItem value="value">Sort by: Value</SelectItem>
                  <SelectItem value="employee">Sort by: Employee</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            {/* Requests List */}
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <Card key={request.id} className="p-4">
                  <div className="flex gap-4">
                    {/* Employee Info */}
                    <div className="flex items-start gap-3 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={request.employeeAvatar} />
                        <AvatarFallback>{request.employeeName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{request.employeeName}</h3>
                        <p className="text-sm text-muted-foreground">{request.department}</p>
                        <p className="text-xs text-muted-foreground mt-1">Requested {request.requestDate}</p>
                      </div>
                    </div>

                    {/* Reward Info */}
                    <div className="flex gap-4 flex-1">
                      <img 
                        src={request.rewardImage} 
                        alt={request.rewardTitle}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{request.rewardTitle}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className={
                            request.tier === 'High Tier' ? 'bg-purple-100 text-purple-700' :
                            request.tier === 'Premium' ? 'bg-blue-100 text-blue-700' :
                            'bg-teal-100 text-teal-700'
                          }>
                            {request.level} - {request.tier}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{request.points.toLocaleString()} points</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                          <span className="text-primary">●</span> {request.suggestedReason}
                        </p>
                      </div>
                    </div>

                    {/* Value and Actions */}
                    <div className="flex flex-col items-end justify-between">
                      <div className="text-right">
                        <p className="text-2xl font-bold">${request.estimatedValue}</p>
                        <p className="text-xs text-muted-foreground">Estimated Value</p>
                      </div>
                      
                      {request.status === 'pending' ? (
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-success hover:text-success"
                            onClick={() => handleApprove(request.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => handleDecline(request.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Badge variant={request.status === 'approved' ? 'default' : 'destructive'}>
                          {request.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Side - Approval Summary */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Approval Summary</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Pending Requests</span>
                    <span className="font-bold">{pendingCount}</span>
                  </div>
                  <div className="h-2 bg-warning/20 rounded-full overflow-hidden">
                    <div className="h-full bg-warning" style={{ width: `${(pendingCount / requests.length) * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Approved This Month</span>
                    <span className="font-bold">14</span>
                  </div>
                  <div className="h-2 bg-success/20 rounded-full overflow-hidden">
                    <div className="h-full bg-success" style={{ width: '70%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Declined This Month</span>
                    <span className="font-bold">3</span>
                  </div>
                  <div className="h-2 bg-destructive/20 rounded-full overflow-hidden">
                    <div className="h-full bg-destructive" style={{ width: '15%' }} />
                  </div>
                </div>

                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Average Value of Requests</span>
                    <span className="font-bold">$685</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Pending Value</span>
                    <span className="font-bold">$5,480</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Fastest Turnaround</span>
                    <span className="font-bold">1.2 hours</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Request Distribution</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-purple-500" />
                  <span className="text-sm flex-1">Level 1 (Explorer)</span>
                  <span className="font-semibold">2</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-teal-500" />
                  <span className="text-sm flex-1">Level 2 (Voyager)</span>
                  <span className="font-semibold">5</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-sm flex-1">Level 3 (Pioneer)</span>
                  <span className="font-semibold">4</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <span className="text-sm flex-1">Level 4 (Navigator)</span>
                  <span className="font-semibold">1</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary/5">
              <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
                <span className="text-primary">✨</span> AI Insight
              </h3>
              <p className="text-sm text-muted-foreground">
                Approval rates for Level 3 rewards are 22% higher than last quarter, 
                indicating improved employee milestone achievement.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
