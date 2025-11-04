import { CheckCircle2 } from 'lucide-react';

interface ProofMetric {
  label: string;
  value: string;
}

interface ProofStripProps {
  metrics?: ProofMetric[];
  className?: string;
}

const defaultMetrics: ProofMetric[] = [
  { value: '+10 eNPS', label: 'eNPS improvement' },
  { value: '≥ 40% opt-in', label: 'Employee participation' },
  { value: '120%+ NRR path', label: 'Net Revenue Retention' }
];

export const ProofStrip: React.FC<ProofStripProps> = ({ 
  metrics = defaultMetrics,
  className = ''
}) => {
  return (
    <section className={`py-12 bg-primary/5 ${className}`} id="proof-strip">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 max-w-5xl mx-auto">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3"
              role="status"
              aria-label={`${metric.value} ${metric.label}`}
            >
              <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0" aria-hidden="true" />
              <span className="text-lg font-semibold text-foreground">{metric.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
