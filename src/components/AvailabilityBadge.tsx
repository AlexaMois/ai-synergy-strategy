import { Calendar } from "lucide-react";

interface AvailabilityBadgeProps {
  slotsAvailable: number;
  className?: string;
}

const AvailabilityBadge = ({ slotsAvailable, className = "" }: AvailabilityBadgeProps) => {
  return (
    <div className={`inline-flex items-center gap-2 text-sm text-text-body ${className}`}>
      <Calendar className="w-4 h-4 text-accent" />
      <span>
        Осталось <span className="font-medium text-accent">{slotsAvailable} мест</span> на этой неделе
      </span>
    </div>
  );
};

export default AvailabilityBadge;
