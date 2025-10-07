import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ClipboardCheck, Check, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';

interface ApprovalRequest {
  id: number;
  employeeName: string;
  rewardName: string;
  rewardType: string;
  pointsCost: number;
  destination: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

export default function EmployerApprovals() {
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [comments, setComments] = useState('');

  const [requests, setRequests] = useState<ApprovalRequest[]>([
    { id: 1, employeeName: 'Sarah Johnson', rewardName: 'Paris Weekend Getaway', rewardType: 'Hotel Stay', pointsCost: 2500, destination: 'Paris, France', requestDate: '2025-10-06', status: 'pending' },
    { id: 2, employeeName: 'Mike Chen', rewardName: 'Flight Voucher to Tokyo', rewardType: 'Flight Voucher', pointsCost: 4500, destination: 'Tokyo, Japan', requestDate: '2025-10-05', status: 'pending' },
    { id: 3, employeeName: 'Emily Davis', rewardName: 'Bali Yoga Retreat', rewardType: 'Experience Package', pointsCost: 4000, destination: 'Bali, Indonesia', requestDate: '2025-10-04', status: 'pending' },
  ]);

  const handleApprove = (requestId: number) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'approved' as const } : req
    ));
    toast.success('Travel reward request approved!');
    setDialogOpen(false);
    setComments('');
  };

  const handleReject = (requestId: number) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'rejected' as const } : req
    ));
    toast.error('Travel reward request rejected');
    setDialogOpen(false);
    setComments('');
  };

  const openDialog = (request: ApprovalRequest) => {
    setSelectedRequest(request);
    setDialogOpen(true);
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Approval Requests</h1>
            <p className="text-muted-foreground">Review and approve travel reward requests from your team</p>
          </div>
          <div className="card-stat bg-gradient-to-br from-warning/10 to-warning/5">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-3xl font-bold text-warning">{pendingCount}</p>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="card-stat hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">
                        {request.employeeName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{request.employeeName}</h3>
                      <p className="text-sm text-muted-foreground">
                        Requested on {new Date(request.requestDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Travel Reward</p>
                      <p className="font-semibold">{request.rewardName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <Badge variant="secondary">{request.rewardType}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Destination</p>
                      <p className="font-semibold">{request.destination}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Points Cost:</span>
                      <span className="text-lg font-bold text-primary">{request.pointsCost} pts</span>
                    </div>
                    {request.status !== 'pending' && (
                      <Badge variant={request.status === 'approved' ? 'default' : 'destructive'}>
                        {request.status}
                      </Badge>
                    )}
                  </div>
                </div>

                {request.status === 'pending' && (
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openDialog(request)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => openDialog(request)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Approval Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Review Request</DialogTitle>
              <DialogDescription>
                {selectedRequest && (
                  <>Review travel reward request from {selectedRequest.employeeName}</>
                )}
              </DialogDescription>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Reward</p>
                  <p className="font-semibold">{selectedRequest.rewardName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cost</p>
                  <p className="text-lg font-bold text-primary">{selectedRequest.pointsCost} points</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Comments (optional)</label>
                  <Textarea
                    placeholder="Add any comments..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            )}
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => selectedRequest && handleReject(selectedRequest.id)}
                className="text-destructive"
              >
                Reject
              </Button>
              <Button onClick={() => selectedRequest && handleApprove(selectedRequest.id)}>
                Approve
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}