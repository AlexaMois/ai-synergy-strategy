import { Button } from '@/components/ui/button';
import { Flame } from 'lucide-react';

interface CTAScreenProps {
  onSubmit: () => void;
}

const CTAScreen = ({ onSubmit }: CTAScreenProps) => {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 md:p-8 border border-primary/20 text-center">
      <p className="text-lg text-foreground mb-2">
        Это предварительный расчёт.
      </p>
      <p className="text-muted-foreground mb-8">
        Чтобы получить точную архитектуру и реальный план внедрения, нужно разобрать процессы глубже.
      </p>
      
      <Button
        size="lg"
        className="text-lg px-8 py-6 h-auto"
        onClick={onSubmit}
      >
        <Flame className="w-5 h-5 mr-2" />
        Обсудить задачу
      </Button>
    </div>
  );
};

export default CTAScreen;
