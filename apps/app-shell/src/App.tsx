import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Button, Card, Loader } from '@bank/ui-library';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import './index.css';

const LoanApp = React.lazy(() => import('loan-mfe/App'));
const OnboardingApp = React.lazy(() => import('onboarding-mfe/App'));

function Navigation() {
  const location = useLocation();
  const linkClass = (path: string) => `px-4 py-2 rounded-lg font-medium transition-colors ${location.pathname === path ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`;
  
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2 text-xl font-bold text-blue-600">
        <ShieldCheck size={28} className="text-blue-600" />
        BankFlow
      </div>
      <div className="flex gap-2">
        <Link to="/" className={linkClass('/')}>Dashboard</Link>
        <Link to="/onboarding" className={linkClass('/onboarding')}>Onboarding</Link>
        <Link to="/loan" className={linkClass('/loan')}>Loans</Link>
      </div>
    </nav>
  );
}

function Dashboard() {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to BankFlow</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Manage your finances securely. Complete your onboarding to unlock all features, or apply for a new loan instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="text-center p-8 hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Get Started</h3>
          <p className="text-gray-500 mb-8">Complete your KYC and verify your identity to start banking with us.</p>
          <Link to="/onboarding">
            <Button className="w-full flex items-center justify-center gap-2">
              Start Onboarding <ArrowRight size={18} />
            </Button>
          </Link>
        </Card>

        <Card className="text-center p-8 hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold">$</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Need a Loan?</h3>
          <p className="text-gray-500 mb-8">Explore our tailored loan products with competitive interest rates.</p>
          <Link to="/loan">
            <Button variant="success" className="w-full flex items-center justify-center gap-2">
              View Loans <ArrowRight size={18} />
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <main>
          <Suspense fallback={<div className="flex justify-center items-center h-[calc(100vh-80px)]"><Loader /></div>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/loan/*" element={<LoanApp />} />
              <Route path="/onboarding/*" element={<OnboardingApp />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}