interface AvailabilityBadgeProps {
  slotsAvailable: number;
  className?: string;
}
const AvailabilityBadge = ({
  slotsAvailable,
  className = ""
}: AvailabilityBadgeProps) => {
  return <div className={`inline-flex items-center gap-2 text-sm text-text-body ${className}`}>
      
      
    </div>;
};
export default AvailabilityBadge;