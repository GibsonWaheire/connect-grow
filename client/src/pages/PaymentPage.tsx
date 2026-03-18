import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { Header } from '@/shared/components/Header';
import { Smartphone, Building2, CreditCard, Copy, CheckCircle2 } from 'lucide-react';

const BANK = {
  name: 'Equity Bank',
  paybill: '247247',
  account: '0020195655920',
};

export default function PaymentPage() {
  const [params] = useSearchParams();
  const service = params.get('service') || 'Digital Service';
  const amount = params.get('amount') || '0';

  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<'bank' | 'card' | null>(null);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggle = (method: 'bank' | 'card') => {
    setExpanded(prev => (prev === method ? null : method));
  };

  const handleMpesa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !amount) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/mpesa/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, amount: Number(amount), description: service }),
      });
      const data = await res.json();
      if (data.success) {
        setResult({ type: 'success', message: 'STK push sent! Check your phone and enter your M-Pesa PIN to complete.' });
      } else {
        setResult({ type: 'error', message: data.error || 'Payment failed. Please try again.' });
      }
    } catch {
      setResult({ type: 'error', message: 'Could not connect. Please check your connection and try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <MainLayout>
        <section className="container mx-auto px-4 pt-24 pb-16 max-w-lg">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">Complete Payment</h1>
            <p className="text-gray-500 text-sm">{service}</p>
          </div>

          {/* Fixed amount — not editable */}
          <div className="mb-6 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex justify-between items-center">
            <span className="text-sm text-gray-500">Amount</span>
            <span className="text-2xl font-bold text-slate-900">
              KES {Number(amount).toLocaleString()}
            </span>
          </div>

          {/* ── M-Pesa (default) ── */}
          <div className="bg-white border-2 border-emerald-500 rounded-2xl p-5 mb-4 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-100 p-2.5 rounded-xl">
                <Smartphone className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">M-Pesa</p>
                <p className="text-xs text-emerald-600">Recommended · Instant</p>
              </div>
              <span className="bg-emerald-500 text-white text-xs px-2.5 py-1 rounded-full font-medium">
                Default
              </span>
            </div>

            <form onSubmit={handleMpesa} className="space-y-3">
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Phone number (e.g. 0712 345 678)"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                required
              />
              <button
                type="submit"
                disabled={loading || !phone}
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3 rounded-xl transition-all"
              >
                {loading ? 'Sending prompt…' : 'Pay with M-Pesa'}
              </button>
            </form>

            {result && (
              <p
                className={`mt-3 text-sm text-center font-medium ${
                  result.type === 'success' ? 'text-emerald-600' : 'text-red-500'
                }`}
              >
                {result.message}
              </p>
            )}
          </div>

          {/* ── Other methods label ── */}
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 text-center select-none">
            Other payment methods
          </p>

          {/* ── Bank Transfer ── */}
          <div
            className={`border rounded-2xl p-4 mb-3 cursor-pointer transition-all ${
              expanded === 'bank'
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
            }`}
            onMouseEnter={() => setExpanded('bank')}
            onMouseLeave={() => setExpanded(prev => (prev === 'bank' ? null : prev))}
            onClick={() => toggle('bank')}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-xl transition-colors ${
                  expanded === 'bank' ? 'bg-blue-100' : 'bg-gray-100'
                }`}
              >
                <Building2 className={`w-5 h-5 ${expanded === 'bank' ? 'text-blue-600' : 'text-gray-500'}`} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-700">Bank Transfer</p>
                <p className={`text-xs transition-colors ${expanded === 'bank' ? 'text-blue-500' : 'text-gray-400'}`}>
                  {expanded === 'bank' ? 'Equity Bank · Paybill' : 'Hover to see details'}
                </p>
              </div>
            </div>

            {expanded === 'bank' && (
              <div className="mt-4 space-y-2 text-sm">
                {[
                  { label: 'Bank', value: BANK.name, key: 'bank-name', copyable: false },
                  { label: 'Paybill Number', value: BANK.paybill, key: 'paybill', copyable: true },
                  { label: 'Account No.', value: BANK.account, key: 'account', copyable: true },
                ].map(row => (
                  <div
                    key={row.key}
                    className="flex justify-between items-center bg-white rounded-xl px-3 py-2.5 border border-blue-100"
                  >
                    <span className="text-gray-400">{row.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold font-mono text-gray-900">{row.value}</span>
                      {row.copyable && (
                        <button
                          onClick={e => { e.stopPropagation(); copy(row.value, row.key); }}
                          className="text-blue-400 hover:text-blue-600 transition-colors"
                          aria-label={`Copy ${row.label}`}
                        >
                          {copied === row.key ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <p className="text-xs text-blue-400 text-center pt-1">
                  Use your name or order reference as payment description
                </p>
              </div>
            )}
          </div>

          {/* ── Card Payment ── */}
          <div
            className={`border rounded-2xl p-4 cursor-pointer transition-all ${
              expanded === 'card'
                ? 'border-purple-400 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
            }`}
            onMouseEnter={() => setExpanded('card')}
            onMouseLeave={() => setExpanded(prev => (prev === 'card' ? null : prev))}
            onClick={() => toggle('card')}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2.5 rounded-xl transition-colors ${
                  expanded === 'card' ? 'bg-purple-100' : 'bg-gray-100'
                }`}
              >
                <CreditCard className={`w-5 h-5 ${expanded === 'card' ? 'text-purple-600' : 'text-gray-500'}`} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-700">Card Payment</p>
                <p className={`text-xs transition-colors ${expanded === 'card' ? 'text-purple-500' : 'text-gray-400'}`}>
                  {expanded === 'card' ? 'Visa · Mastercard' : 'Hover to see details'}
                </p>
              </div>
              <span className="text-xs text-gray-400 border border-gray-200 px-2 py-0.5 rounded-full">
                Coming soon
              </span>
            </div>

            {expanded === 'card' && (
              <div className="mt-4 text-sm text-center text-purple-600 bg-white rounded-xl p-3 border border-purple-100">
                Card payments are coming soon. Use M-Pesa or Bank Transfer in the meantime.
              </div>
            )}
          </div>

          <p className="text-xs text-gray-400 text-center mt-6">
            Questions?{' '}
            <a
              href="https://wa.me/254726899113"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-600 hover:underline"
            >
              Chat with us on WhatsApp
            </a>
          </p>
        </section>
      </MainLayout>
    </>
  );
}
