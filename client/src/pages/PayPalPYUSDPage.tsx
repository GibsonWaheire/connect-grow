import { useState } from 'react';
import { Header } from '@/shared/components/Header';
import { MainLayout } from '@/layouts/MainLayout';
import { Copy, CheckCircle2, AlertTriangle, ExternalLink, Shield, Zap } from 'lucide-react';

const WALLET = 'EwwKb2thjDuu8rmxpK9AULoxgM3nMB5pbj3NrfnNhxn7';
const TRUST_WALLET_LINK =
  'https://link.trustwallet.com/send?coin=501&address=EwwKb2thjDuu8rmxpK9AULoxgM3nMB5pbj3NrfnNhxn7&token_id=2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo';

const steps = [
  {
    number: 1,
    title: 'Open PayPal & Go to Crypto',
    description:
      'Open the PayPal app on your phone. Tap the menu icon (☰) or navigate to the Finance tab. Scroll down and select "Crypto" from the list of options.',
    warning: null,
    image: (
      <div className="relative mx-auto w-48 rounded-[2rem] border-4 border-gray-800 bg-white shadow-2xl overflow-hidden">
        <div className="bg-gray-800 h-6 flex items-center justify-center">
          <div className="w-16 h-1.5 bg-gray-600 rounded-full" />
        </div>
        <div className="bg-[#003087] px-3 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-xs font-bold">PayPal</span>
            <div className="flex gap-1">
              <div className="w-4 h-4 bg-white/20 rounded" />
              <div className="w-4 h-4 bg-white/20 rounded" />
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <p className="text-white/70 text-[9px]">Balance</p>
            <p className="text-white text-sm font-bold">$—.—</p>
          </div>
        </div>
        <div className="p-3 space-y-1.5">
          {['Send & Receive', 'Pay Bills', 'Add Money'].map(item => (
            <div key={item} className="flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1.5">
              <div className="w-3 h-3 bg-gray-300 rounded-full" />
              <span className="text-[9px] text-gray-600">{item}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 bg-[#003087]/10 border border-[#003087]/30 rounded-lg px-2 py-1.5">
            <div className="w-3 h-3 bg-[#003087] rounded-full" />
            <span className="text-[9px] font-bold text-[#003087]">Crypto</span>
            <div className="ml-auto text-[8px] text-[#0070ba] font-semibold">Tap here</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: 2,
    title: 'Find & Select PYUSD',
    description:
      'Inside the Crypto section, you will see a list of available cryptocurrencies. Scroll or search for "PYUSD" — PayPal\'s own USD-backed stablecoin. Tap on it to open your PYUSD wallet.',
    warning: null,
    image: (
      <div className="relative mx-auto w-48 rounded-[2rem] border-4 border-gray-800 bg-white shadow-2xl overflow-hidden">
        <div className="bg-gray-800 h-6 flex items-center justify-center">
          <div className="w-16 h-1.5 bg-gray-600 rounded-full" />
        </div>
        <div className="bg-[#003087] px-3 py-2">
          <p className="text-white text-xs font-bold">Crypto</p>
          <div className="mt-1.5 bg-white/20 rounded-lg px-2 py-1 flex items-center gap-1">
            <div className="w-3 h-3 bg-white/50 rounded" />
            <span className="text-white/70 text-[9px]">Search coins...</span>
          </div>
        </div>
        <div className="p-2 space-y-1.5">
          {[
            { name: 'Bitcoin', sym: 'BTC', color: '#F7931A' },
            { name: 'Ethereum', sym: 'ETH', color: '#627EEA' },
          ].map(coin => (
            <div key={coin.sym} className="flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1.5">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[7px] font-bold" style={{ background: coin.color }}>
                {coin.sym[0]}
              </div>
              <span className="text-[9px] text-gray-600">{coin.name}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 bg-[#0070ba]/10 border-2 border-[#0070ba] rounded-lg px-2 py-1.5">
            <div className="w-5 h-5 rounded-full bg-[#0070ba] flex items-center justify-center text-white text-[7px] font-bold">$</div>
            <div>
              <p className="text-[9px] font-bold text-[#003087]">PYUSD</p>
              <p className="text-[7px] text-gray-400">PayPal USD</p>
            </div>
            <div className="ml-auto text-[8px] text-[#0070ba] font-bold">Select</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: 3,
    title: 'Tap "Transfer" or "Send"',
    description:
      'Once inside your PYUSD wallet, tap the "Transfer" or "Send" button. This will open the transfer options screen where you can choose to send to an external wallet.',
    warning: null,
    image: (
      <div className="relative mx-auto w-48 rounded-[2rem] border-4 border-gray-800 bg-white shadow-2xl overflow-hidden">
        <div className="bg-gray-800 h-6 flex items-center justify-center">
          <div className="w-16 h-1.5 bg-gray-600 rounded-full" />
        </div>
        <div className="bg-[#003087] px-3 py-3 text-center">
          <div className="w-10 h-10 bg-[#0070ba] rounded-full flex items-center justify-center mx-auto mb-1">
            <span className="text-white text-sm font-bold">$</span>
          </div>
          <p className="text-white text-xs font-bold">PYUSD</p>
          <p className="text-white/70 text-[9px]">PayPal USD</p>
          <p className="text-white text-base font-bold mt-1">$0.00</p>
        </div>
        <div className="p-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-50 rounded-lg p-2 text-center">
              <div className="w-6 h-6 bg-gray-200 rounded-full mx-auto mb-1" />
              <p className="text-[8px] text-gray-500">Buy</p>
            </div>
            <div className="bg-[#003087] rounded-lg p-2 text-center cursor-pointer">
              <div className="w-6 h-6 bg-white/20 rounded-full mx-auto mb-1 flex items-center justify-center">
                <span className="text-white text-[8px]">→</span>
              </div>
              <p className="text-[8px] text-white font-bold">Transfer</p>
            </div>
          </div>
          <p className="text-[8px] text-center text-[#0070ba] font-semibold">Tap "Transfer"</p>
        </div>
      </div>
    ),
  },
  {
    number: 4,
    title: 'Select "Send to External Wallet"',
    description:
      'PayPal will ask you where you want to send. Choose "External Wallet" or "Send to crypto wallet". Do NOT send to a PayPal contact — you need to send to an external Solana wallet address.',
    warning: null,
    image: (
      <div className="relative mx-auto w-48 rounded-[2rem] border-4 border-gray-800 bg-white shadow-2xl overflow-hidden">
        <div className="bg-gray-800 h-6 flex items-center justify-center">
          <div className="w-16 h-1.5 bg-gray-600 rounded-full" />
        </div>
        <div className="bg-[#003087] px-3 py-2">
          <p className="text-white text-xs font-bold text-center">Send PYUSD</p>
        </div>
        <div className="p-3 space-y-2">
          <p className="text-[9px] text-gray-500 text-center">Where would you like to send?</p>
          <div className="bg-gray-50 rounded-lg px-2 py-2 flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-[9px]">@</span>
            </div>
            <div>
              <p className="text-[9px] text-gray-600">PayPal Contact</p>
              <p className="text-[7px] text-gray-400">Send to a PayPal user</p>
            </div>
          </div>
          <div className="bg-[#003087]/10 border-2 border-[#003087] rounded-lg px-2 py-2 flex items-center gap-2">
            <div className="w-6 h-6 bg-[#003087] rounded-full flex items-center justify-center">
              <span className="text-white text-[9px]">W</span>
            </div>
            <div>
              <p className="text-[9px] font-bold text-[#003087]">External Wallet</p>
              <p className="text-[7px] text-[#0070ba]">Send to crypto address</p>
            </div>
            <div className="ml-auto text-[8px] text-[#0070ba] font-bold">Select</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: 5,
    title: 'CRITICAL: Select Solana Network',
    description:
      'This is the most important step. PayPal will ask you to choose the blockchain network. You MUST select "Solana". Do NOT select Ethereum or any other network — sending on the wrong network will result in permanent loss of funds.',
    warning: 'Always choose SOLANA network. Sending on Ethereum or other networks will result in lost funds.',
    image: (
      <div className="relative mx-auto w-48 rounded-[2rem] border-4 border-gray-800 bg-white shadow-2xl overflow-hidden">
        <div className="bg-gray-800 h-6 flex items-center justify-center">
          <div className="w-16 h-1.5 bg-gray-600 rounded-full" />
        </div>
        <div className="bg-[#003087] px-3 py-2">
          <p className="text-white text-xs font-bold text-center">Select Network</p>
        </div>
        <div className="p-3 space-y-2">
          <p className="text-[9px] text-gray-500 text-center">Choose blockchain network</p>
          <div className="bg-red-50 border border-red-200 rounded-lg px-2 py-2 flex items-center gap-2 opacity-60">
            <div className="w-5 h-5 bg-[#627EEA] rounded-full flex items-center justify-center">
              <span className="text-white text-[7px]">E</span>
            </div>
            <div>
              <p className="text-[9px] text-gray-500 line-through">Ethereum</p>
              <p className="text-[7px] text-red-400">Do NOT select</p>
            </div>
          </div>
          <div className="bg-green-50 border-2 border-green-500 rounded-lg px-2 py-2 flex items-center gap-2">
            <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-green-400 rounded-full flex items-center justify-center">
              <span className="text-white text-[7px] font-bold">S</span>
            </div>
            <div>
              <p className="text-[9px] font-bold text-green-700">Solana</p>
              <p className="text-[7px] text-green-500">Select this one</p>
            </div>
            <div className="ml-auto w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-[7px]">✓</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg px-2 py-1 flex items-center gap-2 opacity-50">
            <div className="w-5 h-5 bg-gray-300 rounded-full" />
            <p className="text-[9px] text-gray-400">Other networks</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: 6,
    title: 'Paste the Wallet Address',
    description:
      'Copy the wallet address below and paste it into the "Recipient address" field. Double-check that the full address is correct before continuing. You can also scan the QR code displayed on this page.',
    warning: null,
    image: (
      <div className="relative mx-auto w-48 rounded-[2rem] border-4 border-gray-800 bg-white shadow-2xl overflow-hidden">
        <div className="bg-gray-800 h-6 flex items-center justify-center">
          <div className="w-16 h-1.5 bg-gray-600 rounded-full" />
        </div>
        <div className="bg-[#003087] px-3 py-2">
          <p className="text-white text-xs font-bold text-center">Recipient Address</p>
        </div>
        <div className="p-3 space-y-2">
          <div className="bg-gray-50 border-2 border-[#0070ba] rounded-lg p-2">
            <p className="text-[7px] text-gray-400 mb-1">Solana Wallet Address</p>
            <p className="text-[6px] font-mono text-[#003087] break-all leading-relaxed">EwwKb2thjDuu8rmxpK9A ULoxgM3nMB5pbj3NrfnN hxn7</p>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-1.5 text-center">
              <p className="text-[7px] text-gray-500">Paste</p>
            </div>
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-1.5 text-center">
              <p className="text-[7px] text-gray-500">Scan QR</p>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-1.5 text-center">
            <p className="text-[7px] text-green-600 font-semibold">Address verified - Solana</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: 7,
    title: 'Enter Amount & Confirm',
    description:
      'Enter the amount of PYUSD you want to send. Review all details carefully — network (Solana), address, and amount. Tap "Send" and confirm with your PayPal PIN or biometrics to complete the payment.',
    warning: null,
    image: (
      <div className="relative mx-auto w-48 rounded-[2rem] border-4 border-gray-800 bg-white shadow-2xl overflow-hidden">
        <div className="bg-gray-800 h-6 flex items-center justify-center">
          <div className="w-16 h-1.5 bg-gray-600 rounded-full" />
        </div>
        <div className="bg-[#003087] px-3 py-2 text-center">
          <p className="text-white text-xs font-bold">Confirm Transfer</p>
        </div>
        <div className="p-3 space-y-1.5">
          <div className="bg-gray-50 rounded-lg p-2 space-y-1">
            <div className="flex justify-between">
              <span className="text-[8px] text-gray-400">Amount</span>
              <span className="text-[8px] font-bold text-gray-900">$—.— PYUSD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[8px] text-gray-400">Network</span>
              <span className="text-[8px] font-bold text-green-600">Solana</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[8px] text-gray-400">Fee</span>
              <span className="text-[8px] text-gray-600">~$0.00</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-1.5">
            <p className="text-[7px] text-gray-400">To</p>
            <p className="text-[6px] font-mono text-gray-700 break-all">EwwKb2thjDuu8rmxpK9A...</p>
          </div>
          <button className="w-full bg-[#003087] rounded-xl py-2 text-white text-[9px] font-bold">
            Confirm &amp; Send
          </button>
        </div>
      </div>
    ),
  },
];

export default function PayPalPYUSDPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(WALLET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <Header />
      <MainLayout>
        <section className="pt-[88px] pb-20">
          {/* Hero */}
          <div className="bg-gradient-to-br from-[#003087] via-[#0070ba] to-[#00a8e0] text-white py-14 px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 rounded-full px-4 py-1.5 mb-5">
                <Zap className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium">Fast &amp; Secure Payments</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Pay with PayPal using PYUSD</h1>
              <p className="text-white/80 text-base max-w-lg mx-auto">
                PYUSD is PayPal's own USD stablecoin — 1 PYUSD = $1 USD. Follow the step-by-step guide below to
                send payment securely on the Solana network.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
                <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
                  <Shield className="w-3.5 h-3.5 text-green-300" />
                  <span>1 PYUSD = $1 USD</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
                  <Zap className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Instant on Solana</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
                  <Shield className="w-3.5 h-3.5 text-blue-300" />
                  <span>Near-zero fees</span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto px-4">
            {/* Critical warning */}
            <div className="mt-8 bg-amber-50 border-2 border-amber-400 rounded-2xl p-4 flex gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-800 text-sm mb-1">Important — Read Before Sending</p>
                <p className="text-amber-700 text-sm">
                  You MUST select the <strong>Solana network</strong> when sending PYUSD. Sending on Ethereum or
                  any other network will result in <strong>permanent loss of funds</strong>. Always copy the
                  full address and verify it before confirming.
                </p>
              </div>
            </div>

            {/* Wallet address card */}
            <div className="mt-8 bg-white border-2 border-[#003087] rounded-2xl p-5 shadow-sm">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Send PYUSD to this Solana address</p>
              <div className="flex items-center gap-3 mt-2">
                <code className="flex-1 text-xs font-mono text-[#003087] bg-slate-50 rounded-xl px-3 py-2.5 break-all leading-relaxed border border-slate-200">
                  {WALLET}
                </code>
                <button
                  onClick={handleCopy}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    copied
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-[#003087] text-white hover:bg-[#0070ba]'
                  }`}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="mt-3 flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs text-green-700 font-medium">Network: Solana (SOL)</span>
              </div>
            </div>

            {/* QR Code */}
            <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center">
              <p className="text-sm font-semibold text-gray-700 mb-3">Scan QR Code to Pay</p>
              <img
                src="/pyusd-qr.jpeg"
                alt="PYUSD Solana wallet QR code"
                className="w-44 h-44 mx-auto rounded-xl border border-gray-100 object-cover"
              />
              <p className="text-xs text-gray-400 mt-2">Scan with PayPal or Trust Wallet</p>
              <a
                href={TRUST_WALLET_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-[#0070ba] text-sm font-medium hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open in Trust Wallet
              </a>
            </div>

            {/* Step-by-step guide */}
            <div className="mt-10">
              <h2 className="text-xl font-bold text-slate-900 mb-1">Step-by-Step Guide</h2>
              <p className="text-gray-500 text-sm mb-8">Follow every step carefully to complete your payment.</p>

              <div className="space-y-10">
                {steps.map((step) => (
                  <div key={step.number} className="relative">
                    {/* Connector line */}
                    {step.number < steps.length && (
                      <div className="absolute left-5 top-14 bottom-[-2.5rem] w-0.5 bg-gradient-to-b from-[#0070ba]/30 to-transparent hidden md:block" />
                    )}

                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${
                          step.number === 5
                            ? 'bg-red-500'
                            : 'bg-[#003087]'
                        }`}>
                          {step.number}
                        </div>
                        <h3 className={`font-bold text-base ${step.number === 5 ? 'text-red-700' : 'text-slate-900'}`}>
                          {step.title}
                        </h3>
                        {step.number === 5 && (
                          <span className="ml-auto bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">CRITICAL</span>
                        )}
                      </div>

                      <div className="p-5 grid md:grid-cols-2 gap-6 items-center">
                        <div>
                          <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                          {step.warning && (
                            <div className="mt-3 flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3">
                              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                              <p className="text-xs text-red-700 font-medium">{step.warning}</p>
                            </div>
                          )}
                          {step.number === 6 && (
                            <button
                              onClick={handleCopy}
                              className={`mt-3 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all w-full justify-center ${
                                copied
                                  ? 'bg-green-100 text-green-700 border border-green-300'
                                  : 'bg-[#003087] text-white hover:bg-[#0070ba]'
                              }`}
                            >
                              {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              {copied ? 'Address Copied!' : 'Copy Wallet Address'}
                            </button>
                          )}
                        </div>
                        <div className="flex justify-center py-2">{step.image}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* After payment */}
            <div className="mt-10 bg-green-50 border border-green-200 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-green-800 mb-1">After Sending Payment</p>
                  <p className="text-green-700 text-sm">
                    Once you have sent the PYUSD, please send us a confirmation message on WhatsApp with a
                    screenshot of your transaction receipt so we can verify and process your order immediately.
                  </p>
                  <a
                    href="https://wa.me/254726899113"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Send Confirmation on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-10">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {[
                  {
                    q: 'Do I need a PayPal account to pay with PYUSD?',
                    a: 'Yes, you need a PayPal account with PYUSD balance. You can buy PYUSD directly inside the PayPal app using your bank account or card.',
                  },
                  {
                    q: 'Why must I use Solana and not Ethereum?',
                    a: 'Our receiving wallet is a Solana wallet address. PYUSD exists on both Ethereum and Solana, but sending to a Solana address on the Ethereum network will result in lost funds. Always double-check the network before sending.',
                  },
                  {
                    q: 'How long does the transfer take?',
                    a: 'Solana transactions are extremely fast — your payment will arrive in seconds, usually under 1 minute.',
                  },
                  {
                    q: 'What if I sent on the wrong network?',
                    a: 'Unfortunately, blockchain transactions are irreversible. This is why it is critical to verify the Solana network is selected before confirming. Contact us immediately on WhatsApp if you suspect an error.',
                  },
                  {
                    q: 'Can I also pay via Trust Wallet?',
                    a: 'Yes! Tap the "Open in Trust Wallet" link above or scan the QR code with Trust Wallet to send PYUSD directly. Make sure Trust Wallet is installed on your device.',
                  },
                ].map((faq) => (
                  <div key={faq.q} className="bg-white border border-gray-200 rounded-xl p-4">
                    <p className="font-semibold text-slate-800 text-sm mb-1.5">{faq.q}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-gray-400 text-center mt-10">
              Need help?{' '}
              <a href="https://wa.me/254726899113" target="_blank" rel="noreferrer" className="text-[#0070ba] hover:underline">
                Chat with us on WhatsApp
              </a>
            </p>
          </div>
        </section>
      </MainLayout>
    </>
  );
}
