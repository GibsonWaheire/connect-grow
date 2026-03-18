import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { Header } from '@/shared/components/Header';
import { Smartphone, Building2, CreditCard, Copy, CheckCircle2, Loader2 } from 'lucide-react';
import { useMpesaPayment } from '@/shared/hooks/useMpesaPayment';

const BANK = {
  name: 'Equity Bank',
  paybill: '247247',
  account: '0020195655920',
};

export default function PaymentPage() {
  const [params] = useSearchParams();
  const service = params.get('service') || 'Digital Service';
  const amount = Number(params.get('amount') || '0');

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<'bank' | 'card' | null>(null);

  const { status, message, pay, reset } = useMpesaPayment();

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggle = (method: 'bank' | 'card') => {
    setExpanded(prev => (prev === method ? null : method));
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = phone.trim().replace(/\s+/g, '');
    if (!clean) {
      setPhoneError('Phone number is required.');
      return;
    }
    if (!/^(07|01|2547|2541|\+2547|\+2541)\d{8,9}$/.test(clean)) {
      setPhoneError('Enter a valid Safaricom number e.g. 0712 345 678.');
      return;
    }
    setPhoneError('');
    pay(clean, amount, service);
  };

  const isActive = status === 'sending' || status === 'waiting';

  return (
    <>
      <Header />
      <MainLayout>
        <section className="container mx-auto px-4 pt-24 pb-16 max-w-lg">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">Complete Payment</h1>
            <p className="text-gray-500 text-sm">{service}</p>
          </div>

          {/* Fixed amount */}
          <div className="mb-6 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex justify-between items-center">
            <span className="text-sm text-gray-500">Amount</span>
            <span className="text-2xl font-bold text-slate-900">
              KES {amount.toLocaleString()}
            </span>
          </div>

          {/* ── Success state ── */}
          {status === 'success' && (
            <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-6 text-center mb-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <p className="font-semibold text-emerald-700 text-lg">Payment Confirmed!</p>
              <p className="text-emerald-600 text-sm mt-1">{message}</p>
              <button onClick={reset} className="mt-4 text-sm text-emerald-600 underline">
                Make another payment
              </button>
            </div>
          )}

          {/* ── Cancelled / failed state ── */}
          {(status === 'cancelled' || status === 'failed') && (
            <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4 text-center mb-4">
              <p className="font-semibold text-red-600">{status === 'cancelled' ? 'Payment Cancelled' : 'Payment Failed'}</p>
              <p className="text-red-500 text-sm mt-1">{message}</p>
              <button onClick={reset} className="mt-3 text-sm text-red-500 underline">
                Try again
              </button>
            </div>
          )}

          {/* ── M-Pesa (default) ── */}
          {status !== 'success' && (
            <>
              <div className="bg-white border-2 border-emerald-500 rounded-2xl p-5 mb-4 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-emerald-100 p-2.5 rounded-xl">
                    <Smartphone className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">M-Pesa</p>
                    <p className="text-xs text-emerald-600">Recommended · Instant</p>
                  </div>
                  <span className="bg-emerald-500 text-white text-xs px-2.5 py-1 rounded-full font-medium">Default</span>
                </div>

                {/* Waiting / polling state */}
                {status === 'waiting' && (
                  <div className="flex flex-col items-center gap-3 py-4">
                    <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                    <p className="text-sm font-medium text-emerald-700">{message}</p>
                    <p className="text-xs text-gray-400">Verifying payment — please wait…</p>
                  </div>
                )}

                {/* Sending state */}
                {status === 'sending' && (
                  <div className="flex flex-col items-center gap-3 py-4">
                    <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                    <p className="text-sm text-gray-500">Sending STK push…</p>
                  </div>
                )}

                {/* Idle / failed / cancelled — show form */}
                {!isActive && status !== 'success' && (
                  <form onSubmit={handlePay} className="space-y-3">
                    <div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => { setPhone(e.target.value); setPhoneError(''); }}
                        placeholder="Phone number (e.g. 0712 345 678)"
                        className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition ${
                          phoneError ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 focus:ring-emerald-400'
                        }`}
                      />
                      {phoneError && <p className="text-xs text-red-500 mt-1">{phoneError}</p>}
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all"
                    >
                      Pay KES {amount.toLocaleString()} via M-Pesa
                    </button>
                  </form>
                )}
              </div>

              {/* Other methods */}
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 text-center select-none">
                Other payment methods
              </p>

              {/* Bank Transfer */}
              <div
                className={`border rounded-2xl p-4 mb-3 cursor-pointer transition-all ${
                  expanded === 'bank' ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
                onMouseEnter={() => setExpanded('bank')}
                onMouseLeave={() => setExpanded(prev => (prev === 'bank' ? null : prev))}
                onClick={() => toggle('bank')}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl transition-colors ${expanded === 'bank' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    <Building2 className={`w-5 h-5 ${expanded === 'bank' ? 'text-blue-600' : 'text-gray-500'}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-700">Bank Transfer</p>
                    <p className={`text-xs ${expanded === 'bank' ? 'text-blue-500' : 'text-gray-400'}`}>
                      {expanded === 'bank' ? 'Equity Bank · Paybill' : 'Hover to see details'}
                    </p>
                  </div>
                </div>
                {expanded === 'bank' && (
                  <div className="mt-4 space-y-2 text-sm">
                    {[
                      { label: 'Bank',           value: BANK.name,    key: 'bank-name', copyable: false },
                      { label: 'Paybill Number', value: BANK.paybill, key: 'paybill',   copyable: true },
                      { label: 'Account No.',    value: BANK.account, key: 'account',   copyable: true },
                    ].map(row => (
                      <div key={row.key} className="flex justify-between items-center bg-white rounded-xl px-3 py-2.5 border border-blue-100">
                        <span className="text-gray-400">{row.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold font-mono text-gray-900">{row.value}</span>
                          {row.copyable && (
                            <button
                              onClick={e => { e.stopPropagation(); copy(row.value, row.key); }}
                              className="text-blue-400 hover:text-blue-600 transition-colors"
                            >
                              {copied === row.key ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    <p className="text-xs text-blue-400 text-center pt-1">Use your name as payment description</p>
                  </div>
                )}
              </div>

              {/* Card */}
              <div
                className={`border rounded-2xl p-4 cursor-pointer transition-all ${
                  expanded === 'card' ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                }`}
                onMouseEnter={() => setExpanded('card')}
                onMouseLeave={() => setExpanded(prev => (prev === 'card' ? null : prev))}
                onClick={() => toggle('card')}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl transition-colors ${expanded === 'card' ? 'bg-purple-100' : 'bg-gray-100'}`}>
                    <CreditCard className={`w-5 h-5 ${expanded === 'card' ? 'text-purple-600' : 'text-gray-500'}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-700">Card Payment</p>
                    <p className={`text-xs ${expanded === 'card' ? 'text-purple-500' : 'text-gray-400'}`}>
                      {expanded === 'card' ? 'Visa · Mastercard' : 'Hover to see details'}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 border border-gray-200 px-2 py-0.5 rounded-full">Soon</span>
                </div>
                {expanded === 'card' && (
                  <div className="mt-4 text-sm text-center text-purple-600 bg-white rounded-xl p-3 border border-purple-100">
                    Card payments are coming soon. Use M-Pesa or Bank Transfer for now.
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-400 text-center mt-6">
                Questions?{' '}
                <a href="https://wa.me/254726899113" target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline">
                  Chat with us on WhatsApp
                </a>
              </p>
            </>
          )}
        </section>
      </MainLayout>
    </>
  );
}
