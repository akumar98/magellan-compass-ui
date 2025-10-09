import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUp, UserPlus, X } from 'lucide-react';

interface InviteEmployeesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InviteEmployeesDialog: React.FC<InviteEmployeesDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [mode, setMode] = useState<'select' | 'bulk' | 'single'>('select');
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('');

  const handleClose = () => {
    setMode('select');
    setFullName('');
    setWorkEmail('');
    setDepartment('');
    setRole('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Invite Employees</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Choose how you'd like to add employees to MagellanOneAI.
          </p>
        </DialogHeader>

        {mode === 'select' && (
          <div className="grid md:grid-cols-2 gap-4 py-6">
            <button
              onClick={() => setMode('bulk')}
              className="group relative flex flex-col items-center gap-4 p-6 border-2 border-border rounded-lg hover:border-primary hover:bg-accent/50 transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <FileUp className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-1">Upload CSV (Bulk)</h3>
                <p className="text-sm text-muted-foreground">
                  Add multiple employees at once. Use our template to match required fields.
                </p>
              </div>
            </button>

            <button
              onClick={() => setMode('single')}
              className="group relative flex flex-col items-center gap-4 p-6 border-2 border-border rounded-lg hover:border-primary hover:bg-accent/50 transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <UserPlus className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-1">Invite a Single Employee</h3>
                <p className="text-sm text-muted-foreground">
                  Send an invite to one person. Great for quick adds or corrections.
                </p>
              </div>
            </button>
          </div>
        )}

        {mode === 'bulk' && (
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="bg-accent/30 border border-primary/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Required columns:</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  first_name, last_name, work_email, department
                </p>
                <p className="text-sm text-muted-foreground">
                  Max file size: 5MB; Formats: .csv, .xlsx
                </p>
              </div>

              <Button variant="link" className="p-0 h-auto text-primary">
                Download CSV Template
              </Button>

              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <FileUp className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">CSV or XLSX files up to 5MB</p>
              </div>

              <Button variant="link" className="p-0 h-auto text-sm">
                View column mapping
              </Button>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground">
                Import guide
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button>Upload & Continue</Button>
              </div>
            </div>
          </div>
        )}

        {mode === 'single' && (
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workEmail">Work Email</Label>
                <Input
                  id="workEmail"
                  type="email"
                  placeholder="john@company.com"
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">They'll receive an email after approval.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role (Optional)</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="lead">Team Lead</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="mid">Mid-Level</SelectItem>
                    <SelectItem value="junior">Junior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button>Upload & Continue</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
