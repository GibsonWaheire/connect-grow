import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, CheckCircle2, AlertTriangle, ExternalLink, ChevronLeft } from 'lucide-react';

const WALLET = 'EwwKb2thjDuu8rmxpK9AULoxgM3nMB5pbj3NrfnNhxn7';
const TRUST_WALLET_LINK =
  'https://link.trustwallet.com/send?coin=501&address=EwwKb2thjDuu8rmxpK9AULoxgM3nMB5pbj3NrfnNhxn7&token_id=2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo';

const steps = [
  {
    number: 1,
    title: 'Open PayPal & go to Crypto',
    critical: false,
    description:
      'Open the PayPal app on your phone. On the home screen, scroll down until you see the "Crypto" section. Tap on it to enter your crypto wallet.',
    warning: null,
    image: (
      <div className="relative mx-auto w-52 rounded-[2.2rem] border-[5px] border-gray-800 bg-white shadow-2xl overflow-hidden">
        <div className="bg-gray-800 h-7 flex items-center justify-center">
          <div className="w-16 h-1.5 bg-gray-600 rounded-full" />
        </div>
        <div className="bg-[#003087] px-3 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-xs font-bold">PayPal</span>
            <div className="w-5 h-5 bg-white/20 rounded" />
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <p className="text-white/60 text-[9px]">Balance</p>
            <p className="text-white text-sm font-bold">$—.—</p>
          </div>
        </div>
        <div className="p-3 space-y-1.5">
          {['Send & Receive', 'Pay Bills', 'Add Money'].map(item => (
            <div key={item} className="flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1.5">
              <div className="w-3 h-3 bg-gray-300 rounded-full" />
              <span className="text-[9px] text-gray-500">{item}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 bg-[#003087]/10 border-2 border-[#003087] rounded-lg px-2 py-1.5">
            <div className="w-3 h-3 bg-[#003087] rounded-full" />
            <span className="text-[9px] font-bold text-[#003087]">Crypto</span>
            <span className="ml-auto text-[8px] text-[#0070ba] font-semibold">Tap here ↓</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: 2,
    title: 'Find and tap PYUSD',
    critical: false,
    description:
      'Inside the Crypto section you will see a list of available coins. Look for "PYUSD — PayPal USD". Tap it to open your PYUSD wallet.',
    warning: null,
    image: (
      <div className="relative mx-auto w-52 rounded-[2.2rem] border-[5px] border-gray-800 bg-white shadow-2xl overflow-hidden">
        <div className="bg-gray-800 h-7 flex items-center justify-center">
          <div className="w-16 h-1.5 bg-gray-600 rounded-full" />
        </div>
        <div className="bg-[#003087] px-3 py-2">
          <p className="text-white text-xs font-bold">Crypto</p>
          <div className="mt-1.5 bg-white/20 rounded-lg px-2 py-1 flex items-center gap-1">
            <div className="w-3 h-3 bg-white/40 rounded" />
            <span className="text-white/60 text-[9px]">Search coins...</span>
          </div>
        </div>
        <div className="p-3 space-y-1.5">
          {[
            { name: 'Bitcoin', sym: 'BTC', color: '#F7931A' },
            { name: 'Ethereum', sym: 'ETH', color: '#627EEA' },
          ].map(coin => (
            <div key={coin.sym} className="flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1.5">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[7px] font-bold" style={{ background: coin.color }}>
                {coin.sym[0]}
              </div>
              <span className="text-[9px] text-gray-500">{coin.name}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 bg-[#003087]/10 border-2 border-[#003087] rounded-lg px-2 py-1.5">
            <div className="w-5 h-5 rounded-full bg-[#0070ba] flex items-center justify-center text-white text-[7px] font-bold">$</div>
            <div>
              <p className="text-[9px] font-bold text-[#003087]">PYUSD</p>
              <p className="text-[7px] text-gray-400">PayPal USD</p>
            </div>
            <span className="ml-auto text-[8px] text-[#0070ba] font-bold">Tap ↗</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: 3,
    title: 'Tap "Transfer"',
    critical: false,
    description:
      'Inside your PYUSD wallet, tap the "Transfer" button. This opens the transfer screen where you can move PYUSD to an external wallet.',
    warning: null,
    image: (
      <div className="relative mx-auto w-52 rounded-[2.2rem] border-[5px] border-gray-800 bg-white shadow-2xl overflow-hidden">
        <div className="bg-gray-800 h-7 flex items-center justify-center">
          <div className="w-16 h-1.5 bg-gray-600 rounded-full" />
        </div>
        <div className="bg-[#003087] px-3 py-3 text-center">
          <div className="w-10 h-10 bg-[#0070ba] rounded-full flex items-center justify-center mx-auto mb-1">
            <span className="text-white text-sm font-bold">$</span>
          </div>
          <p className="text-white text-xs font-bold">PYUSD</p>
          <p className="text-white/60 text-[9px]">PayPal USD</p>
          <p className="text-white text-base font-bold mt-1">$0.00</p>
        </div>
        <div className="p-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-50 rounded-xl p-2 text-center">
              <p className="text-[8px] text-gray-400">Buy</p>
            </div>
            <div className="bg-[#003087] rounded-xl p-2 text-center">
              <p className="text-[8px] text-white font-bold">Transfer →</p>
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
    critical: false,
    description:
      'PayPal will ask where you want to send. Choose "External Wallet" or "Send to crypto wallet". Do not choose a PayPal contact — you need to send to an external address.',
    warning: null,
    image: (
      <div className="relative mx-auto w-52 rounded-[2.2rem] border-[5px] border-gray-800 bg-white shadow-2xl overflow-hidden">
        <div className="bg-gray-800 h-7 flex items-center justify-center">
          <div className="w-16 h-1.5 bg-gray-600 rounded-full" />
        </div>
        <div className="bg-[#003087] px-3 py-2">
          <p className="text-white text-xs font-bold text-center">Send PYUSD</p>
        </div>
        <div className="p-3 space-y-2">
          <p className="text-[9px] text-gray-400 text-center">Where would you like to send?</p>
          <div className="bg-gray-50 rounded-xl px-2 py-2 flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 text-[9px]">@</div>
            <div>
              <p className="text-[9px] text-gray-500">PayPal Contact</p>
              <p className="text-[7px] text-gray-400">Send to a PayPal user</p>
            </div>
          </div>
          <div className="bg-[#003087]/10 border-2 border-[#003087] rounded-xl px-2 py-2 flex items-center gap-2">
            <div className="w-6 h-6 bg-[#003087] rounded-full flex items-center justify-center text-white text-[9px] font-bold">W</div>
            <div>
              <p className="text-[9px] font-bold text-[#003087]">External Wallet</p>
              <p className="text-[7px] text-[#0070ba]">Send to crypto address</p>
            </div>
            <span className="ml-auto text-[8px] text-[#0070ba] font-bold">Select</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: 5,
    title: 'Select Solana as the network',
    critical: true,
    description:
      'PayPal will ask you to select a blockchain network. You MUST choose Solana. Do not select Ethereum or any other network — sending on the wrong network will cause permanent loss of funds.',
    warning: 'Select SOLANA only. Any other network = lost funds.',
    image: (
      <div className="relative mx-auto w-52 rounded-[2.2rem] border-[5px] border-gray-800 bg-white shadow-2xl overflow-hidden">
        <div className="bg-gray-800 h-7 flex items-center justify-center">
          <div className="w-16 h-1.5 bg-gray-600 rounded-full" />
        </div>
        <div className="bg-red-600 px-3 py-2">
          <p className="text-white text-xs font-bold text-center">Select Network</p>
        </div>
        <div className="p-3 space-y-2">
          <p className="text-[9px] text-gray-400 text-center">Choose blockchain network</p>
          <div className="bg-red-50 border border-red-200 rounded-xl px-2 py-2 flex items-center gap-2 opacity-50">
            <div className="w-5 h-5 bg-[#627EEA] rounded-full flex items-center justify-center text-white text-[7px]">E</div>
            <div>
              <p className="text-[9px] text-gray-400 line-through">Ethereum</p>
              <p className="text-[7px] text-red-400">Do NOT select</p>
            </div>
          </div>
          <div className="bg-green-50 border-2 border-green-500 rounded-xl px-2 py-2 flex items-center gap-2">
            <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-green-400 rounded-full flex items-center justify-center text-white text-[7px] font-bold">S</div>
            <div>
              <p className="text-[9px] font-bold text-green-700">Solana</p>
              <p className="text-[7px] text-green-500">Select this one</p>
            </div>
            <div className="ml-auto w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-[8px]">✓</div>
          </div>
          <div className="bg-gray-50 rounded-xl px-2 py-1.5 flex items-center gap-2 opacity-40">
            <div className="w-5 h-5 bg-gray-300 rounded-full" />
            <p className="text-[9px] text-gray-400">Other networks</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: 6,
    title: 'Paste the wallet address',
    critical: false,
    description:
      'Copy the wallet address from the section below and paste it into the recipient field. Read it carefully — every character matters. You can also use the QR code to scan the address directly into your wallet app.',
    warning: null,
    image: (
      <div className="relative mx-auto w-52 rounded-[2.2rem] border-[5px] border-gray-800 bg-white shadow-2xl overflow-hidden">
        <div className="bg-gray-800 h-7 flex items-center justify-center">
          <div className="w-16 h-1.5 bg-gray-600 rounded-full" />
        </div>
        <div className="bg-[#003087] px-3 py-2">
          <p className="text-white text-xs font-bold text-center">Recipient Address</p>
        </div>
        <div className="p-3 space-y-2">
          <div className="bg-slate-50 border-2 border-[#0070ba] rounded-xl p-2">
            <p className="text-[7px] text-gray-400 mb-1">Solana Wallet Address</p>
            <p className="text-[6px] font-mono text-[#003087] break-all leading-relaxed">EwwKb2thjDuu8rmxpK9A ULoxgM3nMB5pbj3NrfnN hxn7</p>
          </div>
          <div className="flex gap-1.5">
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-1.5 text-center">
              <p className="text-[7px] text-gray-500">Paste</p>
            </div>
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-1.5 text-center">
              <p className="text-[7px] text-gray-500">Scan QR</p>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-1.5 text-center">
            <p className="text-[7px] text-green-600 font-semibold">Verified — Solana address</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: 7,
    title: 'Enter amount and confirm',
    critical: false,
    description:
      'Enter the payment amount in PYUSD. Review everything one more time — network (Solana), address, and amount. Tap "Send" and confirm with your PayPal PIN or fingerprint.',
    warning: null,
    image: (
      <div className="relative mx-auto w-52 rounded-[2.2rem] border-[5px] border-gray-800 bg-white shadow-2xl overflow-hidden">
        <div className="bg-gray-800 h-7 flex items-center justify-center">
          <div className="w-16 h-1.5 bg-gray-600 rounded-full" />
        </div>
        <div className="bg-[#003087] px-3 py-2 text-center">
          <p className="text-white text-xs font-bold">Confirm Transfer</p>
        </div>
        <div className="p-3 space-y-1.5">
          <div className="bg-gray-50 rounded-xl p-2 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[8px] text-gray-400">Amount</span>
              <span className="text-[8px] font-bold text-gray-900">$—.— PYUSD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[8px] text-gray-400">Network</span>
              <span className="text-[8px] font-bold text-green-600">Solana ✓</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[8px] text-gray-400">Fee</span>
              <span className="text-[8px] text-gray-500">~$0.00</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-1.5">
            <p className="text-[7px] text-gray-400 mb-0.5">To</p>
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
    <div className="min-h-screen bg-gray-50">
      {/* Slim top bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors text-sm">
            <ChevronLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="h-4 w-px bg-gray-200" />
          <span className="font-bold text-[#003087] text-sm">McGibs Digital</span>
          <div className="ml-auto flex items-center gap-1.5 bg-[#003087]/8 rounded-full px-2.5 py-1">
            <div className="w-1.5 h-1.5 bg-[#0070ba] rounded-full" />
            <span className="text-[11px] font-semibold text-[#003087]">Pay with PYUSD</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Page title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">How to pay with PayPal PYUSD</h1>
          <p className="text-gray-500 text-sm mt-1">
            Follow these 7 steps to send PYUSD on the Solana network. Takes less than 2 minutes.
          </p>
        </div>

        {/* Critical warning */}
        <div className="mb-8 bg-amber-50 border-2 border-amber-400 rounded-2xl p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-amber-800 text-sm">
            <strong>Before you start:</strong> When PayPal asks you to choose a network, you must select{' '}
            <strong>Solana</strong>. Sending on Ethereum or any other network will result in permanent loss of funds.
          </p>
        </div>

        {/* ── Step-by-step guide ── */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[22px] top-10 bottom-10 w-0.5 bg-gradient-to-b from-[#003087]/20 via-[#003087]/10 to-transparent" />

          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className={`rounded-2xl overflow-hidden shadow-sm border ${step.critical ? 'border-red-300 bg-red-50/40' : 'border-gray-200 bg-white'}`}>
                  {/* Step header */}
                  <div className={`flex items-center gap-3 px-5 py-3.5 ${step.critical ? 'bg-red-600' : 'bg-white border-b border-gray-100'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${step.critical ? 'bg-white text-red-600' : 'bg-[#003087] text-white'}`}>
                      {step.number}
                    </div>
                    <h3 className={`font-bold text-sm flex-1 ${step.critical ? 'text-white' : 'text-slate-900'}`}>
                      {step.title}
                    </h3>
                    {step.critical && (
                      <span className="bg-white text-red-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">
                        Critical
                      </span>
                    )}
                  </div>

                  {/* Phone mockup — centered, prominent */}
                  <div className="py-7 bg-gradient-to-b from-gray-50 to-white flex justify-center">
                    {step.image}
                  </div>

                  {/* Description */}
                  <div className={`px-5 pb-5 ${step.critical ? 'bg-red-50/40' : ''}`}>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                    {step.warning && (
                      <div className="mt-3 flex items-center gap-2 bg-red-100 border border-red-300 rounded-xl px-3 py-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <p className="text-xs text-red-700 font-semibold">{step.warning}</p>
                      </div>
                    )}
                    {step.number === 6 && (
                      <button
                        onClick={handleCopy}
                        className={`mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
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
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Wallet address + QR (after guide) ── */}
        <div className="mt-10">
          <h2 className="text-base font-bold text-slate-900 mb-1">Recipient Wallet Address</h2>
          <p className="text-gray-500 text-sm mb-4">
            Copy this address and paste it into PayPal at step 6. Every character must be exact.
          </p>

          <div className="bg-white border-2 border-[#003087] rounded-2xl p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <code className="flex-1 text-xs font-mono text-[#003087] bg-slate-50 rounded-xl px-3 py-3 break-all leading-relaxed border border-slate-200">
                {WALLET}
              </code>
              <button
                onClick={handleCopy}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  copied
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-[#003087] text-white hover:bg-[#0070ba]'
                }`}
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="mt-3 flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-xs text-green-700 font-medium">Solana (SOL) Network</span>
            </div>
          </div>

          {/* QR — clearly labelled */}
          <div className="mt-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-800 mb-1">Scan QR Code</p>
            <p className="text-xs text-gray-500 mb-4">
              This QR code contains the wallet address above. Use it only if your wallet app supports scanning a
              Solana address — it will fill in the address automatically.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <img
                src="/pyusd-qr.jpeg"
                alt="Solana wallet address QR code"
                className="w-36 h-36 rounded-xl border border-gray-100 object-cover flex-shrink-0"
              />
              <div className="space-y-2 text-sm text-gray-500">
                <p>1. Open your wallet app (PayPal or Trust Wallet)</p>
                <p>2. Tap "Scan" or the QR icon</p>
                <p>3. Point camera at this QR code</p>
                <p>4. The address will fill in automatically</p>
                <a
                  href={TRUST_WALLET_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#0070ba] font-medium hover:underline mt-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open directly in Trust Wallet
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* After payment */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-green-800 text-sm mb-1">After sending payment</p>
              <p className="text-green-700 text-sm">
                Send us a screenshot of your transaction receipt on WhatsApp. We will verify and process your
                order right away.
              </p>
              <a
                href="https://wa.me/254726899113"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Send confirmation on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-8">
          <h2 className="text-base font-bold text-slate-900 mb-4">Questions</h2>
          <div className="space-y-3">
            {[
              {
                q: 'Do I need a PayPal account?',
                a: 'Yes. You need a PayPal account with a PYUSD balance. You can buy PYUSD directly inside PayPal using your bank card.',
              },
              {
                q: 'Why Solana and not Ethereum?',
                a: 'Our receiving address is a Solana wallet. PYUSD exists on both chains, but sending on Ethereum to a Solana address means the funds are lost. Always verify the network first.',
              },
              {
                q: 'How long does the transfer take?',
                a: 'Solana transactions are very fast — your payment usually arrives within seconds.',
              },
              {
                q: 'What if I sent on the wrong network?',
                a: 'Blockchain transactions cannot be reversed. That is why verifying the Solana network before confirming is so important. Contact us on WhatsApp immediately if you think something went wrong.',
              },
              {
                q: 'Can I also use Trust Wallet?',
                a: 'Yes. Tap "Open directly in Trust Wallet" above or scan the QR code with Trust Wallet to pay with PYUSD. Make sure Trust Wallet is installed.',
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="font-semibold text-slate-800 text-sm mb-1">{faq.q}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-10 pb-6">
          Need help?{' '}
          <a href="https://wa.me/254726899113" target="_blank" rel="noreferrer" className="text-[#0070ba] hover:underline">
            Chat with us on WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
}
