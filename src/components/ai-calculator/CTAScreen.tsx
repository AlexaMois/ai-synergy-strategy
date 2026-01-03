import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';
import { DiagnosticData, CalculationResult } from './types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CTAScreenProps {
  onSubmit: () => void;
  data: DiagnosticData;
  result: CalculationResult;
}

const CTAScreen = ({ data, result }: CTAScreenProps) => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    telegram: '',
    phone: '',
    industry: ''
  });

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmitTelegram = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.telegram || !formData.phone || !formData.industry) {
      toast.error('Пожалуйста, заполните все поля');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-to-telegram', {
        body: {
          formType: 'diagnostic',
          name: formData.name,
          telegram: formData.telegram,
          phone: formData.phone,
          industry: formData.industry,
          pageUrl: window.location.href,
          diagnosticResults: {
            painPoints: data.painPoints,
            employeeCount: data.employeeCount,
            avgSalary: data.avgSalary,
            routineTimeShare: data.routineTimeShare,
            aiReadinessLevel: result.aiReadinessLevel,
            potentialSavings: result.potentialSavings,
            minSavings: result.minSavings,
            maxSavings: result.maxSavings,
            roi: result.roi
          }
        }
      });

      if (error) throw error;

      toast.success('Отчёт отправлен! Проверьте Telegram');
      setShowForm(false);
      setFormData({ name: '', telegram: '', phone: '', industry: '' });
    } catch (error) {
      console.error('Error sending to Telegram:', error);
      toast.error('Ошибка отправки. Попробуйте ещё раз');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-center py-4">
      {!showForm ? (
        <div className="flex flex-col items-center gap-4">
          <Button
            size="lg"
            className="text-base px-6 py-5 h-auto"
            onClick={() => setShowForm(true)}
          >
            <Send className="w-5 h-5 mr-2" />
            Получить отчёт PDF в Telegram
          </Button>
          
          <button
            onClick={handleScrollToContact}
            className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4 transition-colors"
          >
            Нужен разбор под ваш бизнес? Оставить контакты
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmitTelegram} className="space-y-4 max-w-md mx-auto text-left">
          <div className="space-y-2">
            <Label htmlFor="name">Имя *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ваше имя"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="telegram">Telegram *</Label>
            <Input
              id="telegram"
              value={formData.telegram}
              onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
              placeholder="@username"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Телефон *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+7 (999) 123-45-67"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="industry">Сфера деятельности *</Label>
            <Input
              id="industry"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              placeholder="Например: ритейл, логистика..."
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowForm(false)}
              className="flex-1"
            >
              Назад
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </Button>
          </div>
          
          <button
            type="button"
            onClick={handleScrollToContact}
            className="w-full text-sm text-muted-foreground hover:text-primary underline underline-offset-4 transition-colors pt-2"
          >
            Нужен разбор под ваш бизнес? Оставить контакты
          </button>
        </form>
      )}
    </div>
  );
};

export default CTAScreen;