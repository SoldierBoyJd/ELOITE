import { useEffect } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowUp,
  BarChart3,
  Bell,
  Boxes,
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  Copy,
  CreditCard,
  FileBarChart,
  FileText,
  FileWarning,
  HeartPulse,
  HelpCircle,
  IndianRupee,
  LayoutDashboard,
  Lock,
  Package,
  PackageX,
  RefreshCw,
  Search,
  Settings,
  ShieldAlert,
  Sparkles,
  Star,
  TrendingUp,
  UserX,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
} from "recharts";

export default function App() {
  return (
    <div>
      <div className="bg-white text-neutral-950 flex w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <aside className="shrink-0 bg-neutral-50 border-neutral-200 border-t-0 border-r-1 border-b-0 border-l-0 border-solid flex p-4 flex-col gap-6 w-64 h-239">
          <div className="flex px-2 pt-2 items-center gap-2">
            <div className="size-9 shadow-sm rounded-xl bg-neutral-900 flex justify-center items-center">
              <Boxes className="size-5 text-neutral-50" />
            </div>
            <div className="leading-tight flex flex-col">
              <span className="font-semibold text-sm leading-5 tracking-tight">
                StockPilot
              </span>
              <span className="text-neutral-500 text-[11px]">
                AI Intelligence
              </span>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            <div className="relative font-medium rounded-lg bg-neutral-900/10 text-neutral-950 flex px-3 py-2 items-center gap-3">
              <span className="top-1/2 -translate-y-1/2 rounded-full bg-neutral-900 absolute left-0 w-1 h-6" />
              <LayoutDashboard className="size-4 text-neutral-900" />
              <span className="text-sm leading-5">Dashboard</span>
            </div>
            <button className="transition-colors rounded-lg text-neutral-500 flex px-3 py-2 items-center gap-3">
              <Package className="size-4" />
              <span className="text-sm leading-5">Inventory Intelligence</span>
            </button>
            <button className="transition-colors rounded-lg text-neutral-500 flex px-3 py-2 items-center gap-3">
              <FileText className="size-4" />
              <span className="text-sm leading-5">Invoice Intelligence</span>
            </button>
            <button className="transition-colors rounded-lg text-neutral-500 flex px-3 py-2 items-center gap-3">
              <CheckCircle className="size-4" />
              <span className="text-sm leading-5">GST Compliance</span>
            </button>
            <button className="transition-colors rounded-lg text-neutral-500 flex px-3 py-2 items-center gap-3">
              <CreditCard className="size-4" />
              <span className="text-sm leading-5">Payments</span>
            </button>
            <button className="transition-colors rounded-lg text-neutral-500 flex px-3 py-2 items-center gap-3">
              <TrendingUp className="size-4" />
              <span className="text-sm leading-5">Business Health</span>
            </button>
            <button className="transition-colors rounded-lg text-neutral-500 flex px-3 py-2 items-center gap-3">
              <Sparkles className="size-4" />
              <span className="text-sm leading-5">AI Insights</span>
            </button>
            <button className="transition-colors rounded-lg text-neutral-500 flex px-3 py-2 items-center gap-3">
              <BarChart3 className="size-4" />
              <span className="text-sm leading-5">Forecast</span>
            </button>
            <button className="transition-colors rounded-lg text-neutral-500 flex px-3 py-2 items-center gap-3">
              <FileBarChart className="size-4" />
              <span className="text-sm leading-5">Reports</span>
            </button>
            <button className="transition-colors rounded-lg text-neutral-500 flex px-3 py-2 items-center gap-3">
              <Settings className="size-4" />
              <span className="text-sm leading-5">Settings</span>
            </button>
            <button className="transition-colors rounded-lg text-neutral-500 flex px-3 py-2 items-center gap-3">
              <HelpCircle className="size-4" />
              <span className="text-sm leading-5">Support</span>
            </button>
          </nav>
          <div className="rounded-2xl bg-neutral-100 flex mt-auto p-4 flex-col gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-neutral-900" />
              <span className="font-semibold text-xs leading-4">
                Upgrade to Pro
              </span>
            </div>
            <p className="leading-relaxed text-neutral-500 text-[11px]">
              Unlock deeper AI forecasts and unlimited alerts.
            </p>
            <Button className="bg-neutral-900 text-neutral-50 text-xs leading-4 mt-1 h-8">
              Upgrade
            </Button>
          </div>
        </aside>
        <div className="overflow-y-auto bg-[oklch(0.975_0.003_240)] flex-1 h-239">
          <header className="sticky z-10 backdrop-blur bg-white/95 border-neutral-200 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex top-0 px-8 py-4 items-center gap-4">
            <div className="max-w-md rounded-xl bg-neutral-100 flex px-3 items-center flex-1 gap-2 h-9">
              <Search className="size-4 text-neutral-500" />
              <input
                placeholder="Search inventory, invoices, insights..."
                className="bg-transparent outline-none text-sm leading-5 w-full"
                defaultValue=""
              />
              <kbd className="rounded-sm text-neutral-500 text-[10px] border-neutral-200 border-1 border-solid px-1.5 py-0.5">
                ⌘K
              </kbd>
            </div>
            <div className="flex ml-auto items-center gap-3">
              <Button className="shadow-sm rounded-xl bg-neutral-900 text-neutral-50 px-4 gap-2 h-9">
                <Sparkles className="size-4" />
                <span className="text-sm leading-5">Ask AI</span>
              </Button>
              <button className="relative size-9 transition-colors rounded-xl bg-neutral-100 flex justify-center items-center">
                <Bell className="size-4 text-neutral-500" />
                <span className="size-2 bg-[oklch(0.577_0.245_27.325)] rounded-full absolute right-1.5 top-1.5" />
              </button>
              <button className="transition-colors rounded-xl bg-neutral-100 flex px-3 items-center gap-2 h-9">
                <div className="size-5 bg-[oklch(0.45_0.09_255)] rounded-md flex justify-center items-center">
                  <span className="font-bold text-white text-[10px]">SB</span>
                </div>
                <span className="font-medium text-sm leading-5">
                  Sharma Bros
                </span>
                <ChevronDown className="size-3.5 text-neutral-500" />
              </button>
              <img
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMHBvcnRyYWl0JTIwYXZhdGFyfGVufDF8Mnx8fDE3ODU1MTE2MTh8MA&ixlib=rb-4.1.0&q=80&w=400"
                alt="Profile"
                className="size-9 object-cover ring-2 ring-border rounded-xl"
                data-photoid="MTZTGvDsHFY"
                data-authorname="Nicolas Horn"
                data-authorurl="https://unsplash.com/@sysengineer"
                data-blurhash="LqJ[0LoftQof~qWBNGofS%ocspt7"
              />
            </div>
          </header>
          <main className="flex p-8 flex-col gap-6">
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-1">
                <h1 className="font-semibold text-2xl leading-8 tracking-tight">
                  Good morning, Rajesh
                </h1>
                <p className="text-neutral-500 text-sm leading-5">
                  Here's what StockPilot AI predicts for your business today.
                </p>
              </div>
              <div className="shadow-sm rounded-lg bg-white text-neutral-500 text-xs leading-4 flex px-3 py-2 items-center gap-2">
                <Calendar className="size-3.5" />
                <span>Nov 1 – Nov 30, 2024</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <Card className="transition-transform shadow-[0_4px_24px_-8px_rgba(15,23,42,0.12)] rounded-3xl bg-white border-black/1 border-0 border-solid p-8 gap-4">
                <CardHeader className="p-0 gap-1">
                  <div className="flex items-center gap-2">
                    <HeartPulse className="size-4 text-neutral-900" />
                    <span className="font-medium text-neutral-500 text-sm leading-5">
                      Business Health Score
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex p-0 flex-col items-center gap-4">
                  <div className="relative size-44 flex justify-center items-center">
                    <div className="bg-[conic-gradient(from_180deg,oklch(0.646_0.14_150)_0deg,oklch(0.7_0.12_170)_180deg,oklch(0.769_0.13_75)_317deg,oklch(0.922_0_0)_317deg)] rounded-full absolute inset-0" />
                    <div className="rounded-full bg-white absolute inset-3" />
                    <div className="relative flex flex-col items-center">
                      <span className="font-bold text-5xl leading-12 tracking-tight">
                        88
                      </span>
                      <span className="text-neutral-500 text-xs leading-4">
                        out of 100
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Badge className="bg-[oklch(0.646_0.14_150)]/15 text-[oklch(0.5_0.13_150)] rounded-full border-black/1 border-0 border-solid px-3">
                      <TrendingUp className="size-3 mr-1" />
                      +6 this month
                    </Badge>
                    <p className="font-medium text-sm leading-5">
                      Business operating efficiently
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-2 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.12)] rounded-3xl bg-white border-black/1 border-0 border-solid p-6 gap-4">
                <CardHeader className="p-0 flex-row justify-between items-center gap-0">
                  <div className="flex items-center gap-2">
                    <Activity className="size-4 text-neutral-900" />
                    <span className="font-semibold text-sm leading-5">
                      Health Breakdown
                    </span>
                  </div>
                  <Tabs defaultValue="overview">
                    <TabsList className="rounded-lg bg-neutral-100 h-8">
                      <TabsTrigger
                        value="overview"
                        className="text-xs leading-4 px-3"
                      >
                        Overview
                      </TabsTrigger>
                      <TabsTrigger
                        value="trend"
                        className="text-xs leading-4 px-3"
                      >
                        Trend
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent className="p-0 gap-3">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="text-xs leading-4 flex justify-between">
                        <span className="text-neutral-500">
                          Inventory Health
                        </span>
                        <span className="font-medium">92%</span>
                      </div>
                      <div className="rounded-full bg-neutral-100 h-2 overflow-hidden">
                        <div className="bg-[oklch(0.646_0.14_150)] w-[92%] rounded-full h-full" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="text-xs leading-4 flex justify-between">
                        <span className="text-neutral-500">Cash Flow</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <div className="rounded-full bg-neutral-100 h-2 overflow-hidden">
                        <div className="bg-[oklch(0.6_0.12_200)] w-[78%] rounded-full h-full" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="text-xs leading-4 flex justify-between">
                        <span className="text-neutral-500">GST Compliance</span>
                        <span className="font-medium">84%</span>
                      </div>
                      <div className="rounded-full bg-neutral-100 h-2 overflow-hidden">
                        <div className="bg-[oklch(0.769_0.13_75)] w-[84%] rounded-full h-full" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="text-xs leading-4 flex justify-between">
                        <span className="text-neutral-500">
                          Payment Reliability
                        </span>
                        <span className="font-medium">71%</span>
                      </div>
                      <div className="rounded-full bg-neutral-100 h-2 overflow-hidden">
                        <div className="bg-[oklch(0.577_0.15_45)] w-[71%] rounded-full h-full" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="text-xs leading-4 flex justify-between">
                        <span className="text-neutral-500">
                          Supplier Performance
                        </span>
                        <span className="font-medium">88%</span>
                      </div>
                      <div className="rounded-full bg-neutral-100 h-2 overflow-hidden">
                        <div className="bg-[oklch(0.55_0.1_160)] w-[88%] rounded-full h-full" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="text-xs leading-4 flex justify-between">
                        <span className="text-neutral-500">
                          Revenue Momentum
                        </span>
                        <span className="font-medium">95%</span>
                      </div>
                      <div className="rounded-full bg-neutral-100 h-2 overflow-hidden">
                        <div className="bg-[oklch(0.646_0.14_150)] w-[95%] rounded-full h-full" />
                      </div>
                    </div>
                  </div>
                  <ChartContainer
                    config={{
                      score: { label: "Score", color: "oklch(0.45 0.09 255)" },
                    }}
                    className="hidden w-full h-42"
                  >
                    <RechartsAreaChart
                      data={[
                        { m: "Jun", score: 74 },
                        { m: "Jul", score: 77 },
                        { m: "Aug", score: 79 },
                        { m: "Sep", score: 82 },
                        { m: "Oct", score: 84 },
                        { m: "Nov", score: 88 },
                      ]}
                    >
                      <defs>
                        <linearGradient
                          id="scoreFill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="oklch(0.45 0.09 255)"
                            stopOpacity="0.3"
                          />
                          <stop
                            offset="95%"
                            stopColor="oklch(0.45 0.09 255)"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="m"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                      />
                      <ChartTooltip />
                      <Area
                        dataKey="score"
                        stroke="oklch(0.45 0.09 255)"
                        strokeWidth={2}
                        fill="url(#scoreFill)"
                      />
                    </RechartsAreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-4 gap-5">
              <Card className="transition-transform shadow-[0_2px_16px_-6px_rgba(15,23,42,0.1)] rounded-2xl bg-white border-black/1 border-0 border-solid p-5 gap-3">
                <CardHeader className="p-0 flex-row justify-between items-start gap-0">
                  <div className="size-9 bg-[oklch(0.646_0.14_150)]/12 rounded-xl flex justify-center items-center">
                    <IndianRupee className="size-4 text-[oklch(0.5_0.13_150)]" />
                  </div>
                  <Star />
                </CardHeader>
                <CardContent className="p-0 gap-1">
                  <span className="text-neutral-500 text-xs leading-4">
                    Revenue
                  </span>
                  <div className="flex items-end gap-2">
                    <span className="font-bold text-xl leading-7 tracking-tight">
                      ₹42.8L
                    </span>
                    <Badge className="bg-[oklch(0.646_0.14_150)]/15 text-[oklch(0.5_0.13_150)] rounded-full text-[10px] border-black/1 border-0 border-solid mb-0.5 px-1.5">
                      +12.4%
                    </Badge>
                  </div>
                  <ChartContainer
                    config={{
                      v: { label: "v", color: "oklch(0.646 0.14 150)" },
                    }}
                    className="mt-1 w-full h-9"
                  >
                    <RechartsLineChart
                      data={[
                        { v: 30 },
                        { v: 42 },
                        { v: 38 },
                        { v: 55 },
                        { v: 48 },
                        { v: 62 },
                      ]}
                    >
                      <Line
                        dataKey="v"
                        stroke="oklch(0.646 0.14 150)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </RechartsLineChart>
                  </ChartContainer>
                  <span className="text-neutral-500 text-[11px]">
                    vs ₹38.1L last month
                  </span>
                </CardContent>
              </Card>
              <Card className="transition-transform shadow-[0_2px_16px_-6px_rgba(15,23,42,0.1)] rounded-2xl bg-white border-black/1 border-0 border-solid p-5 gap-3">
                <CardHeader className="p-0 flex-row justify-between items-start gap-0">
                  <div className="size-9 bg-[oklch(0.45_0.09_255)]/12 rounded-xl flex justify-center items-center">
                    <Boxes className="size-4 text-[oklch(0.45_0.09_255)]" />
                  </div>
                  <Star />
                </CardHeader>
                <CardContent className="p-0 gap-1">
                  <span className="text-neutral-500 text-xs leading-4">
                    Inventory Value
                  </span>
                  <div className="flex items-end gap-2">
                    <span className="font-bold text-xl leading-7 tracking-tight">
                      ₹18.2L
                    </span>
                    <Badge className="bg-[oklch(0.577_0.15_45)]/15 text-[oklch(0.5_0.15_45)] rounded-full text-[10px] border-black/1 border-0 border-solid mb-0.5 px-1.5">
                      -3.1%
                    </Badge>
                  </div>
                  <ChartContainer
                    config={{
                      v: { label: "v", color: "oklch(0.45 0.09 255)" },
                    }}
                    className="mt-1 w-full h-9"
                  >
                    <RechartsLineChart
                      data={[
                        { v: 60 },
                        { v: 55 },
                        { v: 58 },
                        { v: 45 },
                        { v: 48 },
                        { v: 40 },
                      ]}
                    >
                      <Line
                        dataKey="v"
                        stroke="oklch(0.45 0.09 255)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </RechartsLineChart>
                  </ChartContainer>
                  <span className="text-neutral-500 text-[11px]">
                    Capital freed this month
                  </span>
                </CardContent>
              </Card>
              <Card className="transition-transform shadow-[0_2px_16px_-6px_rgba(15,23,42,0.1)] rounded-2xl bg-white border-black/1 border-0 border-solid p-5 gap-3">
                <CardHeader className="p-0 flex-row justify-between items-start gap-0">
                  <div className="size-9 bg-[oklch(0.577_0.15_45)]/12 rounded-xl flex justify-center items-center">
                    <Clock className="size-4 text-[oklch(0.5_0.15_45)]" />
                  </div>
                  <Star />
                </CardHeader>
                <CardContent className="p-0 gap-1">
                  <span className="text-neutral-500 text-xs leading-4">
                    Pending Payments
                  </span>
                  <div className="flex items-end gap-2">
                    <span className="font-bold text-xl leading-7 tracking-tight">
                      ₹7.4L
                    </span>
                    <Badge className="bg-[oklch(0.769_0.13_75)]/15 text-[oklch(0.55_0.13_75)] rounded-full text-[10px] border-black/1 border-0 border-solid mb-0.5 px-1.5">
                      18 invoices
                    </Badge>
                  </div>
                  <ChartContainer
                    config={{
                      v: { label: "v", color: "oklch(0.577 0.15 45)" },
                    }}
                    className="mt-1 w-full h-9"
                  >
                    <RechartsLineChart
                      data={[
                        { v: 40 },
                        { v: 48 },
                        { v: 52 },
                        { v: 50 },
                        { v: 58 },
                        { v: 55 },
                      ]}
                    >
                      <Line
                        dataKey="v"
                        stroke="oklch(0.577 0.15 45)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </RechartsLineChart>
                  </ChartContainer>
                  <span className="text-neutral-500 text-[11px]">
                    ₹2.1L overdue 45+ days
                  </span>
                </CardContent>
              </Card>
              <Card className="transition-transform shadow-[0_2px_16px_-6px_rgba(15,23,42,0.1)] rounded-2xl bg-white border-black/1 border-0 border-solid p-5 gap-3">
                <CardHeader className="p-0 flex-row justify-between items-start gap-0">
                  <div className="size-9 bg-[oklch(0.577_0.245_27.325)]/12 rounded-xl flex justify-center items-center">
                    <ShieldAlert className="size-4 text-[oklch(0.577_0.245_27.325)]" />
                  </div>
                  <span className="size-2 bg-[oklch(0.577_0.245_27.325)] rounded-full mr-1 mt-1.5" />
                </CardHeader>
                <CardContent className="p-0 gap-1">
                  <span className="text-neutral-500 text-xs leading-4">
                    GST Alerts
                  </span>
                  <div className="flex items-end gap-2">
                    <span className="font-bold text-xl leading-7 tracking-tight">
                      4
                    </span>
                    <Badge className="bg-[oklch(0.577_0.245_27.325)]/15 text-[oklch(0.577_0.245_27.325)] rounded-full text-[10px] border-black/1 border-0 border-solid mb-0.5 px-1.5">
                      Action needed
                    </Badge>
                  </div>
                  <ChartContainer
                    config={{
                      v: { label: "v", color: "oklch(0.577 0.245 27.325)" },
                    }}
                    className="mt-1 w-full h-9"
                  >
                    <RechartsBarChart
                      data={[
                        { v: 2 },
                        { v: 3 },
                        { v: 1 },
                        { v: 5 },
                        { v: 3 },
                        { v: 4 },
                      ]}
                    >
                      <Bar
                        dataKey="v"
                        fill="oklch(0.577 0.245 27.325)"
                        radius={2}
                      />
                    </RechartsBarChart>
                  </ChartContainer>
                  <span className="text-neutral-500 text-[11px]">
                    2 HSN mismatches found
                  </span>
                </CardContent>
              </Card>
              <Card className="transition-transform shadow-[0_2px_16px_-6px_rgba(15,23,42,0.1)] rounded-2xl bg-white border-black/1 border-0 border-solid p-5 gap-3">
                <CardHeader className="p-0 flex-row justify-between items-start gap-0">
                  <div className="size-9 bg-[oklch(0.769_0.13_75)]/12 rounded-xl flex justify-center items-center">
                    <PackageX className="size-4 text-[oklch(0.55_0.13_75)]" />
                  </div>
                </CardHeader>
                <CardContent className="p-0 gap-1">
                  <span className="text-neutral-500 text-xs leading-4">
                    Stock Alerts
                  </span>
                  <div className="flex items-end gap-2">
                    <span className="font-bold text-xl leading-7 tracking-tight">
                      9
                    </span>
                    <Badge className="bg-[oklch(0.769_0.13_75)]/15 text-[oklch(0.55_0.13_75)] rounded-full text-[10px] border-black/1 border-0 border-solid mb-0.5 px-1.5">
                      Low stock
                    </Badge>
                  </div>
                  <ChartContainer
                    config={{
                      v: { label: "v", color: "oklch(0.769 0.13 75)" },
                    }}
                    className="mt-1 w-full h-9"
                  >
                    <RechartsBarChart
                      data={[
                        { v: 4 },
                        { v: 6 },
                        { v: 5 },
                        { v: 7 },
                        { v: 8 },
                        { v: 9 },
                      ]}
                    >
                      <Bar dataKey="v" fill="oklch(0.769 0.13 75)" radius={2} />
                    </RechartsBarChart>
                  </ChartContainer>
                  <span className="text-neutral-500 text-[11px]">
                    Rice finishes in 6 days
                  </span>
                </CardContent>
              </Card>
              <Card className="transition-transform shadow-[0_2px_16px_-6px_rgba(15,23,42,0.1)] rounded-2xl bg-white border-black/1 border-0 border-solid p-5 gap-3">
                <CardHeader className="p-0 flex-row justify-between items-start gap-0">
                  <div className="size-9 bg-[oklch(0.6_0.12_200)]/12 rounded-xl flex justify-center items-center">
                    <Copy className="size-4 text-[oklch(0.5_0.12_200)]" />
                  </div>
                </CardHeader>
                <CardContent className="p-0 gap-1">
                  <span className="text-neutral-500 text-xs leading-4">
                    Duplicate Invoices
                  </span>
                  <div className="flex items-end gap-2">
                    <span className="font-bold text-xl leading-7 tracking-tight">
                      2
                    </span>
                    <Badge className="bg-[oklch(0.6_0.12_200)]/15 text-[oklch(0.5_0.12_200)] rounded-full text-[10px] border-black/1 border-0 border-solid mb-0.5 px-1.5">
                      Detected
                    </Badge>
                  </div>
                  <ChartContainer
                    config={{ v: { label: "v", color: "oklch(0.6 0.12 200)" } }}
                    className="mt-1 w-full h-9"
                  >
                    <RechartsLineChart
                      data={[
                        { v: 0 },
                        { v: 1 },
                        { v: 0 },
                        { v: 2 },
                        { v: 1 },
                        { v: 2 },
                      ]}
                    >
                      <Line
                        dataKey="v"
                        stroke="oklch(0.6 0.12 200)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </RechartsLineChart>
                  </ChartContainer>
                  <span className="text-neutral-500 text-[11px]">
                    ₹34,000 flagged
                  </span>
                </CardContent>
              </Card>
              <Card className="transition-transform shadow-[0_2px_16px_-6px_rgba(15,23,42,0.1)] rounded-2xl bg-white border-black/1 border-0 border-solid p-5 gap-3">
                <CardHeader className="p-0 flex-row justify-between items-start gap-0">
                  <div className="size-9 bg-[oklch(0.577_0.245_27.325)]/12 rounded-xl flex justify-center items-center">
                    <AlertTriangle className="size-4 text-[oklch(0.577_0.245_27.325)]" />
                  </div>
                </CardHeader>
                <CardContent className="p-0 gap-1">
                  <span className="text-neutral-500 text-xs leading-4">
                    Payment Risk
                  </span>
                  <div className="flex items-end gap-2">
                    <span className="font-bold text-xl leading-7 tracking-tight">
                      Medium
                    </span>
                  </div>
                  <ChartContainer
                    config={{
                      v: { label: "v", color: "oklch(0.577 0.245 27.325)" },
                    }}
                    className="mt-1 w-full h-9"
                  >
                    <RechartsBarChart
                      data={[
                        { v: 3 },
                        { v: 4 },
                        { v: 5 },
                        { v: 4 },
                        { v: 6 },
                        { v: 5 },
                      ]}
                    >
                      <Bar
                        dataKey="v"
                        fill="oklch(0.577 0.245 27.325)"
                        radius={2}
                      />
                    </RechartsBarChart>
                  </ChartContainer>
                  <span className="text-neutral-500 text-[11px]">
                    Customer XYZ likely to delay
                  </span>
                </CardContent>
              </Card>
              <Card className="transition-transform shadow-[0_2px_16px_-6px_rgba(15,23,42,0.1)] rounded-2xl bg-white border-black/1 border-0 border-solid p-5 gap-3">
                <CardHeader className="p-0 flex-row justify-between items-start gap-0">
                  <div className="size-9 bg-[oklch(0.646_0.14_150)]/12 rounded-xl flex justify-center items-center">
                    <TrendingUp className="size-4 text-[oklch(0.5_0.13_150)]" />
                  </div>
                </CardHeader>
                <CardContent className="p-0 gap-1">
                  <span className="text-neutral-500 text-xs leading-4">
                    Monthly Growth
                  </span>
                  <div className="flex items-end gap-2">
                    <span className="font-bold text-xl leading-7 tracking-tight">
                      +14.2%
                    </span>
                    <Badge className="bg-[oklch(0.646_0.14_150)]/15 text-[oklch(0.5_0.13_150)] rounded-full text-[10px] border-black/1 border-0 border-solid mb-0.5 px-1.5">
                      Strong
                    </Badge>
                  </div>
                  <ChartContainer
                    config={{
                      v: { label: "v", color: "oklch(0.646 0.14 150)" },
                    }}
                    className="mt-1 w-full h-9"
                  >
                    <RechartsAreaChart
                      data={[
                        { v: 20 },
                        { v: 32 },
                        { v: 40 },
                        { v: 38 },
                        { v: 52 },
                        { v: 60 },
                      ]}
                    >
                      <defs>
                        <linearGradient id="grFill" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor="oklch(0.646 0.14 150)"
                            stopOpacity="0.3"
                          />
                          <stop
                            offset="95%"
                            stopColor="oklch(0.646 0.14 150)"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        dataKey="v"
                        stroke="oklch(0.646 0.14 150)"
                        strokeWidth={2}
                        fill="url(#grFill)"
                      />
                    </RechartsAreaChart>
                  </ChartContainer>
                  <span className="text-neutral-500 text-[11px]">
                    Outpacing last quarter
                  </span>
                </CardContent>
              </Card>
            </div>
            <Card className="shadow-[0_4px_24px_-8px_rgba(15,23,42,0.12)] rounded-3xl bg-white border-black/1 border-0 border-solid p-6 gap-4">
              <CardHeader className="p-0 flex-row justify-between items-center gap-0">
                <div className="flex items-center gap-3">
                  <div className="size-10 shadow-sm rounded-2xl bg-neutral-900 flex justify-center items-center">
                    <Sparkles className="size-5 text-neutral-50" />
                  </div>
                  <div className="leading-tight flex flex-col">
                    <span className="font-semibold text-sm leading-5">
                      AI Copilot
                    </span>
                    <span className="text-neutral-500 text-[11px] flex items-center gap-1">
                      <span className="size-1.5 bg-[oklch(0.646_0.14_150)] rounded-full" />
                      Analyzing 5 signals now
                    </span>
                  </div>
                </div>
                <Button className="rounded-lg bg-neutral-100 text-neutral-900 text-xs leading-4 gap-1.5 h-8">
                  <RefreshCw className="size-3.5" />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent className="p-0 gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-neutral-100/60 flex p-3.5 items-start gap-3">
                    <div className="size-8 bg-[oklch(0.577_0.245_27.325)]/12 shrink-0 rounded-xl flex justify-center items-center">
                      <PackageX className="size-4 text-[oklch(0.577_0.245_27.325)]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-sm leading-5">
                        Rice stock will finish in 6 days
                      </p>
                      <p className="text-neutral-500 text-xs leading-4">
                        At current velocity, reorder 40 bags before Nov 7.
                      </p>
                    </div>
                    <Badge className="bg-[oklch(0.577_0.245_27.325)]/15 text-[oklch(0.577_0.245_27.325)] shrink-0 rounded-full text-[10px] border-black/1 border-0 border-solid ml-auto">
                      Critical
                    </Badge>
                  </div>
                  <div className="rounded-2xl bg-neutral-100/60 flex p-3.5 items-start gap-3">
                    <div className="size-8 bg-[oklch(0.6_0.12_200)]/12 shrink-0 rounded-xl flex justify-center items-center">
                      <Copy className="size-4 text-[oklch(0.5_0.12_200)]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-sm leading-5">
                        Duplicate invoice detected
                      </p>
                      <p className="text-neutral-500 text-xs leading-4">
                        INV-2043 matches INV-2039 — ₹34,000 overlap.
                      </p>
                    </div>
                    <Badge className="bg-[oklch(0.6_0.12_200)]/15 text-[oklch(0.5_0.12_200)] shrink-0 rounded-full text-[10px] border-black/1 border-0 border-solid ml-auto">
                      Info
                    </Badge>
                  </div>
                  <div className="rounded-2xl bg-neutral-100/60 flex p-3.5 items-start gap-3">
                    <div className="size-8 bg-[oklch(0.769_0.13_75)]/12 shrink-0 rounded-xl flex justify-center items-center">
                      <UserX className="size-4 text-[oklch(0.55_0.13_75)]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-sm leading-5">
                        Customer XYZ likely to delay payment
                      </p>
                      <p className="text-neutral-500 text-xs leading-4">
                        72% probability based on 4 prior late cycles.
                      </p>
                    </div>
                    <Badge className="bg-[oklch(0.769_0.13_75)]/15 text-[oklch(0.55_0.13_75)] shrink-0 rounded-full text-[10px] border-black/1 border-0 border-solid ml-auto">
                      Warning
                    </Badge>
                  </div>
                  <div className="rounded-2xl bg-neutral-100/60 flex p-3.5 items-start gap-3">
                    <div className="size-8 bg-[oklch(0.577_0.245_27.325)]/12 shrink-0 rounded-xl flex justify-center items-center">
                      <FileWarning className="size-4 text-[oklch(0.577_0.245_27.325)]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-sm leading-5">
                        GST mismatch found
                      </p>
                      <p className="text-neutral-500 text-xs leading-4">
                        HSN code on 2 items differs from filing history.
                      </p>
                    </div>
                    <Badge className="bg-[oklch(0.577_0.245_27.325)]/15 text-[oklch(0.577_0.245_27.325)] shrink-0 rounded-full text-[10px] border-black/1 border-0 border-solid ml-auto">
                      Critical
                    </Badge>
                  </div>
                  <div className="col-span-2 rounded-2xl bg-neutral-100/60 flex p-3.5 items-start gap-3">
                    <div className="size-8 bg-[oklch(0.45_0.09_255)]/12 shrink-0 rounded-xl flex justify-center items-center">
                      <Lock className="size-4 text-[oklch(0.45_0.09_255)]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-sm leading-5">
                        Capital blocked in overstock
                      </p>
                      <p className="text-neutral-500 text-xs leading-4">
                        ₹2.6L tied up in slow-moving SKUs — consider a clearance
                        push.
                      </p>
                    </div>
                    <Badge className="bg-[oklch(0.45_0.09_255)]/15 text-[oklch(0.45_0.09_255)] shrink-0 rounded-full text-[10px] border-black/1 border-0 border-solid ml-auto">
                      Insight
                    </Badge>
                  </div>
                </div>
                <div className="hidden pt-1 flex-col gap-2">
                  <div className="hidden justify-end">
                    <div className="max-w-[70%] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-sm bg-neutral-900 text-neutral-50 text-sm leading-5 px-3.5 py-2" />
                  </div>
                </div>
                <div className="flex pt-1 flex-wrap gap-2">
                  <button className="transition-colors rounded-full bg-neutral-100 text-neutral-500 text-xs leading-4 px-3 py-1.5">
                    What should I reorder?
                  </button>
                  <button className="transition-colors rounded-full bg-neutral-100 text-neutral-500 text-xs leading-4 px-3 py-1.5">
                    Predict next month's demand
                  </button>
                  <button className="transition-colors rounded-full bg-neutral-100 text-neutral-500 text-xs leading-4 px-3 py-1.5">
                    Summarize performance
                  </button>
                  <button className="transition-colors rounded-full bg-neutral-100 text-neutral-500 text-xs leading-4 px-3 py-1.5">
                    Which customers are risky?
                  </button>
                </div>
                <div className="shadow-sm rounded-2xl bg-white border-neutral-200 border-1 border-solid flex p-2 items-center gap-2">
                  <Sparkles className="size-4 text-neutral-900 ml-2" />
                  <input
                    placeholder="Ask StockPilot AI anything about your business..."
                    className="bg-transparent outline-none text-sm leading-5 flex-1"
                    defaultValue=""
                  />
                  <Button className="size-8 shrink-0 rounded-xl bg-neutral-900 text-neutral-50 p-0">
                    <ArrowUp className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
