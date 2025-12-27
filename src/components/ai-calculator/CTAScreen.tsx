import { Button } from '@/components/ui/button';
import { Flame, MessageCircle } from 'lucide-react';

interface CTAScreenProps {
  onSubmit: () => void;
}

const CTAScreen = ({ onSubmit }: CTAScreenProps) => {
  const handleAskQuestion = () => {
    // Открываем Telegram или контактную форму
    window.open('https://t.me/sashaneurobot', '_blank');
  };

  return (
    <div className="text-center py-4">
      {/* Основная кнопка */}
      <Button
        size="lg"
        className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 h-auto mb-4"
        onClick={onSubmit}
      >
        <Flame className="w-5 h-5 mr-2" />
        Получить архитектурный план внедрения
      </Button>
      
      {/* Подпись под основной кнопкой */}
      <p className="text-sm text-muted-foreground/70 mb-6">
        30 минут. Без обязательств.<br />
        Результат — решение, стоит ли вообще внедрять ИИ.
      </p>

      {/* Вторичная кнопка */}
      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground hover:text-foreground"
        onClick={handleAskQuestion}
      >
        <MessageCircle className="w-4 h-4 mr-2" />
        Задать вопрос
      </Button>
    </div>
  );
};

export default CTAScreen;
