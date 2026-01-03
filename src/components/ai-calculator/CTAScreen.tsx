import { Button } from '@/components/ui/button';
import { Flame, MessageCircle, FileText } from 'lucide-react';
import { DiagnosticData, CalculationResult } from './types';
import { generatePDF } from './PDFGenerator';

interface CTAScreenProps {
  onSubmit: () => void;
  data: DiagnosticData;
  result: CalculationResult;
}

const CTAScreen = ({ onSubmit, data, result }: CTAScreenProps) => {
  const handleAskQuestion = () => {
    window.open('https://t.me/sashaneurobot', '_blank');
  };

  const handleDownloadPDF = async () => {
    await generatePDF(data, result);
  };

  return (
    <div className="text-center py-4">
      {/* Кнопки в ряд */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
        {/* Кнопка PDF */}
        <Button
          variant="outline"
          size="lg"
          className="text-base px-6 py-5 h-auto"
          onClick={handleDownloadPDF}
        >
          <FileText className="w-5 h-5 mr-2" />
          Скачать отчёт PDF
        </Button>

        {/* Основная кнопка */}
        <Button
          size="lg"
          className="text-base px-6 py-5 h-auto"
          onClick={onSubmit}
        >
          <Flame className="w-5 h-5 mr-2" />
          Получить архитектурный план
        </Button>
      </div>
      
    </div>
  );
};

export default CTAScreen;