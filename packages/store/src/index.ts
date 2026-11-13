import { create } from 'zustand';

export interface OnboardingData {
  personalInfo: { fullName: string; dob: string; phone: string; email: string };
  addressInfo: { presentAddress: string; city: string; district: string; postalCode: string };
  incomeInfo: { occupation: string; monthlyIncome: string; companyName: string };
  nidFrontUploaded: boolean;
  nidBackUploaded: boolean;
  livenessVerified: boolean;
}

export interface LoanData {
  selectedProduct: any | null;
  applicantInfo: { fullName: string; phone: string; email: string; monthlyIncome: string };
  loanAmount: string;
  loanTenure: string;
}

interface AppState {
  onboarding: OnboardingData;
  loan: LoanData;
  updateOnboarding: (data: Partial<OnboardingData>) => void;
  updateLoan: (data: Partial<LoanData>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  onboarding: {
    personalInfo: { fullName: '', dob: '', phone: '', email: '' },
    addressInfo: { presentAddress: '', city: '', district: '', postalCode: '' },
    incomeInfo: { occupation: '', monthlyIncome: '', companyName: '' },
    nidFrontUploaded: false,
    nidBackUploaded: false,
    livenessVerified: false,
  },
  loan: {
    selectedProduct: null,
    applicantInfo: { fullName: '', phone: '', email: '', monthlyIncome: '' },
    loanAmount: '',
    loanTenure: '',
  },
  updateOnboarding: (data) => set((state) => ({ onboarding: { ...state.onboarding, ...data } })),
  updateLoan: (data) => set((state) => ({ loan: { ...state.loan, ...data } })),
}));