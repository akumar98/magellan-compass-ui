import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export const PendingRequestsBadge = () => {
  const { user } = useAuth();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (!user?.company_id) return;

    const fetchPendingCount = async () => {
      const { data, error } = await supabase
        .from('user_roles')
        .select('id', { count: 'exact', head: true })
        .eq('role', 'employee')
        .eq('company_id', user.company_id)
        .eq('approval_status', 'pending');

      if (!error && data) {
        setPendingCount(data.length || 0);
      }
    };

    fetchPendingCount();

    // Set up real-time subscription
    const channel = supabase
      .channel('employee-requests-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_roles',
          filter: `company_id=eq.${user.company_id}`,
        },
        () => {
          fetchPendingCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.company_id]);

  if (pendingCount === 0) return null;

  return (
    <Badge 
      variant="secondary" 
      className="bg-warning/10 text-warning hover:bg-warning/20 ml-2"
    >
      {pendingCount}
    </Badge>
  );
};