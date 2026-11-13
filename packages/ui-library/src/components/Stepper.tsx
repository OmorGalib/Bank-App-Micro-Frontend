import React from 'react';
import { clsx } from 'clsx';
import { Check } from 'lucide-react';

interface StepperProps { steps: string[]; currentStep: number; }

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => (
  <div className="flex items-center justify-center w-full mb-8">
    {steps.map((step, idx) => (
      <React.Fragment key={idx}>
        <div className="flex flex-col items-center">
          <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors", 
            idx < currentStep ? "bg-green-500 text-white" : idx === currentStep ? "bg-blue-600 text-white ring-4 ring-blue-100" : "bg-gray-200 text-gray-500")}>
            {idx < currentStep ? <Check size={18} /> : idx + 1}
          </div>
          <span className="text-xs mt-2 font-medium text-gray-600 hidden sm:block">{step}</span>
        </div>
        {idx < steps.length - 1 && <div className={clsx("h-1 w-12 sm:w-24 mx-2 rounded-full", idx < currentStep ? "bg-green-500" : "bg-gray-200")} />}
      </React.Fragment>
    ))}
  </div>
);