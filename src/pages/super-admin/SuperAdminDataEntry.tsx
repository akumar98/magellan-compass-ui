import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';

type EventType = Database['public']['Enums']['event_type'];
type EventSource = Database['public']['Enums']['event_source'];

interface Company {
  id: string;
  name: string;
}

interface Employee {
  id: string;
  full_name: string;
  email: string;
}

const SuperAdminDataEntry = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // HRIS Event Form State
  const [eventType, setEventType] = useState<EventType>('hire');
  const [eventSource, setEventSource] = useState<EventSource>('manual');
  const [eventData, setEventData] = useState('{}');

  // Wellness Score Form State
  const [overallScore, setOverallScore] = useState('');
  const [stressLevel, setStressLevel] = useState('');
  const [workLifeBalance, setWorkLifeBalance] = useState('');
  const [engagementLevel, setEngagementLevel] = useState('');
  const [energyLevel, setEnergyLevel] = useState('');
  const [dataSources, setDataSources] = useState('{}');

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      fetchEmployees(selectedCompany);
    } else {
      setEmployees([]);
      setSelectedEmployee('');
    }
  }, [selectedCompany]);

  const fetchCompanies = async () => {
    const { data, error } = await supabase
      .from('companies')
      .select('id, name')
      .order('name');

    if (error) {
      toast.error('Failed to fetch companies');
      return;
    }

    setCompanies(data || []);
  };

  const fetchEmployees = async (companyId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, email')
      .eq('company_id', companyId)
      .order('full_name');

    if (error) {
      toast.error('Failed to fetch employees');
      return;
    }

    setEmployees(data || []);
  };

  const handleSubmitHRISEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee) {
      toast.error('Please select an employee');
      return;
    }

    setLoading(true);
    try {
      const parsedEventData = JSON.parse(eventData);

      const { error } = await supabase
        .from('hris_events')
        .insert({
          employee_id: selectedEmployee,
          event_type: eventType,
          source: eventSource,
          event_data: parsedEventData,
        });

      if (error) throw error;

      toast.success('HRIS event created successfully');
      setEventData('{}');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create HRIS event');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitWellnessScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee) {
      toast.error('Please select an employee');
      return;
    }

    if (!overallScore) {
      toast.error('Overall score is required');
      return;
    }

    setLoading(true);
    try {
      const parsedDataSources = JSON.parse(dataSources);

      const { error } = await supabase
        .from('wellness_scores')
        .insert({
          employee_id: selectedEmployee,
          overall_score: parseFloat(overallScore),
          stress_level: stressLevel ? parseFloat(stressLevel) : null,
          work_life_balance: workLifeBalance ? parseFloat(workLifeBalance) : null,
          engagement_level: engagementLevel ? parseFloat(engagementLevel) : null,
          energy_level: energyLevel ? parseFloat(energyLevel) : null,
          data_sources: parsedDataSources,
        });

      if (error) throw error;

      toast.success('Wellness score created successfully');
      setOverallScore('');
      setStressLevel('');
      setWorkLifeBalance('');
      setEngagementLevel('');
      setEnergyLevel('');
      setDataSources('{}');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create wellness score');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Data Entry</h1>
          <p className="text-muted-foreground">Enter behavioral signals and data collection for employees</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="company">Select Company</Label>
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger id="company">
                <SelectValue placeholder="Choose a company" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="employee">Select Employee</Label>
            <Select 
              value={selectedEmployee} 
              onValueChange={setSelectedEmployee}
              disabled={!selectedCompany}
            >
              <SelectTrigger id="employee">
                <SelectValue placeholder={selectedCompany ? "Choose an employee" : "Select company first"} />
              </SelectTrigger>
              <SelectContent>
                {employees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.full_name} ({employee.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="hris" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hris">HRIS Events</TabsTrigger>
            <TabsTrigger value="wellness">Wellness Scores</TabsTrigger>
          </TabsList>

          <TabsContent value="hris">
            <Card>
              <CardHeader>
                <CardTitle>Add HRIS Event</CardTitle>
                <CardDescription>
                  Record employee events like hires, promotions, PTO, etc.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitHRISEvent} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="eventType">Event Type</Label>
                      <Select value={eventType} onValueChange={(value) => setEventType(value as EventType)}>
                        <SelectTrigger id="eventType">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hire">Hire</SelectItem>
                          <SelectItem value="promotion">Promotion</SelectItem>
                          <SelectItem value="team_change">Team Change</SelectItem>
                          <SelectItem value="pto">PTO</SelectItem>
                          <SelectItem value="collaboration">Collaboration</SelectItem>
                          <SelectItem value="performance_review">Performance Review</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="eventSource">Source</Label>
                      <Select value={eventSource} onValueChange={(value) => setEventSource(value as EventSource)}>
                        <SelectTrigger id="eventSource">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manual">Manual</SelectItem>
                          <SelectItem value="workday">Workday</SelectItem>
                          <SelectItem value="adp">ADP</SelectItem>
                          <SelectItem value="bamboo">BambooHR</SelectItem>
                          <SelectItem value="slack">Slack</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="eventData">Event Data (JSON)</Label>
                    <Textarea
                      id="eventData"
                      value={eventData}
                      onChange={(e) => setEventData(e.target.value)}
                      placeholder='{"key": "value"}'
                      rows={6}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter additional event details in JSON format
                    </p>
                  </div>

                  <Button type="submit" disabled={loading || !selectedEmployee}>
                    {loading ? 'Submitting...' : 'Submit HRIS Event'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wellness">
            <Card>
              <CardHeader>
                <CardTitle>Add Wellness Score</CardTitle>
                <CardDescription>
                  Record wellness metrics for employee wellbeing tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitWellnessScore} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="overallScore">Overall Score (Required)</Label>
                      <Input
                        id="overallScore"
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={overallScore}
                        onChange={(e) => setOverallScore(e.target.value)}
                        placeholder="0-100"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="stressLevel">Stress Level</Label>
                      <Input
                        id="stressLevel"
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={stressLevel}
                        onChange={(e) => setStressLevel(e.target.value)}
                        placeholder="0-100"
                      />
                    </div>

                    <div>
                      <Label htmlFor="workLifeBalance">Work Life Balance</Label>
                      <Input
                        id="workLifeBalance"
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={workLifeBalance}
                        onChange={(e) => setWorkLifeBalance(e.target.value)}
                        placeholder="0-100"
                      />
                    </div>

                    <div>
                      <Label htmlFor="engagementLevel">Engagement Level</Label>
                      <Input
                        id="engagementLevel"
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={engagementLevel}
                        onChange={(e) => setEngagementLevel(e.target.value)}
                        placeholder="0-100"
                      />
                    </div>

                    <div>
                      <Label htmlFor="energyLevel">Energy Level</Label>
                      <Input
                        id="energyLevel"
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={energyLevel}
                        onChange={(e) => setEnergyLevel(e.target.value)}
                        placeholder="0-100"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="dataSources">Data Sources (JSON)</Label>
                    <Textarea
                      id="dataSources"
                      value={dataSources}
                      onChange={(e) => setDataSources(e.target.value)}
                      placeholder='{"source": "survey"}'
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter data source information in JSON format
                    </p>
                  </div>

                  <Button type="submit" disabled={loading || !selectedEmployee}>
                    {loading ? 'Submitting...' : 'Submit Wellness Score'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminDataEntry;
