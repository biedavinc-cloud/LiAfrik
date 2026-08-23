import { useCountUp } from '@/hooks/useInView';

interface Props {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  active: boolean;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value, suffix = '', prefix = '', decimals = 0, active, duration = 1800, className,
}: Props) {
  const v = useCountUp(value, active, duration);
  const formatted = v.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (
    <span className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
