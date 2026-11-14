import React, { useState } from 'react';
import { useAppStore } from '@bank/store';
import { Card, Button, Input, Stepper, FileUploader, CameraPreview } from '@bank/ui-library';
import './index.css';

export default function OnboardingApp() {
  const { onboarding, updateOnboarding } = useAppStore();
  const [step, setStep] = useState(0);
  const steps = ['Personal', 'Address', 'Income', 'Review'];

  const next = () => setStep(s => Math.min(s + 1, 3));
  const back = () => setStep(s => Math.max(s - 1, 0));

  // --- Validation Helpers ---
  const isValidEmail = (email: string) => {
    // Standard email regex requiring @ and a domain
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone: string) => {
    // Requires 10 to 15 digits
    return /^[0-9]{10,15}$/.test(phone);
  };

  const isStepValid = () => {
    if (step === 0) {
      const { fullName, dob, phone, email } = onboarding.personalInfo;
      return (
        fullName.trim().length > 2 && 
        dob !== '' && 
        isValidPhone(phone) && 
        isValidEmail(email) && 
        onboarding.nidFrontUploaded && 
        onboarding.nidBackUploaded && 
        onboarding.livenessVerified
      );
    }
    if (step === 1) {
      const { presentAddress, city, district, postalCode } = onboarding.addressInfo;
      return presentAddress.trim() !== '' && city.trim() !== '' && district.trim() !== '' && postalCode.trim() !== '';
    }
    if (step === 2) {
      const { occupation, monthlyIncome, companyName } = onboarding.incomeInfo;
      return occupation.trim() !== '' && Number(monthlyIncome) > 0 && companyName.trim() !== '';
    }
    return true;
  };

  // Step 1: Personal
  if (step === 0) return (
    <div className="max-w-lg mx-auto p-6">
      <Stepper steps={steps} currentStep={step} />
      <Card>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Personal Information</h2>
        <div className="space-y-4">
          <Input label="Full Name" value={onboarding.personalInfo.fullName} onChange={e => updateOnboarding({ personalInfo: {...onboarding.personalInfo, fullName: e.target.value} })} required minLength={3} />
          
          <Input label="Date of Birth" type="date" value={onboarding.personalInfo.dob} onChange={e => updateOnboarding({ personalInfo: {...onboarding.personalInfo, dob: e.target.value} })} required />
          
          <Input label="Phone" type="tel" value={onboarding.personalInfo.phone} onChange={e => updateOnboarding({ personalInfo: {...onboarding.personalInfo, phone: e.target.value} })} required />
          {onboarding.personalInfo.phone && !isValidPhone(onboarding.personalInfo.phone) && (
            <span className="text-xs text-red-500">Phone must be 10-15 digits.</span>
          )}

          <Input label="Email" type="email" value={onboarding.personalInfo.email} onChange={e => updateOnboarding({ personalInfo: {...onboarding.personalInfo, email: e.target.value} })} required />
          {onboarding.personalInfo.email && !isValidEmail(onboarding.personalInfo.email) && (
            <span className="text-xs text-red-500">Please enter a valid email address (e.g., name@example.com).</span>
          )}
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">NID Front</label>
              <FileUploader label="Upload Front" onUpload={() => updateOnboarding({ nidFrontUploaded: true })} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">NID Back</label>
              <FileUploader label="Upload Back" onUpload={() => updateOnboarding({ nidBackUploaded: true })} />
            </div>
          </div>
          
          <div className="pt-2">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Face Liveness</label>
            <CameraPreview onVerify={() => updateOnboarding({ livenessVerified: true })} />
          </div>
        </div>
        <Button className="w-full mt-6" onClick={next} disabled={!isStepValid()}>
          Continue
        </Button>
      </Card>
    </div>
  );

  // ... (Step 2 and Step 3 remain exactly the same, but we will add simple required checks)

  // Step 2: Address
  if (step === 1) return (
    <div className="max-w-lg mx-auto p-6">
      <Stepper steps={steps} currentStep={step} />
      <Card>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Address Information</h2>
        <div className="space-y-4">
          <Input label="Present Address" value={onboarding.addressInfo.presentAddress} onChange={e => updateOnboarding({ addressInfo: {...onboarding.addressInfo, presentAddress: e.target.value} })} required />
          <Input label="City" value={onboarding.addressInfo.city} onChange={e => updateOnboarding({ addressInfo: {...onboarding.addressInfo, city: e.target.value} })} required />
          <Input label="District" value={onboarding.addressInfo.district} onChange={e => updateOnboarding({ addressInfo: {...onboarding.addressInfo, district: e.target.value} })} required />
          <Input label="Postal Code" type="number" value={onboarding.addressInfo.postalCode} onChange={e => updateOnboarding({ addressInfo: {...onboarding.addressInfo, postalCode: e.target.value} })} required />
        </div>
        <div className="flex gap-4 mt-6">
          <Button variant="secondary" onClick={back}>Back</Button>
          <Button className="flex-1" onClick={next} disabled={!isStepValid()}>Continue</Button>
        </div>
      </Card>
    </div>
  );

  // Step 3: Income
  if (step === 2) return (
    <div className="max-w-lg mx-auto p-6">
      <Stepper steps={steps} currentStep={step} />
      <Card>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Income Information</h2>
        <div className="space-y-4">
          <Input label="Occupation" value={onboarding.incomeInfo.occupation} onChange={e => updateOnboarding({ incomeInfo: {...onboarding.incomeInfo, occupation: e.target.value} })} required />
          <Input label="Monthly Income ($)" type="number" min="0" value={onboarding.incomeInfo.monthlyIncome} onChange={e => updateOnboarding({ incomeInfo: {...onboarding.incomeInfo, monthlyIncome: e.target.value} })} required />
          <Input label="Company Name" value={onboarding.incomeInfo.companyName} onChange={e => updateOnboarding({ incomeInfo: {...onboarding.incomeInfo, companyName: e.target.value} })} required />
        </div>
        <div className="flex gap-4 mt-6">
          <Button variant="secondary" onClick={back}>Back</Button>
          <Button className="flex-1" onClick={next} disabled={!isStepValid()}>Review</Button>
        </div>
      </Card>
    </div>
  );

  // Step 4: Review
  return (
    <div className="max-w-lg mx-auto p-6">
      <Stepper steps={steps} currentStep={step} />
      <Card>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Review & Submit</h2>
        <div className="bg-gray-50 rounded-xl p-4 space-y-4 text-sm">
          <div>
            <h4 className="font-semibold text-blue-600 mb-1">Personal Info</h4>
            <p>{onboarding.personalInfo.fullName} | {onboarding.personalInfo.email}</p>
            <p className="text-gray-500">DOB: {onboarding.personalInfo.dob} | Phone: {onboarding.personalInfo.phone}</p>
            <p className="mt-2">
              NID Front: {onboarding.nidFrontUploaded ? '✅' : '❌'} | 
              NID Back: {onboarding.nidBackUploaded ? '✅' : '❌'} | 
              Liveness: {onboarding.livenessVerified ? '✅' : '❌'}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-600 mb-1">Address</h4>
            <p>{onboarding.addressInfo.presentAddress}, {onboarding.addressInfo.city}, {onboarding.addressInfo.district} - {onboarding.addressInfo.postalCode}</p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-600 mb-1">Income</h4>
            <p>{onboarding.incomeInfo.occupation} at {onboarding.incomeInfo.companyName}</p>
            <p className="text-gray-500">Monthly Income: ${onboarding.incomeInfo.monthlyIncome}</p>
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <Button variant="secondary" onClick={back}>Back</Button>
          <Button variant="success" className="flex-1" onClick={() => alert('Onboarding Complete!')}>Submit Onboarding</Button>
        </div>
      </Card>
    </div>
  );
}