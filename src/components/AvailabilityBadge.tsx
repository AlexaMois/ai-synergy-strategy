interface AvailabilityBadgeProps {
  slotsAvailable: number;
  className?: string;
}
const AvailabilityBadge = ({
  slotsAvailable,
  className = ""
}: AvailabilityBadgeProps) => {
  return (
    <div className={`inline-flex items-center gap-2 text-sm text-text-body ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
      </span>
      <span>Свободно {slotsAvailable} {slotsAvailable === 1 ? 'место' : slotsAvailable < 5 ? 'места' : 'мест'} на этой неделе</span>
    </div>
  );
};
export default AvailabilityBadge;