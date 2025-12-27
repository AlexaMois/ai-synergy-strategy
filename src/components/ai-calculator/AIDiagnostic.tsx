import { useState, useCallback } from 'react';
import DiagnosticStep from './DiagnosticStep';
import AnalyzingScreen from './AnalyzingScreen';
import ResultScreen from './ResultScreen';
import CTAScreen from './CTAScreen';
import { DiagnosticData, CalculationResult } from './types';
import { calculateResults, formatFullCurrency } from './calculationLogic';

interface AIDiagnosticProps {
  onComplete: (data: DiagnosticData, result: CalculationResult) => void;
  onCTA: () => void;
}

type Phase = 'questions' | 'analyzing' | 'result';

const AIDiagnostic = ({ onComplete, onCTA }: AIDiagnosticProps) => {
  const [phase, setPhase] = useState<Phase>('questions');
  const [step, setStep] = useState(1);
  const [diagnosticData, setDiagnosticData] = useState<Partial<DiagnosticData>>({});
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleStepComplete = useCallback((value: string | string[] | number) => {
    const updatedData = { ...diagnosticData };

    switch (step) {
      case 1:
        updatedData.painPoints = value as string[];
        break;
      case 2:
        updatedData.employeeCount = value as number;
        break;
      case 3:
        updatedData.avgSalary = value as number;
        break;
      case 4:
        updatedData.routineTimeShare = value as number;
        break;
      case 5:
        updatedData.errorCriticality = value as string;
        break;
    }

    setDiagnosticData(updatedData);

    if (step < 5) {
      setStep(step + 1);
    } else {
      // All questions answered, start analysis
      setPhase('analyzing');
      
      // Calculate results
      const finalData = updatedData as DiagnosticData;
      const calculationResult = calculateResults(finalData);
      setResult(calculationResult);
      onComplete(finalData, calculationResult);
    }
  }, [step, diagnosticData, onComplete]);

  const handleBack = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    }
  }, [step]);

  const handleAnalysisComplete = useCallback(() => {
    setPhase('result');
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      {phase === 'questions' && (
        <DiagnosticStep
          step={step}
          totalSteps={5}
          onNext={handleStepComplete}
          onBack={step > 1 ? handleBack : undefined}
        />
      )}

      {phase === 'analyzing' && (
        <AnalyzingScreen onComplete={handleAnalysisComplete} />
      )}

      {phase === 'result' && result && diagnosticData.painPoints && (
        <div className="space-y-6">
          <ResultScreen data={diagnosticData as DiagnosticData} result={result} />
          <CTAScreen onSubmit={onCTA} />
        </div>
      )}
    </div>
  );
};

export default AIDiagnostic;
