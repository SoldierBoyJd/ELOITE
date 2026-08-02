import { useEffect } from "react";
import {
  AlertTriangle,
  BadgeCheck,
  BarChart3,
  Bell,
  Boxes,
  Check,
  CheckCircle,
  CheckCircle2,
  ChevronRight,
  ChevronsUpDown,
  Copy,
  CreditCard,
  Download,
  FileBarChart,
  FileText,
  FileType,
  GitCompareArrows,
  HelpCircle,
  LayoutDashboard,
  Maximize2,
  Package,
  RotateCw,
  ScanLine,
  Search,
  SearchCheck,
  Settings,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Upload,
  Workflow,
  XCircle,
  Zap,
  ZoomIn,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function App() {
  return (
    <div>
      <div className="bg-white text-neutral-950 flex w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <aside className="shrink-0 bg-neutral-50 border-neutral-200 border-t-0 border-r-1 border-b-0 border-l-0 border-solid flex p-4 flex-col gap-6 w-64 h-239">
          <div className="flex px-2 pt-2 items-center gap-2">
            <div className="size-9 shadow-sm rounded-xl bg-neutral-900 text-neutral-50 flex justify-center items-center">
              <Boxes className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm leading-5 tracking-tight">
                StockPilot AI
              </span>
              <span className="text-neutral-500 text-[11px]">
                Business Intelligence
              </span>
            </div>
          </div>
          <nav className="flex flex-col justify-start items-start gap-1">
            <button className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3 w-full">
              <LayoutDashboard className="size-4" />
              Dashboard
            </button>
            <button className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3 w-full">
              <Package className="size-4" />
              Inventory Intelligence
            </button>
            <button className="relative font-medium rounded-lg bg-neutral-100 text-neutral-900 text-sm leading-5 flex px-3 py-2 items-center gap-3 w-full">
              <span className="top-1/2 -translate-y-1/2 rounded-full bg-neutral-900 absolute left-0 w-1 h-6" />
              <FileText className="size-4 text-neutral-900" />
              Invoice Intelligence
            </button>
            <button className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3 w-full">
              <CheckCircle className="size-4" />
              GST Compliance
            </button>
            <button className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3 w-full">
              <CreditCard className="size-4" />
              Payments
            </button>
            <button className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3 w-full">
              <TrendingUp className="size-4" />
              Business Health
            </button>
            <button className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3 w-full">
              <Sparkles className="size-4" />
              AI Insights
            </button>
            <button className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3 w-full">
              <BarChart3 className="size-4" />
              Forecast
            </button>
            <button className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3 w-full">
              <FileBarChart className="size-4" />
              Reports
            </button>
            <button className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3 w-full">
              <Settings className="size-4" />
              Settings
            </button>
            <button className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3 w-full">
              <HelpCircle className="size-4" />
              Support
            </button>
          </nav>
          <div className="rounded-xl bg-neutral-900/5 border-neutral-900/10 border-1 border-solid flex mt-auto p-4 flex-col gap-2">
            <div className="text-neutral-900 flex items-center gap-2">
              <Zap className="size-4" />
              <span className="font-semibold text-xs leading-4">Pro Plan</span>
            </div>
            <p className="leading-relaxed text-neutral-500 text-[11px]">
              1,240 / 2,000 invoices processed this month
            </p>
            <div className="rounded-full bg-neutral-100 w-full h-1.5 overflow-hidden">
              <div className="w-[62%] rounded-full bg-neutral-900 h-full" />
            </div>
          </div>
        </aside>
        <div className="flex flex-col flex-1 h-239 overflow-hidden">
          <header className="shrink-0 bg-white border-neutral-200 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-8 items-center gap-4 h-16">
            <div className="text-neutral-500 text-sm leading-5 flex items-center gap-2">
              <FileText className="size-4" />
              <span>Invoice Intelligence</span>
              <ChevronRight className="size-3.5" />
              <span className="font-medium text-neutral-950">
                INV-2024-00871
              </span>
            </div>
            <div className="rounded-lg bg-neutral-100/40 border-neutral-200 border-1 border-solid flex ml-auto px-3 py-2 items-center gap-2 w-72">
              <Search className="size-4 text-neutral-500" />
              <input
                placeholder="Search invoices, vendors…"
                className="bg-transparent outline-none text-sm leading-5 w-full"
                defaultValue=""
              />
              <kbd className="rounded-sm text-neutral-500 text-[10px] border-neutral-200 border-1 border-solid px-1">
                ⌘K
              </kbd>
            </div>
            <button className="relative size-9 transition-colors rounded-lg flex justify-center items-center">
              <Bell className="size-[18px] text-neutral-500" />
              <span className="size-2 rounded-full bg-[#e7000b] absolute right-1.5 top-1.5" />
            </button>
            <button className="transition-colors shadow-sm font-medium rounded-lg bg-neutral-900 text-neutral-50 text-sm leading-5 flex px-3 py-2 items-center gap-2">
              <Sparkles className="size-4" />
              AI Assistant
            </button>
            <button className="transition-colors rounded-lg text-sm leading-5 border-neutral-200 border-1 border-solid flex px-2.5 py-1.5 items-center gap-2">
              <div className="size-6 font-semibold rounded-md bg-neutral-100 text-[11px] flex justify-center items-center">
                MT
              </div>
              Meridian Traders
              <ChevronsUpDown className="size-3.5 text-neutral-500" />
            </button>
            <img
              src="https://images.unsplash.com/photo-1699899657675-1003c7d28f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXwyfHx8MTc4NTQ3OTU5MHww&ixlib=rb-4.1.0&q=80&w=400"
              alt="Profile"
              className="size-9 object-cover ring-2 ring-border rounded-full"
              data-photoid="BUlOJ2Ag_24"
              data-authorname="Giorgio Trovato"
              data-authorurl="https://unsplash.com/@giorgiotrovato"
              data-blurhash="LPDSzW_3pIo#~qxuNHRko#RjaKjY"
            />
          </header>
          <div className="overflow-y-auto bg-neutral-100/20 flex p-8 flex-col flex-1 gap-6">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <h1 className="font-semibold text-2xl leading-8 tracking-tight">
                    Invoice Review
                  </h1>
                  <span className="inline-flex font-medium rounded-full bg-amber-500/10 text-amber-600 text-xs leading-4 px-2.5 py-1 items-center gap-1">
                    <AlertTriangle className="size-3" />
                    Needs Review
                  </span>
                </div>
                <p className="text-neutral-500 text-sm leading-5">
                  AI extracted 14 fields · 2 discrepancies flagged · Processed 4
                  min ago
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-white border-neutral-200 border-1 border-solid flex px-3 py-2 items-center gap-2">
                  <GitCompareArrows className="size-4 text-neutral-500" />
                  <span className="text-sm leading-5">Highlight diffs</span>
                  <Switch defaultChecked={true} />
                </div>
                <button className="transition-colors rounded-lg bg-white text-sm leading-5 border-neutral-200 border-1 border-solid flex px-3 py-2 items-center gap-2">
                  <Download className="size-4" />
                  Export
                </button>
                <button className="transition-colors shadow-sm font-medium rounded-lg bg-neutral-900 text-neutral-50 text-sm leading-5 flex px-3.5 py-2 items-center gap-2">
                  <Check className="size-4" />
                  Approve
                </button>
              </div>
            </div>
            <div className="grid grid-cols-[1fr_1.05fr] gap-6">
              <Card className="shadow-sm rounded-2xl border-neutral-200 border-0 border-solid p-6 gap-4">
                <CardHeader className="p-0 gap-1">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base leading-6 flex items-center gap-2">
                      <ScanLine className="size-4 text-neutral-900" />
                      Document Preview
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <button className="size-8 transition-colors rounded-md flex justify-center items-center">
                        <ZoomIn className="size-4 text-neutral-500" />
                      </button>
                      <button className="size-8 transition-colors rounded-md flex justify-center items-center">
                        <RotateCw className="size-4 text-neutral-500" />
                      </button>
                      <button className="size-8 transition-colors rounded-md flex justify-center items-center">
                        <Maximize2 className="size-4 text-neutral-500" />
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0 gap-0">
                  <div className="relative rounded-xl bg-neutral-100 flex p-6 justify-center items-center">
                    <div className="relative max-w-[380px] aspect-[3/4] ring-1 ring-black/5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] rounded-lg bg-white w-full overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1703170815991-4737f0d0c8fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxzY2FubmVkJTIwYnVzaW5lc3MlMjBpbnZvaWNlJTIwZG9jdW1lbnQlMjBwYXBlcnxlbnwxfDF8fHwxNzg1NTExNjE4fDA&ixlib=rb-4.1.0&q=80&w=400"
                        alt="Invoice document scan"
                        className="object-cover opacity-90 w-full h-full"
                        data-photoid="DOkJvDeIGSM"
                        data-authorname="Heather Green"
                        data-authorurl="https://unsplash.com/@heathergreengreen"
                        data-blurhash="L2O4b#.A^bSj0f-n^%f4*i-:%HWW"
                      />
                      <div className="left-[12%] top-[38%] w-[45%] rounded-md bg-amber-500/15 border-amber-500/70 border-2 border-solid absolute h-8" />
                      <div className="left-[12%] top-[38%] -translate-y-full shadow-lg font-medium rounded-md bg-amber-600 text-white text-[10px] flex absolute mb-1 px-2 py-1 items-center gap-1">
                        <AlertTriangle className="size-3" />
                        Amount mismatch · ₹12,400 vs ₹12,800
                      </div>
                      <div className="left-[12%] top-[62%] w-[55%] rounded-md bg-rose-500/15 border-rose-500/70 border-2 border-solid absolute h-7" />
                      <div className="left-[12%] top-[62%] translate-y-full shadow-lg font-medium rounded-md bg-rose-600 text-white text-[10px] flex absolute mt-1 px-2 py-1 items-center gap-1">
                        <XCircle className="size-3" />
                        GST format invalid
                      </div>
                    </div>
                    <span className="shadow-sm rounded-full bg-white/90 text-neutral-500 text-[11px] border-neutral-200 border-1 border-solid absolute right-3 bottom-3 px-2.5 py-1">
                      Page 1 of 1
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-0 gap-3">
                  <div className="rounded-lg bg-neutral-100 flex px-3 py-2 items-center flex-1 gap-2">
                    <FileType className="size-4 text-neutral-500" />
                    <span className="truncate text-neutral-500 text-xs leading-4">
                      meridian_invoice_00871.pdf · 248 KB
                    </span>
                  </div>
                </CardFooter>
              </Card>
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-3 gap-4">
                  <Card className="shadow-sm rounded-2xl border-neutral-200 border-0 border-solid p-4 gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-500 text-xs leading-4">
                        Duplicate Score
                      </span>
                      <Copy className="size-4 text-emerald-500" />
                    </div>
                    <div className="font-semibold text-2xl leading-8 tracking-tight">
                      4
                      <span className="text-neutral-500 text-base leading-6">
                        %
                      </span>
                    </div>
                    <div className="rounded-full bg-neutral-100 w-full h-1.5 overflow-hidden">
                      <div className="w-[4%] rounded-full bg-emerald-500 h-full" />
                    </div>
                    <span className="font-medium text-emerald-600 text-[11px]">
                      No duplicates found
                    </span>
                  </Card>
                  <Card className="shadow-sm rounded-2xl border-neutral-200 border-0 border-solid p-4 gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-500 text-xs leading-4">
                        Fraud Score
                      </span>
                      <ShieldAlert className="size-4 text-amber-500" />
                    </div>
                    <div className="font-semibold text-2xl leading-8 tracking-tight">
                      32
                      <span className="text-neutral-500 text-base leading-6">
                        %
                      </span>
                    </div>
                    <div className="rounded-full bg-neutral-100 w-full h-1.5 overflow-hidden">
                      <div className="w-[32%] rounded-full bg-amber-500 h-full" />
                    </div>
                    <span className="font-medium text-amber-600 text-[11px]">
                      Moderate · review advised
                    </span>
                  </Card>
                  <Card className="shadow-sm rounded-2xl border-neutral-200 border-0 border-solid p-4 gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-500 text-xs leading-4">
                        GST Status
                      </span>
                      <BadgeCheck className="size-4 text-rose-500" />
                    </div>
                    <div className="font-semibold text-rose-600 text-sm leading-5 pt-1.5">
                      Unverified
                    </div>
                    <div className="rounded-full bg-neutral-100 w-full h-1.5 overflow-hidden">
                      <div className="w-[20%] rounded-full bg-rose-500 h-full" />
                    </div>
                    <span className="font-medium text-rose-600 text-[11px]">
                      Format check failed
                    </span>
                  </Card>
                </div>
                <Card className="shadow-sm rounded-2xl border-neutral-200 border-0 border-solid p-6 flex-1 gap-4">
                  <CardHeader className="p-0 gap-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base leading-6 flex items-center gap-2">
                        <Sparkles className="size-4 text-neutral-900" />
                        AI Extracted Fields
                      </CardTitle>
                      <div className="text-neutral-500 text-xs leading-4 flex items-center gap-2">
                        Auto-validate
                        <Switch defaultChecked={true} />
                      </div>
                    </div>
                    <Tabs defaultValue="fields">
                      <TabsList className="w-full">
                        <TabsTrigger value="fields" className="flex-1">
                          Header Fields
                        </TabsTrigger>
                        <TabsTrigger value="items" className="flex-1">
                          Line Items
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </CardHeader>
                  <CardContent className="p-0 gap-3">
                    <div className="flex flex-col gap-2">
                      <div className="rounded-lg border-neutral-200 border-1 border-solid flex p-3 justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-neutral-500 text-[11px]">
                            Vendor
                          </span>
                          <span className="font-medium text-sm leading-5">
                            Sunrise Agro Supplies Pvt Ltd
                          </span>
                        </div>
                        <span className="inline-flex font-medium rounded-full bg-emerald-500/10 text-emerald-600 text-[11px] px-2 py-1 items-center gap-1">
                          <CheckCircle2 className="size-3" />
                          Verified
                        </span>
                      </div>
                      <div className="rounded-lg bg-amber-500/5 border-amber-500/40 border-1 border-solid flex p-3 justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-neutral-500 text-[11px]">
                            Amount
                          </span>
                          <span className="font-medium text-sm leading-5">
                            ₹12,400.00
                            <span className="text-amber-600">
                              (expected ₹12,800.00)
                            </span>
                          </span>
                        </div>
                        <span className="inline-flex font-medium rounded-full bg-amber-500/10 text-amber-600 text-[11px] px-2 py-1 items-center gap-1">
                          <AlertTriangle className="size-3" />
                          Warning
                        </span>
                      </div>
                      <div className="rounded-lg border-neutral-200 border-1 border-solid flex p-3 justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-neutral-500 text-[11px]">
                            Invoice Date
                          </span>
                          <span className="font-medium text-sm leading-5">
                            18 Nov 2024
                          </span>
                        </div>
                        <span className="inline-flex font-medium rounded-full bg-emerald-500/10 text-emerald-600 text-[11px] px-2 py-1 items-center gap-1">
                          <CheckCircle2 className="size-3" />
                          Verified
                        </span>
                      </div>
                      <div className="rounded-lg bg-rose-500/5 border-rose-500/40 border-1 border-solid flex p-3 justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-neutral-500 text-[11px]">
                            GST Number
                          </span>
                          <span className="font-medium text-sm leading-5">
                            27AAB4321X<span className="text-rose-600">?Z</span>
                          </span>
                        </div>
                        <span className="inline-flex font-medium rounded-full bg-rose-500/10 text-rose-600 text-[11px] px-2 py-1 items-center gap-1">
                          <XCircle className="size-3" />
                          Error
                        </span>
                      </div>
                      <div className="rounded-lg border-neutral-200 border-1 border-solid flex p-3 justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-neutral-500 text-[11px]">
                            PO Reference
                          </span>
                          <span className="font-medium text-sm leading-5">
                            PO-2024-0442
                          </span>
                        </div>
                        <span className="inline-flex font-medium rounded-full bg-emerald-500/10 text-emerald-600 text-[11px] px-2 py-1 items-center gap-1">
                          <CheckCircle2 className="size-3" />
                          Verified
                        </span>
                      </div>
                    </div>
                    <div className="hidden flex-col gap-2">
                      <div className="rounded-lg border-neutral-200 border-1 border-solid flex p-3 justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium text-sm leading-5">
                            Basmati Rice 25kg
                          </span>
                          <span className="text-neutral-500 text-[11px]">
                            Qty 40 · HSN 1006
                          </span>
                        </div>
                        <span className="font-medium text-sm leading-5">
                          ₹6,800.00
                        </span>
                      </div>
                      <div className="rounded-lg border-neutral-200 border-1 border-solid flex p-3 justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium text-sm leading-5">
                            Wheat Flour 50kg
                          </span>
                          <span className="text-neutral-500 text-[11px]">
                            Qty 20 · HSN 1101
                          </span>
                        </div>
                        <span className="font-medium text-sm leading-5">
                          ₹3,200.00
                        </span>
                      </div>
                      <div className="rounded-lg bg-amber-500/5 border-amber-500/40 border-1 border-solid flex p-3 justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium text-sm leading-5">
                            Sunflower Oil 15L
                          </span>
                          <span className="text-amber-600 text-[11px]">
                            Qty 12 · HSN mismatch
                          </span>
                        </div>
                        <span className="font-medium text-sm leading-5">
                          ₹2,400.00
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-neutral-900/5 border-neutral-900/10 border-1 border-solid flex p-3 items-start gap-2">
                      <Sparkles className="size-4 text-neutral-900 mt-0.5" />
                      <p className="leading-relaxed text-neutral-500 text-xs leading-4">
                        AI suggests correcting the GST number checksum and
                        confirming the amount against PO-2024-0442 before
                        approval.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <Card className="shadow-sm rounded-2xl border-neutral-200 border-0 border-solid p-6 gap-4">
              <CardHeader className="p-0 gap-1">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base leading-6 flex items-center gap-2">
                    <Workflow className="size-4 text-neutral-900" />
                    Processing Timeline
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500 text-xs leading-4">
                      Extraction confidence
                    </span>
                    <span className="font-semibold text-emerald-600 text-sm leading-5">
                      94%
                    </span>
                    <div className="rounded-full bg-neutral-100 w-28 h-1.5 overflow-hidden">
                      <div className="w-[94%] rounded-full bg-emerald-500 h-full" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 gap-0">
                <div className="relative flex pt-2 justify-between items-center">
                  <div className="bg-neutral-200 absolute inset-x-0 top-6.5 h-0.5" />
                  <div className="w-[78%] bg-neutral-900 absolute left-0 top-6.5 h-0.5" />
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="size-9 shadow-sm rounded-full bg-neutral-900 text-neutral-50 flex justify-center items-center">
                      <Upload className="size-4" />
                    </div>
                    <span className="font-medium text-xs leading-4">
                      Uploaded
                    </span>
                    <span className="text-neutral-500 text-[11px]">
                      12:04 PM
                    </span>
                  </div>
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="size-9 shadow-sm rounded-full bg-neutral-900 text-neutral-50 flex justify-center items-center">
                      <ScanLine className="size-4" />
                    </div>
                    <span className="font-medium text-xs leading-4">
                      OCR Scan
                    </span>
                    <span className="text-neutral-500 text-[11px]">
                      12:04 PM
                    </span>
                  </div>
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="size-9 shadow-sm rounded-full bg-neutral-900 text-neutral-50 flex justify-center items-center">
                      <Sparkles className="size-4" />
                    </div>
                    <span className="font-medium text-xs leading-4">
                      AI Extraction
                    </span>
                    <span className="text-neutral-500 text-[11px]">
                      12:05 PM
                    </span>
                  </div>
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="size-9 shadow-sm ring-4 ring-amber-500/20 rounded-full bg-amber-500 text-white flex justify-center items-center">
                      <SearchCheck className="size-4" />
                    </div>
                    <span className="font-medium text-xs leading-4">
                      Validation
                    </span>
                    <span className="text-amber-600 text-[11px]">
                      In review
                    </span>
                  </div>
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="size-9 rounded-full bg-neutral-100 text-neutral-500 border-neutral-200 border-1 border-solid flex justify-center items-center">
                      <Check className="size-4" />
                    </div>
                    <span className="font-medium text-neutral-500 text-xs leading-4">
                      Approved
                    </span>
                    <span className="text-neutral-500 text-[11px]">
                      Pending
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 mt-6 gap-3">
                  <label className="cursor-pointer transition-colors rounded-lg border-neutral-200 border-1 border-solid flex p-3 items-center gap-2">
                    <Checkbox defaultChecked={false} />
                    <span>Confirm vendor identity</span>
                  </label>
                  <label className="cursor-pointer transition-colors rounded-lg border-neutral-200 border-1 border-solid flex p-3 items-center gap-2">
                    <Checkbox defaultChecked={true} />
                    <span>Match amount to PO</span>
                  </label>
                  <label className="cursor-pointer transition-colors rounded-lg border-neutral-200 border-1 border-solid flex p-3 items-center gap-2">
                    <Checkbox defaultChecked={false} />
                    <span>Correct GST number</span>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
