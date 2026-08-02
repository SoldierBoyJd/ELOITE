import { useEffect } from "react";
import {
  BarChart3,
  Bell,
  Boxes,
  CheckCircle,
  ChevronsUpDown,
  CreditCard,
  Download,
  FileBarChart,
  FileText,
  FileWarning,
  Hash,
  HelpCircle,
  LayoutDashboard,
  Package,
  Scale,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  SplitSquareHorizontal,
  TrendingUp,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function App() {
  return (
    <div>
      <div className="bg-white text-neutral-950 w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="min-h-[956px] flex w-285">
          <aside className="shrink-0 bg-neutral-50 border-neutral-200/60 border-t-0 border-r-1 border-b-0 border-l-0 border-solid flex p-6 flex-col gap-6 w-64">
            <div className="flex items-center gap-2">
              <div className="size-9 shadow-sm rounded-xl bg-neutral-900 text-neutral-50 flex justify-center items-center">
                <Boxes className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="leading-tight font-semibold text-sm leading-5">
                  StockPilot
                </span>
                <span className="font-medium text-neutral-500 text-[11px]">
                  AI Intelligence
                </span>
              </div>
            </div>
            <nav className="flex flex-col gap-1">
              <div className="transition-colors font-medium rounded-lg text-neutral-500 text-sm leading-5 flex px-3 py-2 items-center gap-3">
                <LayoutDashboard className="size-4" />
                <span>Dashboard</span>
              </div>
              <div className="transition-colors font-medium rounded-lg text-neutral-500 text-sm leading-5 flex px-3 py-2 items-center gap-3">
                <Package className="size-4" />
                <span>Inventory Intelligence</span>
              </div>
              <div className="transition-colors font-medium rounded-lg text-neutral-500 text-sm leading-5 flex px-3 py-2 items-center gap-3">
                <FileText className="size-4" />
                <span>Invoice Intelligence</span>
              </div>
              <div className="relative font-semibold rounded-lg bg-neutral-100 text-neutral-900 text-sm leading-5 flex px-3 py-2 items-center gap-3">
                <span className="top-1/2 -translate-y-1/2 rounded-full bg-neutral-900 absolute left-0 w-1 h-6" />
                <CheckCircle className="size-4 text-neutral-900" />
                <span>GST Compliance</span>
              </div>
              <div className="transition-colors font-medium rounded-lg text-neutral-500 text-sm leading-5 flex px-3 py-2 items-center gap-3">
                <CreditCard className="size-4" />
                <span>Payments</span>
              </div>
              <div className="transition-colors font-medium rounded-lg text-neutral-500 text-sm leading-5 flex px-3 py-2 items-center gap-3">
                <TrendingUp className="size-4" />
                <span>Business Health</span>
              </div>
              <div className="transition-colors font-medium rounded-lg text-neutral-500 text-sm leading-5 flex px-3 py-2 items-center gap-3">
                <Sparkles className="size-4" />
                <span>AI Insights</span>
              </div>
              <div className="transition-colors font-medium rounded-lg text-neutral-500 text-sm leading-5 flex px-3 py-2 items-center gap-3">
                <BarChart3 className="size-4" />
                <span>Forecast</span>
              </div>
              <div className="transition-colors font-medium rounded-lg text-neutral-500 text-sm leading-5 flex px-3 py-2 items-center gap-3">
                <FileBarChart className="size-4" />
                <span>Reports</span>
              </div>
              <div className="transition-colors font-medium rounded-lg text-neutral-500 text-sm leading-5 flex px-3 py-2 items-center gap-3">
                <Settings className="size-4" />
                <span>Settings</span>
              </div>
              <div className="transition-colors font-medium rounded-lg text-neutral-500 text-sm leading-5 flex px-3 py-2 items-center gap-3">
                <HelpCircle className="size-4" />
                <span>Support</span>
              </div>
            </nav>
            <div className="rounded-2xl bg-neutral-900/5 flex mt-auto p-4 flex-col gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-neutral-900" />
                <span className="font-semibold text-xs leading-4">
                  Upgrade to Pro
                </span>
              </div>
              <p className="leading-relaxed text-neutral-500 text-[11px]">
                Unlock predictive compliance alerts and auto-filing.
              </p>
              <Button className="rounded-lg bg-neutral-900 text-neutral-50 text-xs leading-4 w-full h-8">
                Upgrade
              </Button>
            </div>
          </aside>
          <div className="flex flex-col flex-1">
            <header className="bg-white/80 border-neutral-200/60 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-8 py-4 items-center gap-4">
              <div className="rounded-xl bg-neutral-100 flex px-3 py-2 items-center flex-1 gap-2">
                <Search className="size-4 text-neutral-500" />
                <input
                  placeholder="Search compliance records, GSTIN, invoices..."
                  className="bg-transparent outline-none text-sm leading-5 w-full"
                  defaultValue=""
                />
                <kbd className="font-medium rounded-md bg-white text-neutral-500 text-[10px] px-1.5 py-0.5">
                  ⌘K
                </kbd>
              </div>
              <Button className="rounded-xl bg-neutral-900 text-neutral-50 text-xs leading-4 gap-2 h-9">
                <Sparkles className="size-4" />
                AI Assistant
              </Button>
              <div className="relative size-9 rounded-xl bg-neutral-100 flex justify-center items-center">
                <Bell className="size-4 text-neutral-500" />
                <span className="size-2 rounded-full bg-[#e7000b] absolute right-2 top-2" />
              </div>
              <div className="rounded-xl bg-neutral-100 flex px-3 py-1.5 items-center gap-2">
                <div className="size-6 font-bold rounded-lg bg-neutral-900 text-neutral-50 text-[10px] flex justify-center items-center">
                  SP
                </div>
                <span className="font-medium text-xs leading-4">
                  Sharma Traders
                </span>
                <ChevronsUpDown className="size-3.5 text-neutral-500" />
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1681500920181-0aff411f8cab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXQlMjBoZWFkc2hvdHxlbnwxfDJ8fHwxNzg1NDQzNjg5fDA&ixlib=rb-4.1.0&q=80&w=400"
                  alt="Profile"
                  className="size-9 object-cover rounded-full"
                  data-photoid="DA-1ph3OE7A"
                  data-authorname="Daniel Stiel"
                  data-authorurl="https://unsplash.com/@danielstiel"
                  data-blurhash="LTHn$-fQ%#kC~payxuj[OZfkVYay"
                />
              </div>
            </header>
            <main className="p-8 flex-1 overflow-auto">
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <h1 className="font-bold text-2xl leading-8 tracking-tight">
                      GST Compliance
                    </h1>
                    <p className="text-neutral-500 text-sm leading-5">
                      Monitor your tax health, filings, and compliance risk in
                      real time.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="q3">
                      <SelectTrigger className="rounded-xl bg-neutral-100 text-xs leading-4 w-36 h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="q1">Q1 FY 2024-25</SelectItem>
                        <SelectItem value="q2">Q2 FY 2024-25</SelectItem>
                        <SelectItem value="q3">Q3 FY 2024-25</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="rounded-xl bg-neutral-100 text-neutral-950 text-xs leading-4 gap-2 h-9">
                      <Download className="size-4" />
                      Export
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <Card className="col-span-1 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08)] rounded-3xl p-6 gap-4">
                    <CardHeader className="p-0 gap-1">
                      <CardTitle className="font-semibold text-sm leading-5">
                        Compliance Score
                      </CardTitle>
                      <CardDescription className="text-xs leading-4">
                        Overall tax health this quarter
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex p-0 flex-col items-center gap-4">
                      <div className="relative size-44 flex justify-center items-center">
                        <div className="bg-[conic-gradient(from_180deg,oklch(0.6_0.118_184.704)_0deg,oklch(0.646_0.222_41.116)_320deg,oklch(0.922_0_0)_320deg,oklch(0.922_0_0)_360deg)] rounded-full absolute inset-0" />
                        <div className="rounded-full bg-white absolute inset-3" />
                        <div className="relative flex flex-col items-center">
                          <span className="font-bold text-4xl leading-10 tracking-tight">
                            89
                          </span>
                          <span className="font-medium text-neutral-500 text-xs leading-4">
                            out of 100
                          </span>
                        </div>
                      </div>
                      <div className="bg-[oklch(0.6_0.118_184.704/0.12)] rounded-full flex px-3 py-1 items-center gap-2">
                        <ShieldCheck className="size-3.5 text-[oklch(0.5_0.118_184.704)]" />
                        <span className="text-[oklch(0.45_0.118_184.704)] font-medium text-xs leading-4">
                          Good Standing
                        </span>
                      </div>
                      <div className="rounded-xl bg-neutral-100 flex px-4 py-2.5 justify-between items-center w-full">
                        <span className="text-neutral-500 text-xs leading-4">
                          vs last quarter
                        </span>
                        <span className="text-[oklch(0.5_0.118_184.704)] font-semibold text-xs leading-4 flex items-center gap-1">
                          <TrendingUp className="size-3.5" />
                          +6 pts
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="col-span-2 grid grid-cols-2 gap-6">
                    <Card className="shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08)] rounded-3xl p-6 gap-3">
                      <CardContent className="flex p-0 flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <div className="size-10 bg-[oklch(0.577_0.245_27.325/0.1)] rounded-xl flex justify-center items-center">
                            <FileWarning className="size-5 text-[#e7000b]" />
                          </div>
                          <span className="bg-[oklch(0.577_0.245_27.325/0.1)] font-medium rounded-full text-[#e7000b] text-[10px] px-2 py-0.5">
                            Action needed
                          </span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-3xl leading-9 tracking-tight">
                            12
                          </span>
                          <span className="text-neutral-500 text-xs leading-4">
                            Missing GST Entries
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08)] rounded-3xl p-6 gap-3">
                      <CardContent className="flex p-0 flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <div className="size-10 bg-[oklch(0.769_0.188_70.08/0.15)] rounded-xl flex justify-center items-center">
                            <Scale className="size-5 text-[oklch(0.6_0.188_70.08)]" />
                          </div>
                          <span className="bg-[oklch(0.769_0.188_70.08/0.15)] text-[oklch(0.5_0.188_70.08)] font-medium rounded-full text-[10px] px-2 py-0.5">
                            Review
                          </span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-3xl leading-9 tracking-tight">
                            7
                          </span>
                          <span className="text-neutral-500 text-xs leading-4">
                            Tax Mismatch Count
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08)] rounded-3xl p-6 gap-3">
                      <CardContent className="flex p-0 flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <div className="size-10 bg-[oklch(0.769_0.188_70.08/0.15)] rounded-xl flex justify-center items-center">
                            <Hash className="size-5 text-[oklch(0.6_0.188_70.08)]" />
                          </div>
                          <span className="bg-[oklch(0.769_0.188_70.08/0.15)] text-[oklch(0.5_0.188_70.08)] font-medium rounded-full text-[10px] px-2 py-0.5">
                            Review
                          </span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-3xl leading-9 tracking-tight">
                            4
                          </span>
                          <span className="text-neutral-500 text-xs leading-4">
                            HSN Mismatch Count
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08)] rounded-3xl p-6 gap-3">
                      <CardContent className="flex p-0 flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <div className="size-10 bg-[oklch(0.6_0.118_184.704/0.12)] rounded-xl flex justify-center items-center">
                            <SplitSquareHorizontal className="size-5 text-[oklch(0.5_0.118_184.704)]" />
                          </div>
                          <span className="bg-[oklch(0.6_0.118_184.704/0.12)] text-[oklch(0.45_0.118_184.704)] font-medium rounded-full text-[10px] px-2 py-0.5">
                            Resolved
                          </span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-3xl leading-9 tracking-tight">
                            2
                          </span>
                          <span className="text-neutral-500 text-xs leading-4">
                            IGST/CGST/SGST Issues
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <Card className="col-span-2 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08)] rounded-3xl p-6 gap-4">
                    <CardHeader className="p-0 flex-row justify-between items-center gap-2">
                      <div className="flex flex-col gap-1">
                        <CardTitle className="font-semibold text-sm leading-5">
                          Compliance Calendar
                        </CardTitle>
                        <CardDescription className="text-xs leading-4">{`Upcoming filing deadlines & obligations`}</CardDescription>
                      </div>
                      <Tabs defaultValue="list">
                        <TabsList className="rounded-lg bg-neutral-100 p-0.5 h-8">
                          <TabsTrigger
                            value="list"
                            className="rounded-md text-xs leading-4 px-3 h-7"
                          >
                            List
                          </TabsTrigger>
                          <TabsTrigger
                            value="month"
                            className="rounded-md text-xs leading-4 px-3 h-7"
                          >
                            Month
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="flex flex-col gap-3">
                        <div className="rounded-2xl bg-neutral-100/60 flex p-4 items-center gap-4">
                          <div className="size-12 shadow-sm rounded-xl bg-white flex flex-col justify-center items-center">
                            <span className="font-medium text-[#e7000b] text-[10px]">
                              JAN
                            </span>
                            <span className="leading-none font-bold text-lg leading-7">
                              11
                            </span>
                          </div>
                          <div className="flex flex-col flex-1 gap-0.5">
                            <span className="font-semibold text-sm leading-5">
                              GSTR-1 Filing
                            </span>
                            <span className="text-neutral-500 text-xs leading-4">
                              Outward supplies return for December
                            </span>
                          </div>
                          <span className="bg-[oklch(0.577_0.245_27.325/0.1)] font-medium rounded-full text-[#e7000b] text-xs leading-4 px-3 py-1">
                            Due in 3 days
                          </span>
                        </div>
                        <div className="rounded-2xl bg-neutral-100/60 flex p-4 items-center gap-4">
                          <div className="size-12 shadow-sm rounded-xl bg-white flex flex-col justify-center items-center">
                            <span className="text-[oklch(0.6_0.188_70.08)] font-medium text-[10px]">
                              JAN
                            </span>
                            <span className="leading-none font-bold text-lg leading-7">
                              20
                            </span>
                          </div>
                          <div className="flex flex-col flex-1 gap-0.5">
                            <span className="font-semibold text-sm leading-5">
                              GSTR-3B Filing
                            </span>
                            <span className="text-neutral-500 text-xs leading-4">{`Summary return & tax payment`}</span>
                          </div>
                          <span className="bg-[oklch(0.769_0.188_70.08/0.15)] text-[oklch(0.5_0.188_70.08)] font-medium rounded-full text-xs leading-4 px-3 py-1">
                            Due in 12 days
                          </span>
                        </div>
                        <div className="rounded-2xl bg-neutral-100/60 flex p-4 items-center gap-4">
                          <div className="size-12 shadow-sm rounded-xl bg-white flex flex-col justify-center items-center">
                            <span className="font-medium text-neutral-500 text-[10px]">
                              JAN
                            </span>
                            <span className="leading-none font-bold text-lg leading-7">
                              31
                            </span>
                          </div>
                          <div className="flex flex-col flex-1 gap-0.5">
                            <span className="font-semibold text-sm leading-5">
                              GSTR-9 Annual Return
                            </span>
                            <span className="text-neutral-500 text-xs leading-4">
                              Annual reconciliation statement
                            </span>
                          </div>
                          <span className="font-medium rounded-full bg-neutral-100 text-neutral-500 text-xs leading-4 px-3 py-1">
                            Due in 23 days
                          </span>
                        </div>
                        <div className="rounded-2xl bg-neutral-100/60 flex p-4 items-center gap-4">
                          <div className="size-12 shadow-sm rounded-xl bg-white flex flex-col justify-center items-center">
                            <span className="font-medium text-neutral-500 text-[10px]">
                              FEB
                            </span>
                            <span className="leading-none font-bold text-lg leading-7">
                              11
                            </span>
                          </div>
                          <div className="flex flex-col flex-1 gap-0.5">
                            <span className="font-semibold text-sm leading-5">
                              GSTR-1 Filing
                            </span>
                            <span className="text-neutral-500 text-xs leading-4">
                              Outward supplies return for January
                            </span>
                          </div>
                          <span className="font-medium rounded-full bg-neutral-100 text-neutral-500 text-xs leading-4 px-3 py-1">
                            Due in 34 days
                          </span>
                        </div>
                      </div>
                      <div className="hidden flex-col gap-3">
                        <div className="grid grid-cols-7 font-medium text-center text-neutral-500 text-[11px] gap-1">
                          <span>Mo</span>
                          <span>Tu</span>
                          <span>We</span>
                          <span>Th</span>
                          <span>Fr</span>
                          <span>Sa</span>
                          <span>Su</span>
                        </div>
                        <div className="grid grid-cols-7 gap-1.5">
                          <div className="rounded-xl bg-neutral-100/40 text-neutral-500 text-sm leading-5 flex justify-center items-center h-11">
                            1
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-neutral-500 text-sm leading-5 flex justify-center items-center h-11">
                            2
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-sm leading-5 flex justify-center items-center h-11">
                            3
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-sm leading-5 flex justify-center items-center h-11">
                            4
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-sm leading-5 flex justify-center items-center h-11">
                            5
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-neutral-500 text-sm leading-5 flex justify-center items-center h-11">
                            6
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-neutral-500 text-sm leading-5 flex justify-center items-center h-11">
                            7
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-sm leading-5 flex justify-center items-center h-11">
                            8
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-sm leading-5 flex justify-center items-center h-11">
                            9
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-sm leading-5 flex justify-center items-center h-11">
                            10
                          </div>
                          <div className="relative bg-[oklch(0.577_0.245_27.325/0.12)] font-semibold rounded-xl text-[#e7000b] text-sm leading-5 flex justify-center items-center h-11">
                            11
                            <span className="size-1 rounded-full bg-[#e7000b] absolute bottom-1" />
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-sm leading-5 flex justify-center items-center h-11">
                            12
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-neutral-500 text-sm leading-5 flex justify-center items-center h-11">
                            13
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-neutral-500 text-sm leading-5 flex justify-center items-center h-11">
                            14
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-sm leading-5 flex justify-center items-center h-11">
                            15
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-sm leading-5 flex justify-center items-center h-11">
                            16
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-sm leading-5 flex justify-center items-center h-11">
                            17
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-sm leading-5 flex justify-center items-center h-11">
                            18
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-sm leading-5 flex justify-center items-center h-11">
                            19
                          </div>
                          <div className="relative bg-[oklch(0.769_0.188_70.08/0.18)] text-[oklch(0.5_0.188_70.08)] font-semibold rounded-xl text-sm leading-5 flex justify-center items-center h-11">
                            20
                            <span className="size-1 bg-[oklch(0.6_0.188_70.08)] rounded-full absolute bottom-1" />
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-neutral-500 text-sm leading-5 flex justify-center items-center h-11">
                            21
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-sm leading-5 flex justify-center items-center h-11">
                            22
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-sm leading-5 flex justify-center items-center h-11">
                            23
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-sm leading-5 flex justify-center items-center h-11">
                            24
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-sm leading-5 flex justify-center items-center h-11">
                            25
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-sm leading-5 flex justify-center items-center h-11">
                            26
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-neutral-500 text-sm leading-5 flex justify-center items-center h-11">
                            27
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-neutral-500 text-sm leading-5 flex justify-center items-center h-11">
                            28
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-sm leading-5 flex justify-center items-center h-11">
                            29
                          </div>
                          <div className="rounded-xl bg-neutral-100/40 text-sm leading-5 flex justify-center items-center h-11">
                            30
                          </div>
                          <div className="relative font-semibold rounded-xl bg-neutral-900/10 text-neutral-900 text-sm leading-5 flex justify-center items-center h-11">
                            31
                            <span className="size-1 rounded-full bg-neutral-900 absolute bottom-1" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="col-span-1 flex flex-col gap-6">
                    <Card className="shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08)] rounded-3xl p-6 gap-4">
                      <CardHeader className="p-0 gap-1">
                        <CardTitle className="font-semibold text-sm leading-5">
                          Tax Split Breakdown
                        </CardTitle>
                        <CardDescription className="text-xs leading-4">
                          This quarter distribution
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex p-0 flex-col gap-3">
                        <div className="flex flex-col gap-1.5">
                          <div className="text-xs leading-4 flex justify-between items-center">
                            <span className="font-medium">CGST</span>
                            <span className="text-neutral-500">₹2.4L</span>
                          </div>
                          <div className="rounded-full bg-neutral-100 w-full h-2 overflow-hidden">
                            <div className="w-[38%] rounded-full bg-neutral-900 h-full" />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <div className="text-xs leading-4 flex justify-between items-center">
                            <span className="font-medium">SGST</span>
                            <span className="text-neutral-500">₹2.4L</span>
                          </div>
                          <div className="rounded-full bg-neutral-100 w-full h-2 overflow-hidden">
                            <div className="w-[38%] bg-[oklch(0.6_0.118_184.704)] rounded-full h-full" />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <div className="text-xs leading-4 flex justify-between items-center">
                            <span className="font-medium">IGST</span>
                            <span className="text-neutral-500">₹1.5L</span>
                          </div>
                          <div className="rounded-full bg-neutral-100 w-full h-2 overflow-hidden">
                            <div className="w-[24%] bg-[oklch(0.769_0.188_70.08)] rounded-full h-full" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08)] rounded-3xl bg-neutral-900/5 p-6 gap-4">
                      <CardHeader className="p-0 gap-1">
                        <div className="flex items-center gap-2">
                          <Sparkles className="size-4 text-neutral-900" />
                          <CardTitle className="font-semibold text-sm leading-5">
                            Compliance Settings
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="flex p-0 flex-col gap-4">
                        <div className="flex justify-between items-center">
                          <div className="flex flex-col">
                            <span className="font-medium text-xs leading-4">
                              Deadline notifications
                            </span>
                            <span className="text-neutral-500 text-[11px]">{`Email & in-app alerts`}</span>
                          </div>
                          <Switch defaultChecked={true} />
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex flex-col">
                            <span className="font-medium text-xs leading-4">
                              Auto-reminders
                            </span>
                            <span className="text-neutral-500 text-[11px]">
                              3 days before due
                            </span>
                          </div>
                          <Switch defaultChecked={true} />
                        </div>
                        <Button className="rounded-xl bg-neutral-900 text-neutral-50 text-xs leading-4 gap-2 w-full h-9">
                          <Wand2 className="size-4" />
                          Auto-fix 12 issues
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
