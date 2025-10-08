import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CreditCard, Download, Calendar, FileText, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'overdue';
}

export default function EmployerBilling() {
  const invoices: Invoice[] = [
    { id: 'INV-2025-0006', date: 'Jun 15, 2025', amount: 1200.00, status: 'paid' },
    { id: 'INV-2025-0005', date: 'May 15, 2025', amount: 1200.00, status: 'paid' },
    { id: 'INV-2025-0004', date: 'Apr 15, 2025', amount: 1200.00, status: 'paid' },
    { id: 'INV-2025-0003', date: 'Mar 15, 2025', amount: 1200.00, status: 'paid' },
    { id: 'INV-2025-0002', date: 'Feb 15, 2025', amount: 1200.00, status: 'overdue' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in max-w-6xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Billing & Subscription</h1>
          <p className="text-muted-foreground">Manage your plan, payment methods, and invoices</p>
        </div>

        {/* Current Plan */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-4">Current Plan</h2>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-bold">Enterprise Plan</h3>
                <Badge className="bg-success/10 text-success hover:bg-success/20">Active</Badge>
              </div>
              
              <p className="text-muted-foreground mb-6">
                Up to 500 employees, Priority support, Advanced analytics
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-success">✓</span>
                    <span>Up to 500 employees</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-success">✓</span>
                    <span>Advanced analytics</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-success">✓</span>
                    <span>Dedicated account manager</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-success">✓</span>
                    <span>Priority support</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-success">✓</span>
                    <span>Custom integrations</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-success">✓</span>
                    <span>API access</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Monthly price</p>
              <p className="text-3xl font-bold mb-4">$1,200<span className="text-lg text-muted-foreground">/month</span></p>
              <Button>Change Plan</Button>
            </div>
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-4">Payment Method</h2>
          
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <div className="flex items-center justify-center h-10 w-14 bg-primary/10 rounded">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Visa ending in 4242</p>
              <p className="text-sm text-muted-foreground">Expires 12/2025</p>
            </div>
            <div className="h-6 w-6 rounded-full border-2 border-primary" />
          </div>

          <Button variant="link" className="mt-4 px-0 text-primary">
            + Add alternative payment method
          </Button>
        </Card>

        {/* Upcoming Renewal */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-4">Upcoming Renewal</h2>
          
          <div className="flex items-center gap-4 mb-4">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-semibold">Next renewal on Jul 15, 2025</p>
              <p className="text-sm text-muted-foreground">Your subscription will automatically renew on this date</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline">Cancel Subscription</Button>
            <Button>Renew Now</Button>
          </div>
        </Card>

        {/* Invoice History */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Invoice History</h2>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-status">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice Number</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={invoice.status === 'paid' ? 'default' : 'destructive'}
                      className={invoice.status === 'paid' ? 'bg-success/10 text-success hover:bg-success/20' : ''}
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="link" size="sm" className="h-8 gap-1 text-primary">
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                      {invoice.status === 'overdue' && (
                        <Button variant="link" size="sm" className="h-8 gap-1 text-destructive">
                          <CreditCard className="h-3 w-3" />
                          Pay Now
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">Showing 5 of 12 invoices</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </Card>

        {/* Support & FAQs */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-4">Support & FAQs</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Frequently Asked Questions</h3>
              <div className="space-y-2">
                <Button variant="link" className="h-auto p-0 text-primary justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  How do I change my subscription plan?
                </Button>
                <Button variant="link" className="h-auto p-0 text-primary justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  What happens when I cancel my subscription?
                </Button>
                <Button variant="link" className="h-auto p-0 text-primary justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  How do I update my billing information?
                </Button>
                <Button variant="link" className="h-auto p-0 text-primary justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  View all billing documentation
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our billing specialists are available to assist you with any questions about your subscription.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Email Support
                </Button>
                <Button className="gap-2">
                  <Phone className="h-4 w-4" />
                  Call Billing Support
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
