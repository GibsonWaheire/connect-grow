import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { config } from "@/config/environment";
import {
  CreditCard,
  Building2,
  Smartphone,
  ExternalLink,
  Shield,
  FileText,
  Banknote,
  Wallet,
  Apple,
  ChevronDown,
  Copy,
  Landmark,
  ArrowLeft,
  MessageCircle,
  Send,
  CircleDollarSign,
} from "lucide-react";

// Copyable field with toast feedback
const CopyableRow = ({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast({ title: t("payment.copied"), duration: 2000 });
  };
  return (
    <p className="flex items-center justify-between gap-2">
      <span>
        <span className="font-semibold">{label}:</span>{" "}
        {href ? (
          <a
            href={href}
            className="font-mono text-primary hover:underline"
            target={href.startsWith("tel:") ? undefined : "_blank"}
            rel={href.startsWith("tel:") ? undefined : "noopener noreferrer"}
          >
            {value}
          </a>
        ) : (
          <span className="font-mono">{value}</span>
        )}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 min-h-[44px] min-w-[44px] shrink-0 touch-manipulation"
        onClick={handleCopy}
        aria-label={`Copy ${label}`}
      >
        <Copy className="h-3.5 w-3.5" />
      </Button>
    </p>
  );
};

// Blurred intermediary code - tap to reveal (avoids confusion with Swift code)
const BlurredIntermediaryCode = ({ label, value }: { label: string; value: string }) => {
  const [revealed, setRevealed] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast({ title: t("payment.copied"), duration: 2000 });
  };
  return (
    <p className="mt-2 text-muted-foreground">
      {label}:{" "}
      {revealed ? (
        <span className="inline-flex items-center gap-2">
          <span className="font-mono">{value}</span>
          <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={handleCopy} aria-label={t("payment.copy")}>
            <Copy className="h-3.5 w-3.5" />
          </Button>
        </span>
      ) : (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="inline-flex items-center gap-2 rounded border border-dashed border-slate-300 bg-slate-50/50 px-2 py-1 font-mono text-xs select-none touch-manipulation hover:border-primary hover:bg-primary/5 transition-colors"
        >
          <span style={{ filter: "blur(4px)" }}>{value}</span>
          <span className="text-primary text-[10px] font-medium whitespace-nowrap">{t("payment.tapToReveal")}</span>
        </button>
      )}
    </p>
  );
};

interface PaymentMethodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

const PaymentMethodModal = ({
  open,
  onOpenChange,
  title,
  children,
}: PaymentMethodModalProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-md sm:max-w-lg max-h-[85vh] overflow-hidden flex flex-col">
      <DialogHeader>
        <DialogTitle className="text-lg sm:text-xl flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary shrink-0" />
          {title}
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4 text-sm text-muted-foreground overflow-y-auto pr-2 -mr-2 overscroll-contain" style={{ WebkitOverflowScrolling: "touch" }}>
        {children}
      </div>
    </DialogContent>
  </Dialog>
);

// Card color themes: border, bg, icon bg, icon color
const cardThemes = {
  wise: "border-l-4 border-l-teal-500 bg-teal-50/50 hover:bg-teal-50 hover:border-teal-600",
  flutterwave: "border-l-4 border-l-blue-500 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-600",
  apple: "border-l-4 border-l-slate-400",
  paypal: "border-l-4 border-l-slate-400",
  remitly: "border-l-4 border-l-sky-500 bg-sky-50/50 hover:bg-sky-50 hover:border-sky-600",
  remit: "border-l-4 border-l-amber-500 bg-amber-50/50 hover:bg-amber-50 hover:border-amber-600",
  emoney: "border-l-4 border-l-violet-500 bg-violet-50/50 hover:bg-violet-50 hover:border-violet-600",
  alansari: "border-l-4 border-l-slate-600 bg-slate-50/50 hover:bg-slate-100 hover:border-slate-700",
  bank: "border-l-4 border-l-emerald-600 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-700",
} as const;

const iconThemes = {
  wise: "bg-teal-100 text-teal-600",
  flutterwave: "bg-blue-100 text-blue-600",
  apple: "bg-slate-200 text-slate-400",
  paypal: "bg-slate-200 text-slate-400",
  remitly: "bg-sky-100 text-sky-600",
  remit: "bg-amber-100 text-amber-600",
  emoney: "bg-violet-100 text-violet-600",
  alansari: "bg-slate-200 text-slate-600",
  bank: "bg-emerald-100 text-emerald-600",
} as const;

interface PaymentLandingPageProps {
  wisePaymentUrl?: string;
  flutterwavePaymentUrl?: string;
}

export const PaymentLandingPage = ({
  wisePaymentUrl = "https://wise.com/pay/business/mcgibsdigitalsolution",
  flutterwavePaymentUrl = "https://flutterwave.com/pay/qqtucsukcxrs",
}: PaymentLandingPageProps) => {
  const { t, i18n } = useTranslation();
  const [remitOpen, setRemitOpen] = useState(false);
  const [emoneyOpen, setEmoneyOpen] = useState(false);
  const [alAnsariOpen, setAlAnsariOpen] = useState(false);
  const [remitlyOpen, setRemitlyOpen] = useState(false);
  const [bankTransferOpen, setBankTransferOpen] = useState(false);
  const [wiseDetailsOpen, setWiseDetailsOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const paymentMethods = [
    {
      id: "wise" as const,
      name: t("payment.methods.wise"),
      type: "link" as const,
      href: wisePaymentUrl,
      icon: Banknote,
      badge: undefined,
    },
    {
      id: "flutterwave" as const,
      name: t("payment.methods.flutterwave"),
      type: "link" as const,
      href: flutterwavePaymentUrl,
      icon: CreditCard,
      badge: undefined,
    },
    {
      id: "remitly" as const,
      name: t("payment.methods.remitly"),
      type: "modal" as const,
      icon: Send,
      onOpen: () => setRemitlyOpen(true),
      badge: undefined,
    },
    {
      id: "apple" as const,
      name: t("payment.methods.apple"),
      type: "inactive" as const,
      icon: Apple,
      badge: undefined,
    },
    {
      id: "paypal" as const,
      name: t("payment.methods.paypal"),
      type: "inactive" as const,
      icon: CircleDollarSign,
      badge: undefined,
    },
    {
      id: "remit" as const,
      name: t("payment.methods.remit"),
      type: "modal" as const,
      icon: Wallet,
      onOpen: () => setRemitOpen(true),
      badge: undefined,
    },
    {
      id: "emoney" as const,
      name: t("payment.methods.emoney"),
      type: "modal" as const,
      icon: Smartphone,
      onOpen: () => setEmoneyOpen(true),
      badge: undefined,
    },
    {
      id: "alansari" as const,
      name: t("payment.methods.alansari"),
      type: "modal" as const,
      icon: Landmark,
      onOpen: () => setAlAnsariOpen(true),
      badge: t("payment.recommended"),
    },
    {
      id: "bank" as const,
      name: t("payment.methods.bank"),
      type: "modal" as const,
      icon: Building2,
      onOpen: () => setBankTransferOpen(true),
      badge: t("payment.recommended"),
    },
  ];

  const whatsappNumber = config.whatsapp.number;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi, I have a question about my payment.")}`;

  const onlineMethods = paymentMethods.filter((m) =>
    ["wise", "flutterwave", "remitly", "apple", "paypal"].includes(m.id)
  );
  const walletMethods = paymentMethods.filter((m) =>
    ["remit", "emoney", "alansari"].includes(m.id)
  );
  const bankMethods = paymentMethods.filter((m) => m.id === "bank");

  const renderMethodCard = (method: (typeof paymentMethods)[number]) => {
    const Icon = method.icon;
    const cardTheme = cardThemes[method.id];
    const iconTheme = iconThemes[method.id];
    const badge = "badge" in method ? method.badge : undefined;

    if (method.type === "link") {
      return (
        <div key={method.id} className="space-y-2">
          <a
            href={method.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${method.name} payment page in a new tab`}
            className={cn(
              "flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4 min-h-[52px] touch-manipulation transition-all hover:shadow-md active:scale-[0.99]",
              cardTheme
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", iconTheme)}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm sm:text-base font-medium text-foreground">{method.name}</span>
                {method.type === "link" && (
                  <span className="text-xs text-muted-foreground">{t("payment.opensNewTab")}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {badge && (
                <Badge variant="default" className="text-xs">
                  {badge}
                </Badge>
              )}
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
            </div>
          </a>
          {method.id === "wise" && (
            <Collapsible open={wiseDetailsOpen} onOpenChange={setWiseDetailsOpen}>
              <CollapsibleTrigger asChild>
                <button className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 min-h-[44px] text-left text-sm text-muted-foreground hover:bg-slate-50 touch-manipulation">
                  {t("payment.viewWiseDetails")}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", wiseDetailsOpen && "rotate-180")} />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 rounded-lg border border-slate-200 bg-white p-4 font-mono text-xs text-foreground space-y-1">
                  <CopyableRow label={t("payment.name")} value="McGibs Digital Solution" />
                  <CopyableRow label={t("payment.iban")} value="GB71 TRWI 2314 7091 3577 91" />
                  <CopyableRow label={t("payment.swift")} value="TRWIGB2LXXX" />
                  <p><span className="font-semibold">{t("payment.bank")}:</span> Wise Payments Limited, 1st Floor, Worship Square, 65 Clifton Street, London, EC2A 4JE, United Kingdom</p>
                  <BlurredIntermediaryCode label={t("payment.intermediaryCode")} value="CITIGB2L" />
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      );
    }
    if (method.type === "inactive") {
      return (
        <div
          key={method.id}
        className={cn(
          "flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4 min-h-[52px] opacity-60 cursor-not-allowed",
          cardTheme
        )}
        >
          <div className="flex items-center gap-4">
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", iconTheme)}>
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-sm sm:text-base font-medium text-slate-400">{method.name}</span>
          </div>
          <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-500">
            {t("payment.currentlyInactive")}
          </span>
        </div>
      );
    }
    return (
      <button
        key={method.id}
        onClick={method.onOpen}
        className={cn(
          "flex w-full items-center justify-between gap-4 rounded-xl border border-slate-200 p-4 min-h-[52px] touch-manipulation text-left transition-all hover:shadow-md active:scale-[0.99]",
          cardTheme
        )}
      >
        <div className="flex items-center gap-4">
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", iconTheme)}>
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-sm sm:text-base font-medium text-foreground">{method.name}</span>
        </div>
        <div className="flex items-center gap-2">
          {badge && <Badge variant="default" className="text-xs">{badge}</Badge>}
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        </div>
      </button>
    );
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4 sm:py-12 safe-area-top safe-area-bottom safe-area-left safe-area-right pb-[max(2rem,env(safe-area-inset-bottom))]"
      dir={i18n.language?.startsWith("ar") ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 flex items-center justify-between gap-2">
          <Link
            to="/course-help"
            className="inline-flex items-center gap-2 py-3 pr-2 -ml-2 text-sm text-muted-foreground hover:text-foreground touch-manipulation min-h-[44px]"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <ArrowLeft className="h-4 w-4" />
            {t("payment.back")}
          </Link>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => i18n.changeLanguage("en")}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-md min-h-[44px] touch-manipulation transition-colors",
                i18n.language?.startsWith("en") ? "bg-primary text-primary-foreground" : "bg-slate-200 text-slate-600 hover:bg-slate-300"
              )}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => i18n.changeLanguage("ar")}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-md min-h-[44px] touch-manipulation transition-colors",
                i18n.language?.startsWith("ar") ? "bg-primary text-primary-foreground" : "bg-slate-200 text-slate-600 hover:bg-slate-300"
              )}
            >
              ع
            </button>
          </div>
        </div>
        <Card className="overflow-hidden border-slate-200 shadow-xl shadow-slate-200/50">
          <CardHeader className="border-b bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl sm:text-2xl">
                  {t("payment.title")}
                </CardTitle>
                <CardDescription>
                  {t("payment.subtitle")}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="flex justify-center">
              <div className="inline-flex flex-col items-center gap-1 rounded-full border-2 border-primary/40 bg-primary/10 px-5 py-2.5 text-center shadow-md shadow-primary/10 ring-2 ring-primary/10">
                <span className="text-sm font-semibold text-foreground">{t("payment.instruction")}</span>
                <span className="text-xs font-medium text-muted-foreground" dir="rtl">{t("payment.instructionAr")}</span>
              </div>
            </div>
            {/* Payment Methods - Vertical layout */}
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-base font-semibold uppercase tracking-wide text-foreground">
                  {t("payment.mobileWallet")}
                </h3>
                <div className="space-y-3">{walletMethods.map(renderMethodCard)}</div>
              </div>
              <div>
                <h3 className="mb-3 text-base font-semibold uppercase tracking-wide text-foreground">
                  {t("payment.bankTransfer")}
                </h3>
                <div className="space-y-3">{bankMethods.map(renderMethodCard)}</div>
              </div>
              <div>
                <h3 className="mb-3 text-base font-semibold uppercase tracking-wide text-foreground">
                  {t("payment.onlinePayment")}
                </h3>
                <div className="space-y-3">{onlineMethods.map(renderMethodCard)}</div>
              </div>
            </div>

            {/* Accuracy Disclaimer */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4">
              <p className="text-sm leading-relaxed text-amber-900">
                {t("payment.disclaimer1")}
              </p>
              <p className="mt-2 text-xs font-medium text-amber-800">
                {t("payment.disclaimer2")}
              </p>
            </div>

            {/* Service Terms - Collapsible */}
            <Collapsible open={termsOpen} onOpenChange={setTermsOpen}>
              <CollapsibleTrigger asChild>
                <button className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-4 min-h-[52px] text-left hover:bg-slate-50 touch-manipulation">
                  <h3 className="flex items-center gap-2 font-semibold text-foreground">
                    <FileText className="h-5 w-5 text-primary" />
                    {t("payment.serviceTerms")}
                  </h3>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", termsOpen && "rotate-180")} />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ul className="mt-3 space-y-2 px-4 pb-4 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {t("payment.term1")}
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {t("payment.term2")}
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {t("payment.term3")}
                  </li>
                </ul>
              </CollapsibleContent>
            </Collapsible>

            {/* WhatsApp Support */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-primary bg-primary/5 py-4 min-h-[52px] text-sm font-medium text-primary transition-colors hover:bg-primary/10 touch-manipulation active:scale-[0.99]"
            >
              <MessageCircle className="h-5 w-5" />
              {t("payment.whatsappCta")}
            </a>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <PaymentMethodModal
        open={remitOpen}
        onOpenChange={setRemitOpen}
        title={t("payment.modals.remit.title")}
      >
        <p>{t("payment.modals.remit.intro")}</p>
        <ol className="list-inside list-decimal space-y-2">
          <li>{t("payment.modals.remit.step1")}</li>
          <li>{t("payment.modals.remit.step2")}</li>
          <li>{t("payment.modals.remit.step3")}</li>
        </ol>
        <div className="rounded-lg border border-slate-200 bg-white p-4 font-mono text-xs space-y-1">
          <CopyableRow label={t("payment.name")} value="Gibson Waheire Giteru" />
          <CopyableRow label={t("payment.phone")} value="+254726899113" href="tel:+254726899113" />
          <p><span className="font-semibold">{t("payment.provider")}:</span> M-Pesa</p>
        </div>
      </PaymentMethodModal>

      <PaymentMethodModal
        open={remitlyOpen}
        onOpenChange={setRemitlyOpen}
        title={t("payment.modals.remitly.title")}
      >
        <p className="mb-2">{t("payment.modals.remitly.intro")}</p>

        <div className="space-y-4">
          <div>
            <h4 className="mb-2 font-semibold text-foreground">{t("payment.modals.remitly.opt1Title")}</h4>
            <ol className="list-inside list-decimal space-y-1 mb-2">
              <li>{t("payment.modals.remitly.opt1Step1")}</li>
              <li>{t("payment.modals.remitly.opt1Step2")}</li>
              <li>{t("payment.modals.remitly.opt1Step3")}</li>
            </ol>
            <div className="rounded-lg border border-slate-200 bg-white p-4 font-mono text-xs space-y-1">
              <CopyableRow label={t("payment.name")} value="Gibson Waheire Giteru" />
              <p><span className="font-semibold">{t("payment.country")}:</span> Kenya</p>
              <p><span className="font-semibold">{t("payment.city")}:</span> Nairobi</p>
              <CopyableRow label={t("payment.mpesaPhone")} value="+254726899113" href="tel:+254726899113" />
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-semibold text-foreground">{t("payment.modals.remitly.opt2Title")}</h4>
            <p className="mb-2 text-xs">{t("payment.modals.remitly.opt2Intro")}</p>
            <div className="rounded-lg border border-slate-200 bg-white p-4 font-mono text-xs space-y-1">
              <CopyableRow label={t("payment.firstMiddleName")} value="Gibson Waheire" />
              <CopyableRow label={t("payment.lastName")} value="Giteru" />
              <CopyableRow label={t("payment.bank")} value="Equity Bank Ltd" />
              <CopyableRow label={t("payment.accountNo")} value="0020195655920" />
              <CopyableRow label={t("payment.swift")} value="EQBLKENA" />
              <CopyableRow label={t("payment.branchCode")} value="68002" />
              <p><span className="font-semibold">{t("payment.nationality")}:</span> Kenya</p>
              <CopyableRow label={t("payment.phone")} value="+254721465219" href="tel:+254721465219" />
              <BlurredIntermediaryCode label={t("payment.intermediaryCodeIfAsked")} value="CITIUS33" />
            </div>
          </div>

          <p className="text-xs text-muted-foreground">{t("payment.modals.remitly.cashNote")}</p>
        </div>
      </PaymentMethodModal>

      <PaymentMethodModal
        open={emoneyOpen}
        onOpenChange={setEmoneyOpen}
        title={t("payment.modals.emoney.title")}
      >
        <p>{t("payment.modals.emoney.intro")}</p>
        <ol className="list-inside list-decimal space-y-2">
          <li>{t("payment.modals.emoney.step1")}</li>
          <li>{t("payment.modals.emoney.step2")}</li>
          <li>{t("payment.modals.emoney.step3")}</li>
        </ol>
        <div className="rounded-lg border border-slate-200 bg-white p-4 font-mono text-xs space-y-1">
          <CopyableRow label={t("payment.name")} value="Gibson Waheire Giteru" />
          <CopyableRow label={t("payment.phone")} value="+254726899113" href="tel:+254726899113" />
          <p><span className="font-semibold">{t("payment.method")}:</span> M-Pesa</p>
        </div>
      </PaymentMethodModal>

      <PaymentMethodModal
        open={alAnsariOpen}
        onOpenChange={setAlAnsariOpen}
        title={t("payment.modals.alansari.title")}
      >
        <p className="mb-2">{t("payment.modals.alansari.intro")}</p>

        <div className="space-y-4">
          <div>
            <h4 className="mb-2 font-semibold text-foreground">{t("payment.modals.alansari.opt1Title")}</h4>
            <ol className="list-inside list-decimal space-y-1 mb-2">
              <li>{t("payment.modals.alansari.opt1Step1")}</li>
              <li>{t("payment.modals.alansari.opt1Step2")}</li>
              <li>{t("payment.modals.alansari.opt1Step3")}</li>
            </ol>
            <div className="rounded-lg border border-slate-200 bg-white p-4 font-mono text-xs space-y-1">
              <CopyableRow label={t("payment.name")} value="Gibson Waheire Giteru" />
              <p><span className="font-semibold">{t("payment.country")}:</span> Kenya</p>
              <p><span className="font-semibold">{t("payment.city")}:</span> Nairobi</p>
              <CopyableRow label={t("payment.mpesaPhone")} value="+254726899113" href="tel:+254726899113" />
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-semibold text-foreground">{t("payment.modals.alansari.opt2Title")}</h4>
            <p className="mb-2 text-xs">{t("payment.modals.alansari.opt2Intro")}</p>
            <div className="rounded-lg border border-slate-200 bg-white p-4 font-mono text-xs space-y-1">
              <CopyableRow label={t("payment.firstMiddleName")} value="Gibson Waheire" />
              <CopyableRow label={t("payment.lastName")} value="Giteru" />
              <CopyableRow label={t("payment.bank")} value="Equity Bank Ltd" />
              <CopyableRow label={t("payment.accountNo")} value="0020195655920" />
              <CopyableRow label={t("payment.swift")} value="EQBLKENA" />
              <CopyableRow label={t("payment.branchCode")} value="68002" />
              <p><span className="font-semibold">{t("payment.nationality")}:</span> Kenya</p>
              <CopyableRow label={t("payment.phone")} value="+254721465219" href="tel:+254721465219" />
              <BlurredIntermediaryCode label={t("payment.intermediaryCodeIfAsked")} value="CITIUS33" />
            </div>
          </div>

          <p className="text-xs text-muted-foreground">{t("payment.modals.alansari.cashNote")}</p>
        </div>
      </PaymentMethodModal>

      <PaymentMethodModal
        open={bankTransferOpen}
        onOpenChange={setBankTransferOpen}
        title={t("payment.modals.bank.title")}
      >
        <p className="font-medium">{t("payment.modals.bank.intro")}</p>
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 font-semibold text-foreground">{t("payment.modals.bank.ukTitle")}</h4>
            <div className="rounded-lg border-2 border-blue-200 bg-blue-50/80 p-4 font-mono text-xs space-y-1">
              <CopyableRow label={t("payment.name")} value="McGibs Digital Solution" />
              <CopyableRow label={t("payment.iban")} value="GB71 TRWI 2314 7091 3577 91" />
              <CopyableRow label={t("payment.swift")} value="TRWIGB2LXXX" />
              <p><span className="font-semibold">{t("payment.bank")}:</span> Wise Payments Limited, 1st Floor, Worship Square, 65 Clifton Street, London, EC2A 4JE, United Kingdom</p>
              <BlurredIntermediaryCode label={t("payment.intermediaryCode")} value="CITIGB2L" />
            </div>
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-foreground">{t("payment.modals.bank.keTitle")}</h4>
            <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50/80 p-4 font-mono text-xs space-y-1">
              <CopyableRow label={t("payment.firstMiddleName")} value="Gibson Waheire" />
              <CopyableRow label={t("payment.lastName")} value="Giteru" />
              <CopyableRow label={t("payment.bank")} value="Equity Bank Ltd" />
              <CopyableRow label={t("payment.accountNo")} value="0020195655920" />
              <CopyableRow label={t("payment.swift")} value="EQBLKENA" />
              <CopyableRow label={t("payment.branchCode")} value="68002" />
              <p><span className="font-semibold">{t("payment.nationality")}:</span> Kenya</p>
              <CopyableRow label={t("payment.phone")} value="+254721465219" href="tel:+254721465219" />
              <BlurredIntermediaryCode label={t("payment.intermediaryCodeIfAsked")} value="CITIUS33" />
            </div>
          </div>
        </div>
      </PaymentMethodModal>
    </div>
  );
};
