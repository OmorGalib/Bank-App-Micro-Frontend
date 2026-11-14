import React, { useState, useEffect } from 'react';
import { useAppStore } from '@bank/store';
import { Card, Button, Input, Stepper } from '@bank/ui-library';
import productsData from './products.json';
import './index.css';

export default function LoanApp() {
  const { loan, updateLoan, onboarding } = useAppStore();
  const [step, setStep] = useState(0);

  const steps = ['Select Product', 'Personal Info', 'Summary'];

  // Auto-prefill logic when entering Step 1 (Personal Info)
  useEffect(() => {
    if (step === 1) {
      const prefillData = {
        fullName: loan.applicantInfo.fullName || onboarding.personalInfo.fullName || '',
        phone: loan.applicantInfo.phone || onboarding.personalInfo.phone || '',
        email: loan.applicantInfo.email || onboarding.personalInfo.email || '',
        monthlyIncome: loan.applicantInfo.monthlyIncome || onboarding.incomeInfo.monthlyIncome || '',
      };
      
      // Only update if there's actually new data to prevent infinite loops
      if (JSON.stringify(prefillData) !== JSON.stringify(loan.applicantInfo)) {
        updateLoan({ applicantInfo: prefillData });
      }
    }
  }, [step, onboarding, loan.applicantInfo, updateLoan]);

  const handleSelect = (product: any) => {
    // Pre-fill loan amount to max by default
    updateLoan({ selectedProduct: product, loanAmount: product.maxAmount.toString() });
    setStep(1);
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const isLoanAmountValid = () => {
    const amount = Number(loan.loanAmount);
    return amount > 0 && amount <= loan.selectedProduct?.maxAmount;
  };

  if (step === 0) return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Choose a Loan Product</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productsData.map((p: any) => (
          <Card key={p.id} className="flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <h3 className="text-xl font-bold text-blue-600">{p.name}</h3>
              <p className="text-sm text-gray-500 mt-1">Interest Rate: <span className="font-semibold text-gray-800">{p.rate}%</span></p>
              <p className="text-sm text-gray-500">Max Amount: <span className="font-semibold text-gray-800">${p.maxAmount.toLocaleString()}</span></p>
            </div>
            <Button className="mt-4 w-full" onClick={() => handleSelect(p)}>Select</Button>
          </Card>
        ))}
      </div>
    </div>
  );

  if (step === 1) return (
    <div className="max-w-lg mx-auto p-6">
      <Stepper steps={steps} currentStep={step} />
      <Card>
        <form onSubmit={handleInfoSubmit} className="flex flex-col gap-4">
          
          <Input label="Full Name" value={loan.applicantInfo.fullName} onChange={(e) => updateLoan({ applicantInfo: {...loan.applicantInfo, fullName: e.target.value} })} required />
          <Input label="Phone" type="tel" pattern="[0-9]{10,15}" title="10 to 15 digits" value={loan.applicantInfo.phone} onChange={(e) => updateLoan({ applicantInfo: {...loan.applicantInfo, phone: e.target.value} })} required />
          <Input label="Email" type="email" value={loan.applicantInfo.email} onChange={(e) => updateLoan({ applicantInfo: {...loan.applicantInfo, email: e.target.value} })} required />
          <Input label="Monthly Income ($)" type="number" min="0" value={loan.applicantInfo.monthlyIncome} onChange={(e) => updateLoan({ applicantInfo: {...loan.applicantInfo, monthlyIncome: e.target.value} })} required />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input label="Loan Amount ($)" type="number" value={loan.loanAmount} onChange={(e) => updateLoan({ loanAmount: e.target.value })} max={loan.selectedProduct?.maxAmount} required />
              {!isLoanAmountValid() && <span className="text-xs text-red-500 mt-1 block">Max allowed: ${loan.selectedProduct?.maxAmount.toLocaleString()}</span>}
            </div>
            <Input label="Tenure (Years)" type="number" min="1" max="30" value={loan.loanTenure} onChange={(e) => updateLoan({ loanTenure: e.target.value })} placeholder="e.g. 5" required />
          </div>

          <div className="flex gap-4 mt-2">
            <Button type="button" variant="secondary" onClick={() => setStep(0)}>Back</Button>
            <Button type="submit" className="flex-1" disabled={!isLoanAmountValid()}>Continue</Button>
          </div>
        </form>
      </Card>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto p-6">
      <Stepper steps={steps} currentStep={step} />
      <Card>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Application Summary</h2>
        <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-sm">
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500">Product:</span> 
            <span className="font-medium text-gray-800">{loan.selectedProduct?.name}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500">Requested Amount:</span> 
            <span className="font-medium text-blue-600">${Number(loan.loanAmount).toLocaleString()}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500">Tenure:</span> 
            <span className="font-medium text-gray-800">{loan.loanTenure} Years</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500">Interest Rate:</span> 
            <span className="font-medium text-gray-800">{loan.selectedProduct?.rate}%</span>
          </div>
          
          <h4 className="font-semibold text-blue-600 mt-4 mb-2">Applicant Details</h4>
          <p><span className="text-gray-500">Name:</span> {loan.applicantInfo.fullName}</p>
          <p><span className="text-gray-500">Email:</span> {loan.applicantInfo.email}</p>
          <p><span className="text-gray-500">Phone:</span> {loan.applicantInfo.phone}</p>
        </div>
        <div className="flex gap-4 mt-6">
          <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
          <Button variant="success" className="flex-1" onClick={() => alert('Loan Application Submitted!')}>Submit Application</Button>
        </div>
      </Card>
    </div>
  );
}