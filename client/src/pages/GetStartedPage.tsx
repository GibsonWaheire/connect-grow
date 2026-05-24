import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { MainLayout } from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/shared/components/Header";
import { Smartphone, Building2, CreditCard, Copy, CheckCircle2, ArrowRight, Lock, Loader2 } from "lucide-react";
import { useMpesaPayment } from "@/shared/hooks/useMpesaPayment";

const BANK = { name: 'Equity Bank', paybill: '247247', account: '0020195655920' };

const packages = [
  { name: "Social Media Post (Single)",        price: 1300  },
  { name: "Logo Design (Basic)",               price: 1950  },
  { name: "SEO Audit (Basic)",                 price: 2600  },
  { name: "Content Creation (500 words)",      price: 3250  },
  { name: "Social Media Management (Monthly)", price: 4550  },
  { name: "Landing Page Design",               price: 6500  },
  { name: "Brand Identity Kit",                price: 9750  },
  { name: "Content Package (5 articles)",      price: 13000 },
  { name: "Website Starter Kit",               price: 19500 },
];

interface FormErrors {
  firstName?: string;
  email?: string;
  phone?: string;
  packageIndex?: string;
}

const GetStartedPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    packageIndex: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [step, setStep] = useState<"info" | "payment">("info");
  const [copied, setCopied] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<"bank" | "card" | null>(null);

  const { status, message, pay, reset } = useMpesaPayment();
  const notifiedRef = useRef(false);

  useEffect(() => {
    if (status === 'success' && !notifiedRef.current && selectedPkg) {
      notifiedRef.current = true;
      const params = {
        from_name: `${formData.firstName} ${formData.lastName}`.trim(),
        from_email: formData.email,
        phone: formData.phone,
        subject: `New Payment: ${selectedPkg.name}`,
        message: `${formData.firstName} ${formData.lastName} paid KES ${selectedPkg.price.toLocaleString()} for "${selectedPkg.name}" via M-Pesa.\n\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\n${message}`,
      };
      emailjs.send('service_f2b2p85', 'template_contact', params, 'qt_5lcSYSB6Vp2Ll3').catch(() => {});
    }
    if (status === 'idle') notifiedRef.current = false;
  }, [status]);

  const selectedPkg = formData.packageIndex !== "" ? packages[Number(formData.packageIndex)] : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validateInfo = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    const cleanPhone = formData.phone.trim().replace(/\s+/g, '');
    if (!cleanPhone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^(07|01|2547|2541|\+2547|\+2541)\d{8,9}$/.test(cleanPhone)) {
      newErrors.phone = "Enter a valid Safaricom number e.g. 0712 345 678.";
    }
    if (formData.packageIndex === "") {
      newErrors.packageIndex = "Please select a package.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInfo()) {
      setStep("payment");
    }
  };

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggle = (method: "bank" | "card") => {
    setExpanded(prev => (prev === method ? null : method));
  };

  const handleMpesa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPkg) return;
    pay(formData.phone.trim(), selectedPkg.price, selectedPkg.name);
  };

  const isActive = status === 'sending' || status === 'waiting';

  return (
    <>
      <Header />
      <MainLayout>
        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-50 via-white to-cyan-50 pt-[88px] pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                {step === "info" ? "Get Started Today" : "Complete Your Payment"}
              </h1>
              <p className="text-xl text-slate-600">
                {step === "info"
                  ? "Choose your package and fill in your details."
                  : selectedPkg
                    ? `KES ${selectedPkg.price.toLocaleString()} — ${selectedPkg.name}`
                    : ""}
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-lg mx-auto">
            {/* Progress indicator */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 ${step === "info" ? "text-emerald-600" : "text-slate-400"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${step === "info" ? "bg-emerald-600 text-white" : "bg-emerald-100 text-emerald-600"}`}>
                    {step === "payment" ? <CheckCircle2 className="w-5 h-5" /> : "1"}
                  </div>
                  <span className="font-medium">Your Info</span>
                </div>
                <div className={`w-16 h-0.5 ${step === "payment" ? "bg-emerald-600" : "bg-slate-200"}`} />
                <div className={`flex items-center gap-2 ${step === "payment" ? "text-emerald-600" : "text-slate-400"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${step === "payment" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                    2
                  </div>
                  <span className="font-medium">Payment</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">

              {/* ── Step 1: Info ── */}
              {step === "info" && (
                <form onSubmit={handleInfoSubmit} noValidate className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">First Name *</label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        className={errors.firstName ? "border-red-400" : ""}
                      />
                      {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name</label>
                      <Input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address *</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={errors.email ? "border-red-400" : ""}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">M-Pesa Phone Number *</label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0712 345 678"
                      className={errors.phone ? "border-red-400" : ""}
                    />
                    {errors.phone
                      ? <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                      : <p className="text-xs text-slate-400 mt-1">This number will receive the STK push prompt.</p>
                    }
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Select Package *</label>
                    <select
                      name="packageIndex"
                      value={formData.packageIndex}
                      onChange={handleChange}
                      className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        errors.packageIndex ? "border-red-400" : "border-input"
                      }`}
                    >
                      <option value="">Choose a package</option>
                      {packages.map((pkg, i) => (
                        <option key={pkg.name} value={String(i)}>
                          {pkg.name} — KES {pkg.price.toLocaleString()}
                        </option>
                      ))}
                    </select>
                    {errors.packageIndex && <p className="text-xs text-red-500 mt-1">{errors.packageIndex}</p>}
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg font-semibold">
                    Continue to Payment <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              )}

              {/* ── Step 2: Payment ── */}
              {step === "payment" && selectedPkg && (
                <div className="space-y-4">
                  {/* Fixed amount display */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-slate-500">{selectedPkg.name}</p>
                      <p className="text-xs text-slate-400">{formData.firstName} · {formData.email}</p>
                    </div>
                    <span className="text-2xl font-bold text-slate-900">KES {selectedPkg.price.toLocaleString()}</span>
                  </div>

                  {/* Success */}
                  {status === 'success' && (
                    <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-6 text-center">
                      <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                      <p className="font-semibold text-emerald-700 text-lg">Payment Confirmed!</p>
                      <p className="text-emerald-600 text-sm mt-1">{message}</p>
                      <button onClick={reset} className="mt-4 text-sm text-emerald-600 underline">
                        Make another payment
                      </button>
                    </div>
                  )}

                  {/* Failed / Cancelled */}
                  {(status === 'failed' || status === 'cancelled') && (
                    <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4 text-center">
                      <p className="font-semibold text-red-600">{status === 'cancelled' ? 'Payment Cancelled' : 'Payment Failed'}</p>
                      <p className="text-red-500 text-sm mt-1">{message}</p>
                      <button onClick={reset} className="mt-3 text-sm text-red-500 underline">Try again</button>
                    </div>
                  )}

                  {/* M-Pesa — default */}
                  {status !== 'success' && (
                    <div className="bg-white border-2 border-emerald-500 rounded-2xl p-5 shadow-sm">
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

                      {/* Sending */}
                      {status === 'sending' && (
                        <div className="flex flex-col items-center gap-3 py-4">
                          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                          <p className="text-sm text-gray-500">Sending STK push…</p>
                        </div>
                      )}

                      {/* Waiting / polling */}
                      {status === 'waiting' && (
                        <div className="flex flex-col items-center gap-3 py-4">
                          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                          <p className="text-sm font-medium text-emerald-700">{message}</p>
                          <p className="text-xs text-gray-400">Verifying payment — please wait…</p>
                        </div>
                      )}

                      {/* Idle / failed / cancelled — show button */}
                      {!isActive && (
                        <form onSubmit={handleMpesa}>
                          <p className="text-sm text-slate-500 mb-3">
                            Prompt will be sent to <span className="font-medium text-slate-700">{formData.phone}</span>
                          </p>
                          <button
                            type="submit"
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all"
                          >
                            Pay KES {selectedPkg.price.toLocaleString()} via M-Pesa
                          </button>
                        </form>
                      )}
                    </div>
                  )}

                  {/* Other methods */}
                  {status !== 'success' && (
                    <>
                      <p className="text-xs text-gray-400 uppercase tracking-widest text-center select-none">Other payment methods</p>

                      {/* Bank */}
                      <div
                        className={`border rounded-2xl p-4 cursor-pointer transition-all ${expanded === "bank" ? "border-blue-400 bg-blue-50" : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"}`}
                        onMouseEnter={() => setExpanded("bank")}
                        onMouseLeave={() => setExpanded(prev => prev === "bank" ? null : prev)}
                        onClick={() => toggle("bank")}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl ${expanded === "bank" ? "bg-blue-100" : "bg-gray-100"}`}>
                            <Building2 className={`w-5 h-5 ${expanded === "bank" ? "text-blue-600" : "text-gray-500"}`} />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-700">Bank Transfer</p>
                            <p className={`text-xs ${expanded === "bank" ? "text-blue-500" : "text-gray-400"}`}>
                              {expanded === "bank" ? "Equity Bank · Paybill" : "Hover to see details"}
                            </p>
                          </div>
                        </div>
                        {expanded === "bank" && (
                          <div className="mt-4 space-y-2 text-sm">
                            {[
                              { label: "Bank",           value: BANK.name,    key: "bname",   copyable: false },
                              { label: "Paybill Number", value: BANK.paybill, key: "paybill", copyable: true  },
                              { label: "Account No.",    value: BANK.account, key: "account", copyable: true  },
                            ].map(row => (
                              <div key={row.key} className="flex justify-between items-center bg-white rounded-xl px-3 py-2.5 border border-blue-100">
                                <span className="text-gray-400">{row.label}</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold font-mono text-gray-900">{row.value}</span>
                                  {row.copyable && (
                                    <button onClick={e => { e.stopPropagation(); copy(row.value, row.key); }} className="text-blue-400 hover:text-blue-600">
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
                        className={`border rounded-2xl p-4 cursor-pointer transition-all ${expanded === "card" ? "border-purple-400 bg-purple-50" : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50"}`}
                        onMouseEnter={() => setExpanded("card")}
                        onMouseLeave={() => setExpanded(prev => prev === "card" ? null : prev)}
                        onClick={() => toggle("card")}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl ${expanded === "card" ? "bg-purple-100" : "bg-gray-100"}`}>
                            <CreditCard className={`w-5 h-5 ${expanded === "card" ? "text-purple-600" : "text-gray-500"}`} />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-700">Card Payment</p>
                            <p className={`text-xs ${expanded === "card" ? "text-purple-500" : "text-gray-400"}`}>
                              {expanded === "card" ? "Visa · Mastercard" : "Hover to see details"}
                            </p>
                          </div>
                          <span className="text-xs text-gray-400 border border-gray-200 px-2 py-0.5 rounded-full">Soon</span>
                        </div>
                        {expanded === "card" && (
                          <div className="mt-4 text-sm text-center text-purple-600 bg-white rounded-xl p-3 border border-purple-100">
                            Card payments are coming soon. Use M-Pesa or Bank Transfer for now.
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {status !== 'success' && (
                    <button
                      onClick={() => { reset(); setStep("info"); }}
                      className="w-full text-sm text-slate-400 hover:text-slate-600 transition-colors pt-2"
                    >
                      ← Back to details
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                <Lock className="w-4 h-4" />
                <span>Secure payment. Your information is protected.</span>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default GetStartedPage;
