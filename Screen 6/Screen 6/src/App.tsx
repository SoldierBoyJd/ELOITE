import { useEffect } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  Building2,
  CheckCircle,
  CreditCard,
  FileBarChart,
  FileText,
  GitCompareArrows,
  HelpCircle,
  LayoutDashboard,
  Package,
  Radar as LucideRadar,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar as RechartsRadar,
  RadarChart,
  XAxis,
  YAxis,
} from "recharts";

export default function App() {
  return (
    <div>
      <div className="bg-white text-neutral-950 flex w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <aside className="shrink-0 bg-neutral-50 border-neutral-200 border-t-0 border-r-1 border-b-0 border-l-0 border-solid flex p-4 flex-col gap-6 w-64 h-239">
          <div className="flex px-2 pt-2 items-center gap-2">
            <div className="size-9 shadow-sm rounded-xl bg-neutral-900 flex justify-center items-center">
              <LucideRadar className="size-5 text-neutral-50" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-neutral-950 text-sm leading-5 tracking-tight">
                StockPilot AI
              </span>
              <span className="text-neutral-500 text-[11px]">
                Business Intelligence
              </span>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            <a className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3">
              <LayoutDashboard className="size-4" />
              Dashboard
            </a>
            <a className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3">
              <Package className="size-4" />
              Inventory Intelligence
            </a>
            <a className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3">
              <FileText className="size-4" />
              Invoice Intelligence
            </a>
            <a className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3">
              <CheckCircle className="size-4" />
              GST Compliance
            </a>
            <a className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3">
              <CreditCard className="size-4" />
              Payments
            </a>
            <a className="relative font-medium rounded-lg bg-neutral-100 text-neutral-900 text-sm leading-5 flex px-3 py-2 items-center gap-3">
              <span className="top-1/2 -translate-y-1/2 rounded-full bg-neutral-900 absolute left-0 w-1 h-6" />
              <TrendingUp className="size-4" />
              Business Health
            </a>
            <a className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3">
              <Sparkles className="size-4" />
              AI Insights
            </a>
            <a className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3">
              <BarChart3 className="size-4" />
              Forecast
            </a>
            <a className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3">
              <FileBarChart className="size-4" />
              Reports
            </a>
            <a className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3">
              <Settings className="size-4" />
              Settings
            </a>
            <a className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3">
              <HelpCircle className="size-4" />
              Support
            </a>
          </nav>
          <div className="shadow-sm rounded-xl bg-white border-neutral-200 border-1 border-solid flex mt-auto p-4 flex-col gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-neutral-900" />
              <span className="font-semibold text-xs leading-4">
                AI Copilot
              </span>
            </div>
            <p className="leading-relaxed text-neutral-500 text-[11px]">
              Ask anything about your business health.
            </p>
            <Button className="bg-neutral-900 text-neutral-50 text-xs leading-4 h-8">
              Open Assistant
            </Button>
          </div>
        </aside>
        <div className="flex flex-col flex-1 h-239 overflow-hidden">
          <header className="shrink-0 border-neutral-200 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-8 items-center gap-4 h-16">
            <div className="relative w-80">
              <Search className="top-1/2 -translate-y-1/2 size-4 text-neutral-500 absolute left-3" />
              <Input
                placeholder="Search or ask AI…"
                className="border-transparent rounded-lg bg-neutral-100 pl-9 h-9"
              />
              <kbd className="top-1/2 -translate-y-1/2 rounded-sm text-neutral-500 text-[10px] border-neutral-200 border-1 border-solid absolute right-3 px-1.5 py-0.5">
                ⌘K
              </kbd>
            </div>
            <div className="flex ml-auto items-center gap-2">
              <Button
                variant="outline"
                className="rounded-lg text-sm leading-5 gap-2 h-9"
              >
                <Sparkles className="size-4 text-neutral-900" />
                AI Assistant
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative size-9 rounded-lg"
              >
                <Bell className="size-4" />
                <span className="size-2 rounded-full bg-[#e7000b] absolute right-1.5 top-1.5" />
              </Button>
              <Select defaultValue="radar">
                <SelectTrigger className="rounded-lg text-sm leading-5 gap-2 w-44 h-9">
                  <Building2 className="size-4 text-neutral-500" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="radar">Sharma Traders</SelectItem>
                  <SelectItem value="list">Verma Wholesale</SelectItem>
                </SelectContent>
              </Select>
              <div className="size-9 rounded-full border-neutral-200 border-1 border-solid overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1681500920181-0aff411f8cab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXQlMjBoZWFkc2hvdHxlbnwxfDJ8fHwxNzg1NDQzNjg5fDA&ixlib=rb-4.1.0&q=80&w=400"
                  alt="Profile"
                  className="object-cover w-full h-full"
                  data-photoid="DA-1ph3OE7A"
                  data-authorname="Daniel Stiel"
                  data-authorurl="https://unsplash.com/@danielstiel"
                  data-blurhash="LTHn$-fQ%#kC~payxuj[OZfkVYay"
                />
              </div>
            </div>
          </header>
          <div className="overflow-y-auto p-8 flex-1">
            <div className="flex mb-6 justify-between items-center">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-semibold text-2xl leading-8 tracking-tight">
                    Business Health
                  </h1>
                  <Badge
                    className="border-transparent bg-neutral-100/15 text-neutral-100"
                    variant="outline"
                  >
                    <ShieldCheck className="size-3 mr-1" />
                    Healthy
                  </Badge>
                </div>
                <p className="text-neutral-500 text-sm leading-5">
                  A holistic, AI-scored view of your operational resilience.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-neutral-500 text-sm leading-5 flex items-center gap-2">
                  <GitCompareArrows className="size-4" />
                  Compare last period
                </div>
                <Switch defaultChecked={true} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <Card className="shadow-sm rounded-2xl border-neutral-200 border-0 border-solid flex p-8 flex-col justify-center items-center gap-6">
                <CardHeader className="text-center p-0 items-center gap-1">
                  <CardTitle className="font-medium text-neutral-500 text-sm leading-5">
                    Overall Health Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex p-0 justify-center items-center">
                  <div className="relative size-52 bg-[conic-gradient(from_180deg,oklch(0.646_0.222_41.116)_0deg,oklch(0.6_0.118_184.704)_120deg,oklch(0.205_0_0)_317deg,oklch(0.922_0_0)_317deg)] rounded-full flex justify-center items-center">
                    <div className="shadow-inner rounded-full bg-white flex absolute inset-3 flex-col justify-center items-center">
                      <span className="tabular-nums font-bold text-6xl leading-15 tracking-tighter">
                        88
                      </span>
                      <span className="text-neutral-500 text-xs leading-4 -mt-1">
                        out of 100
                      </span>
                      <div className="font-medium text-neutral-100 text-xs leading-4 flex mt-2 items-center gap-1">
                        <ArrowUpRight className="size-3" />
                        +4 this month
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="text-center p-0 flex-col items-center gap-1">
                  <p className="font-medium text-sm leading-5">
                    Business operating efficiently
                  </p>
                  <p className="text-neutral-500 text-xs leading-4">
                    Top 12% of peers in your sector
                  </p>
                </CardFooter>
              </Card>
              <Card className="col-span-2 shadow-sm rounded-2xl border-neutral-200 border-0 border-solid p-6 gap-4">
                <CardHeader className="p-0 flex-row justify-between items-center gap-1">
                  <div className="flex flex-col gap-1">
                    <CardTitle className="text-base leading-6">
                      Dimension Breakdown
                    </CardTitle>
                    <CardDescription>
                      Seven pillars of business resilience
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-xs leading-4">
                    <LucideRadar className="size-3 mr-1" />
                    Radar
                  </Badge>
                </CardHeader>
                <CardContent className="grid grid-cols-2 p-0 items-center gap-4">
                  <ChartContainer
                    config={{
                      current: { label: "Current", color: "oklch(0.205 0 0)" },
                      target: {
                        label: "Target",
                        color: "oklch(0.6 0.118 184.704)",
                      },
                    }}
                    className="w-full h-60"
                  >
                    <RadarChart
                      data={[
                        { dim: "Inventory", current: 84, target: 90 },
                        { dim: "Cash Flow", current: 78, target: 88 },
                        { dim: "Compliance", current: 95, target: 92 },
                        { dim: "Payments", current: 72, target: 85 },
                        { dim: "Revenue", current: 90, target: 90 },
                        { dim: "Supplier", current: 81, target: 87 },
                        { dim: "Customer", current: 86, target: 89 },
                      ]}
                    >
                      <PolarGrid stroke="oklch(0.922 0 0)" />
                      <PolarAngleAxis
                        dataKey="dim"
                        tick={{ fontSize: 11, fill: "oklch(0.556 0 0)" }}
                      />
                      <RechartsRadar
                        dataKey="current"
                        stroke="oklch(0.205 0 0)"
                        fill="oklch(0.205 0 0)"
                        fillOpacity={0.15}
                        strokeWidth={2}
                      />
                      <RechartsRadar
                        dataKey="target"
                        stroke="oklch(0.6 0.118 184.704)"
                        fill="oklch(0.6 0.118 184.704)"
                        fillOpacity={0.08}
                        strokeWidth={2}
                        strokeDasharray="4 4"
                      />
                      <ChartTooltip />
                    </RadarChart>
                  </ChartContainer>
                  <div className="flex flex-col gap-2">
                    <div className="rounded-lg border-neutral-200 border-1 border-solid flex p-2.5 justify-between items-center">
                      <span className="text-sm leading-5 flex items-center gap-2">
                        <Package className="size-4 text-neutral-500" />
                        Inventory Health
                      </span>
                      <span className="tabular-nums font-semibold text-sm leading-5">
                        84
                      </span>
                    </div>
                    <div className="rounded-lg border-neutral-200 border-1 border-solid flex p-2.5 justify-between items-center">
                      <span className="text-sm leading-5 flex items-center gap-2">
                        <Wallet className="size-4 text-neutral-500" />
                        Cash Flow
                      </span>
                      <span className="tabular-nums font-semibold text-sm leading-5">
                        78
                      </span>
                    </div>
                    <div className="rounded-lg border-neutral-200 border-1 border-solid flex p-2.5 justify-between items-center">
                      <span className="text-sm leading-5 flex items-center gap-2">
                        <CheckCircle className="size-4 text-neutral-500" />
                        Compliance
                      </span>
                      <span className="tabular-nums font-semibold text-neutral-100 text-sm leading-5">
                        95
                      </span>
                    </div>
                    <div className="rounded-lg border-neutral-200 border-1 border-solid flex p-2.5 justify-between items-center">
                      <span className="text-sm leading-5 flex items-center gap-2">
                        <CreditCard className="size-4 text-neutral-500" />
                        Payments
                      </span>
                      <span className="tabular-nums font-semibold text-[#e7000b] text-sm leading-5">
                        72
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center rounded-lg border-neutral-200 border-1 border-solid p-2">
                        <p className="text-neutral-500 text-[11px]">Revenue</p>
                        <p className="font-semibold text-sm leading-5">90</p>
                      </div>
                      <div className="text-center rounded-lg border-neutral-200 border-1 border-solid p-2">
                        <p className="text-neutral-500 text-[11px]">Supplier</p>
                        <p className="font-semibold text-sm leading-5">81</p>
                      </div>
                      <div className="text-center rounded-lg border-neutral-200 border-1 border-solid p-2">
                        <p className="text-neutral-500 text-[11px]">Customer</p>
                        <p className="font-semibold text-sm leading-5">86</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-3 mt-6 gap-6">
              <Card className="col-span-2 shadow-sm rounded-2xl border-neutral-200 border-0 border-solid p-6 gap-4">
                <CardHeader className="p-0 flex-row justify-between items-center gap-1">
                  <div className="flex flex-col gap-1">
                    <CardTitle className="text-base leading-6">
                      Trend Analysis
                    </CardTitle>
                    <CardDescription>
                      Health score evolution over recent months
                    </CardDescription>
                  </div>
                  <Tabs defaultValue="6m">
                    <TabsList className="h-8">
                      <TabsTrigger value="3m" className="text-xs leading-4">
                        3M
                      </TabsTrigger>
                      <TabsTrigger value="6m" className="text-xs leading-4">
                        6M
                      </TabsTrigger>
                      <TabsTrigger value="12m" className="text-xs leading-4">
                        12M
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent className="p-0">
                  <ChartContainer
                    config={{
                      score: { label: "Health", color: "oklch(0.205 0 0)" },
                      peers: {
                        label: "Peers",
                        color: "oklch(0.6 0.118 184.704)",
                      },
                    }}
                    className="w-full h-55"
                  >
                    <RechartsAreaChart
                      data={[
                        { month: "Apr", score: 76, peers: 71 },
                        { month: "May", score: 79, peers: 72 },
                        { month: "Jun", score: 78, peers: 73 },
                        { month: "Jul", score: 82, peers: 74 },
                        { month: "Aug", score: 84, peers: 75 },
                        { month: "Sep", score: 88, peers: 76 },
                      ]}
                    >
                      <defs>
                        <linearGradient id="gScore" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="0%"
                            stopColor="oklch(0.205 0 0)"
                            stopOpacity={0.25}
                          />
                          <stop
                            offset="100%"
                            stopColor="oklch(0.205 0 0)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        vertical={false}
                        stroke="oklch(0.922 0 0)"
                      />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11, fill: "oklch(0.556 0 0)" }}
                      />
                      <YAxis
                        domain={[60, 100]}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11, fill: "oklch(0.556 0 0)" }}
                        width={28}
                      />
                      <Area
                        dataKey="score"
                        stroke="oklch(0.205 0 0)"
                        strokeWidth={2.5}
                        fill="url(#gScore)"
                      />
                      <Area
                        dataKey="peers"
                        stroke="oklch(0.6 0.118 184.704)"
                        strokeWidth={2}
                        strokeDasharray="4 4"
                        fill="transparent"
                      />
                      <ChartTooltip />
                    </RechartsAreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card className="shadow-sm rounded-2xl border-neutral-200 border-0 border-solid p-6 gap-4">
                <CardHeader className="p-0 gap-1">
                  <CardTitle className="text-base leading-6 flex items-center gap-2">
                    <Sparkles className="size-4 text-neutral-900" />
                    AI Recommendations
                  </CardTitle>
                  <CardDescription>Calm, actionable next steps</CardDescription>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-3">
                  <div className="rounded-xl border-neutral-200 border-1 border-solid flex p-3 gap-3">
                    <div className="size-8 shrink-0 rounded-lg bg-[#e7000b]/10 flex justify-center items-center">
                      <CreditCard className="size-4 text-[#e7000b]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="leading-tight font-medium text-sm leading-5">
                        Chase ₹4.2L in aging receivables
                      </p>
                      <p className="leading-snug text-neutral-500 text-xs leading-4">
                        3 customers past 60 days. Send reminders to lift
                        Payments score.
                      </p>
                      <Button />
                    </div>
                  </div>
                  <div className="rounded-xl border-neutral-200 border-1 border-solid flex p-3 gap-3">
                    <div className="size-8 shrink-0 rounded-lg bg-neutral-100/10 flex justify-center items-center">
                      <Package className="size-4 text-neutral-100" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="leading-tight font-medium text-sm leading-5">
                        Reorder Basmati Rice
                      </p>
                      <p className="leading-snug text-neutral-500 text-xs leading-4">
                        Stock runs out in 6 days. Suggested PO of 40 bags.
                      </p>
                      <Button />
                    </div>
                  </div>
                  <div className="rounded-xl border-neutral-200 border-1 border-solid flex p-3 gap-3">
                    <div className="size-8 shrink-0 rounded-lg bg-neutral-900/10 flex justify-center items-center">
                      <TrendingDown className="size-4 text-neutral-900" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="leading-tight font-medium text-sm leading-5">
                        Unblock ₹2.1L in overstock
                      </p>
                      <p className="leading-snug text-neutral-500 text-xs leading-4">
                        Capital tied up in slow movers. Consider a clearance
                        push.
                      </p>
                      <Button />
                    </div>
                  </div>
                  <div className="rounded-xl border-neutral-200 border-1 border-solid flex p-3 gap-3">
                    <div className="size-8 shrink-0 rounded-lg bg-neutral-100/10 flex justify-center items-center">
                      <CheckCircle className="size-4 text-neutral-100" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="leading-tight font-medium text-sm leading-5">
                        Compliance is excellent
                      </p>
                      <p className="leading-snug text-neutral-500 text-xs leading-4">
                        All GST filings on time. No action needed this cycle.
                      </p>
                      <Button className="text-xs leading-4 mt-1 w-fit h-7" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
