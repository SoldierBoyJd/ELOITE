import { useEffect } from "react";
import {
  AreaChart as LucideAreaChart,
  BarChart3,
  Bell,
  Boxes,
  Building2,
  CalendarDays,
  CheckCircle,
  ChevronsUpDown,
  CreditCard,
  Download,
  FileBarChart,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Lightbulb,
  LineChart as LucideLineChart,
  MessageSquare,
  Package,
  Percent,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  XAxis,
  YAxis,
} from "recharts";

export default function App() {
  return (
    <div>
      <div className="bg-white text-neutral-950 flex w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <aside className="shrink-0 bg-neutral-50 border-neutral-200 border-t-0 border-r-1 border-b-0 border-l-0 border-solid flex flex-col w-64 h-239">
          <div className="flex p-6 items-center gap-2">
            <div className="size-9 rounded-xl bg-neutral-900 flex justify-center items-center">
              <Boxes className="size-5 text-neutral-50" />
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
          <nav className="flex px-4 flex-col flex-1 gap-1 overflow-hidden">
            <button className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3">
              <LayoutDashboard className="size-4" />
              <span>Dashboard</span>
            </button>
            <button className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3">
              <Package className="size-4" />
              <span>Inventory Intelligence</span>
            </button>
            <button className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3">
              <FileText className="size-4" />
              <span>Invoice Intelligence</span>
            </button>
            <button className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3">
              <CheckCircle className="size-4" />
              <span>GST Compliance</span>
            </button>
            <button className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3">
              <CreditCard className="size-4" />
              <span>Payments</span>
            </button>
            <button className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3">
              <TrendingUp className="size-4" />
              <span>Business Health</span>
            </button>
            <button className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3">
              <Sparkles className="size-4" />
              <span>AI Insights</span>
            </button>
            <button className="relative font-medium rounded-lg bg-neutral-900/8 text-neutral-900 text-sm leading-5 flex px-3 py-2 items-center gap-3">
              <span className="rounded-full bg-neutral-900 absolute left-0 inset-y-1.5 w-1" />
              <BarChart3 className="size-4" />
              <span>Forecast</span>
            </button>
            <button className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3">
              <FileBarChart className="size-4" />
              <span>Reports</span>
            </button>
            <button className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3">
              <Settings className="size-4" />
              <span>Settings</span>
            </button>
            <button className="transition-colors rounded-lg text-neutral-950/70 text-sm leading-5 flex px-3 py-2 items-center gap-3">
              <HelpCircle className="size-4" />
              <span>Support</span>
            </button>
          </nav>
          <div className="rounded-xl bg-neutral-900/5 border-neutral-900/10 border-1 border-solid flex m-4 p-4 flex-col gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-neutral-900" />
              <span className="font-semibold text-xs leading-4">
                Upgrade to Pro
              </span>
            </div>
            <p className="leading-relaxed text-neutral-500 text-[11px]">
              Unlock advanced forecasting horizons and unlimited scenarios.
            </p>
            <Button className="bg-neutral-900 text-neutral-50 text-xs leading-4 mt-1 h-8">
              Upgrade
            </Button>
          </div>
        </aside>
        <div className="bg-neutral-100/40 flex flex-col flex-1 h-239 overflow-hidden">
          <header className="shrink-0 bg-white border-neutral-200 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-8 justify-between items-center gap-4 h-16">
            <div className="relative w-80">
              <Search className="top-1/2 -translate-y-1/2 size-4 text-neutral-500 absolute left-3" />
              <Input
                className="border-transparent rounded-lg bg-neutral-100/60 text-sm leading-5 pl-9 h-9"
                placeholder="Search forecasts, products, insights..."
              />
              <kbd className="top-1/2 -translate-y-1/2 rounded-sm text-neutral-500 text-[10px] border-neutral-200 border-1 border-solid absolute right-3 px-1.5 py-0.5">
                ⌘K
              </kbd>
            </div>
            <div className="flex items-center gap-2">
              <Button className="rounded-lg bg-neutral-900 text-neutral-50 text-sm leading-5 gap-2 h-9">
                <Sparkles className="size-4" />
                AI Assistant
              </Button>
              <button className="relative size-9 transition-colors rounded-lg flex justify-center items-center">
                <Bell className="size-[18px] text-neutral-500" />
                <span className="size-1.5 rounded-full bg-[#e7000b] absolute right-2 top-2" />
              </button>
              <button className="transition-colors rounded-lg border-neutral-200 border-1 border-solid flex px-3 items-center gap-2 h-9">
                <div className="size-5 rounded-sm bg-neutral-900/10 flex justify-center items-center">
                  <Building2 className="size-3 text-neutral-900" />
                </div>
                <span className="font-medium text-sm leading-5">
                  Acme Traders
                </span>
                <ChevronsUpDown className="size-3.5 text-neutral-500" />
              </button>
              <button className="size-9 ring-2 ring-border rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1696960181436-1b6d9576354e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwd29tYW58ZW58MXwyfHx8MTc4NTUxMTYxN3ww&ixlib=rb-4.1.0&q=80&w=400"
                  alt="Profile"
                  className="object-cover w-full h-full"
                  data-photoid="T7XG8QAn0Mw"
                  data-authorname="Julia Potter"
                  data-authorurl="https://unsplash.com/@juliapotter"
                  data-blurhash="LJKxG34m?v%M?b%MIoRjR*ofs:WW"
                />
              </button>
            </div>
          </header>
          <main className="overflow-y-auto p-8 flex-1">
            <div className="flex mb-6 justify-between items-start">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-semibold text-2xl leading-8 tracking-tight">
                    Forecast Analytics
                  </h1>
                  <Badge className="border-transparent rounded-full bg-neutral-900/10 text-neutral-900 text-[11px] gap-1">
                    <Sparkles className="size-3" />
                    AI Powered
                  </Badge>
                </div>
                <p className="text-neutral-500 text-sm leading-5">
                  Predictive demand modeling with confidence intervals and
                  seasonality analysis.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Select defaultValue="all">
                  <SelectTrigger className="rounded-lg bg-white text-sm leading-5 w-40 h-9">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="grains">{`Grains & Cereals`}</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="beverages">Beverages</SelectItem>
                  </SelectContent>
                </Select>
                <Tabs defaultValue="12m">
                  <TabsList className="rounded-lg bg-neutral-100 h-9">
                    <TabsTrigger
                      value="3m"
                      className="rounded-md text-xs leading-4"
                    >
                      3M
                    </TabsTrigger>
                    <TabsTrigger
                      value="6m"
                      className="rounded-md text-xs leading-4"
                    >
                      6M
                    </TabsTrigger>
                    <TabsTrigger
                      value="12m"
                      className="rounded-md text-xs leading-4"
                    >
                      12M
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <Button className="rounded-lg bg-white text-neutral-950 text-sm leading-5 border-neutral-200 border-1 border-solid gap-2 h-9">
                  <Download className="size-4" />
                  Export
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 mb-6 gap-4">
              <Card className="shadow-sm rounded-2xl border-neutral-200 border-0 border-solid p-5 gap-3">
                <CardHeader className="p-0 flex-row justify-between items-center gap-1">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-lg bg-neutral-900/10 flex justify-center items-center">
                      <TrendingUp className="size-4 text-neutral-900" />
                    </div>
                    <span className="text-neutral-500 text-xs leading-4">
                      Predicted Demand
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-0 gap-2">
                  <div className="flex items-end gap-2">
                    <span className="font-semibold text-2xl leading-8 tracking-tight">
                      12,840
                    </span>
                    <span className="font-medium text-emerald-600 text-xs leading-4 mb-1">
                      +14.2%
                    </span>
                  </div>
                  <ChartContainer
                    config={{
                      v: { label: "Units", color: "oklch(0.205 0 0)" },
                    }}
                    className="w-full h-10"
                  >
                    <RechartsAreaChart
                      data={[
                        { m: "1", v: 40 },
                        { m: "2", v: 55 },
                        { m: "3", v: 48 },
                        { m: "4", v: 70 },
                        { m: "5", v: 65 },
                        { m: "6", v: 90 },
                      ]}
                    >
                      <defs>
                        <linearGradient id="sp1" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="0%"
                            stopColor="oklch(0.205 0 0)"
                            stopOpacity="0.25"
                          />
                          <stop
                            offset="100%"
                            stopColor="oklch(0.205 0 0)"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke="oklch(0.205 0 0)"
                        strokeWidth={2}
                        fill="url(#sp1)"
                      />
                    </RechartsAreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card className="shadow-sm rounded-2xl border-neutral-200 border-0 border-solid p-5 gap-3">
                <CardHeader className="p-0 flex-row justify-between items-center gap-1">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-lg bg-emerald-500/10 flex justify-center items-center">
                      <Target className="size-4 text-emerald-600" />
                    </div>
                    <span className="text-neutral-500 text-xs leading-4">
                      Forecast Accuracy
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-0 gap-2">
                  <div className="flex items-end gap-2">
                    <span className="font-semibold text-2xl leading-8 tracking-tight">
                      94.6%
                    </span>
                    <span className="font-medium text-emerald-600 text-xs leading-4 mb-1">
                      +2.1%
                    </span>
                  </div>
                  <ChartContainer
                    config={{
                      v: { label: "Acc", color: "oklch(0.6 0.118 184.704)" },
                    }}
                    className="w-full h-10"
                  >
                    <RechartsLineChart
                      data={[
                        { m: "1", v: 88 },
                        { m: "2", v: 90 },
                        { m: "3", v: 89 },
                        { m: "4", v: 92 },
                        { m: "5", v: 93 },
                        { m: "6", v: 95 },
                      ]}
                    >
                      <Line
                        type="monotone"
                        dataKey="v"
                        stroke="oklch(0.6 0.118 184.704)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </RechartsLineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card className="shadow-sm rounded-2xl border-neutral-200 border-0 border-solid p-5 gap-3">
                <CardHeader className="p-0 flex-row justify-between items-center gap-1">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-lg bg-amber-500/10 flex justify-center items-center">
                      <Zap className="size-4 text-amber-600" />
                    </div>
                    <span className="text-neutral-500 text-xs leading-4">
                      Demand Spikes
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-0 gap-2">
                  <div className="flex items-end gap-2">
                    <span className="font-semibold text-2xl leading-8 tracking-tight">
                      7
                    </span>
                    <span className="font-medium text-amber-600 text-xs leading-4 mb-1">
                      next 90d
                    </span>
                  </div>
                  <ChartContainer
                    config={{
                      v: { label: "Spikes", color: "oklch(0.769 0.188 70.08)" },
                    }}
                    className="w-full h-10"
                  >
                    <RechartsBarChart
                      data={[
                        { m: "1", v: 30 },
                        { m: "2", v: 60 },
                        { m: "3", v: 40 },
                        { m: "4", v: 80 },
                        { m: "5", v: 50 },
                        { m: "6", v: 90 },
                      ]}
                    >
                      <Bar
                        dataKey="v"
                        fill="oklch(0.769 0.188 70.08)"
                        radius={3}
                      />
                    </RechartsBarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card className="shadow-sm rounded-2xl border-neutral-200 border-0 border-solid p-5 gap-3">
                <CardHeader className="p-0 flex-row justify-between items-center gap-1">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-lg bg-neutral-100 flex justify-center items-center">
                      <Percent className="size-4 text-neutral-950" />
                    </div>
                    <span className="text-neutral-500 text-xs leading-4">
                      Confidence
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-0 gap-2">
                  <div className="flex items-end gap-2">
                    <span className="font-semibold text-2xl leading-8 tracking-tight">
                      88%
                    </span>
                    <span className="font-medium text-neutral-500 text-xs leading-4 mb-1">
                      high
                    </span>
                  </div>
                  <ChartContainer
                    config={{ v: { label: "Conf", color: "oklch(0.205 0 0)" } }}
                    className="w-full h-10"
                  >
                    <RechartsAreaChart
                      data={[
                        { m: "1", v: 70 },
                        { m: "2", v: 72 },
                        { m: "3", v: 80 },
                        { m: "4", v: 78 },
                        { m: "5", v: 85 },
                        { m: "6", v: 88 },
                      ]}
                    >
                      <defs>
                        <linearGradient id="sp4" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="0%"
                            stopColor="oklch(0.205 0 0)"
                            stopOpacity="0.2"
                          />
                          <stop
                            offset="100%"
                            stopColor="oklch(0.205 0 0)"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke="oklch(0.205 0 0)"
                        strokeWidth={2}
                        fill="url(#sp4)"
                      />
                    </RechartsAreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-3 mb-6 gap-6">
              <Card className="col-span-2 shadow-sm rounded-2xl border-neutral-200 border-0 border-solid p-6 gap-4">
                <CardHeader className="p-0 flex-row justify-between items-start gap-1">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-base leading-6 tracking-tight">
                        Monthly Demand Prediction
                      </span>
                      <Badge className="border-transparent rounded-full bg-emerald-500/10 text-emerald-600 text-[10px]">
                        Live Model
                      </Badge>
                    </div>
                    <span className="text-neutral-500 text-xs leading-4">
                      Projected units with 88% confidence interval band
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-500 text-xs leading-4">
                        Confidence band
                      </span>
                      <Switch defaultChecked={true} />
                    </div>
                    <RadioGroup
                      className="rounded-lg bg-neutral-100 flex p-0.5 gap-1"
                      defaultValue="area"
                    >
                      <label>
                        <RadioGroupItem value="area" className="sr-only" />
                        <LucideAreaChart className="size-3.5" />
                        Area
                      </label>
                      <label>
                        <RadioGroupItem value="line" className="sr-only" />
                        <LucideLineChart className="size-3.5" />
                        Line
                      </label>
                    </RadioGroup>
                  </div>
                </CardHeader>
                <CardContent className="p-0 gap-2">
                  <ChartContainer
                    config={{
                      actual: { label: "Actual", color: "oklch(0.205 0 0)" },
                      forecast: {
                        label: "Forecast",
                        color: "oklch(0.646 0.222 41.116)",
                      },
                    }}
                    className="w-full h-70"
                  >
                    <RechartsAreaChart
                      data={[
                        { m: "Jan", upper: 8200, lower: 7400, actual: 7800 },
                        { m: "Feb", upper: 8600, lower: 7600, actual: 8100 },
                        { m: "Mar", upper: 9400, lower: 8200, actual: 8800 },
                        { m: "Apr", upper: 9000, lower: 8000, actual: 8500 },
                        { m: "May", upper: 10200, lower: 9000, actual: 9600 },
                        { m: "Jun", upper: 11000, lower: 9600, actual: 10300 },
                        { m: "Jul", upper: 11800, lower: 10200, actual: 11000 },
                        {
                          m: "Aug",
                          upper: 12600,
                          lower: 10800,
                          forecast: 11700,
                        },
                        {
                          m: "Sep",
                          upper: 13400,
                          lower: 11200,
                          forecast: 12300,
                        },
                        {
                          m: "Oct",
                          upper: 14200,
                          lower: 11800,
                          forecast: 12900,
                        },
                        {
                          m: "Nov",
                          upper: 15000,
                          lower: 12400,
                          forecast: 13600,
                        },
                        {
                          m: "Dec",
                          upper: 15800,
                          lower: 12800,
                          forecast: 14200,
                        },
                      ]}
                    >
                      <defs>
                        <linearGradient id="gArea" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="0%"
                            stopColor="oklch(0.205 0 0)"
                            stopOpacity="0.28"
                          />
                          <stop
                            offset="100%"
                            stopColor="oklch(0.205 0 0)"
                            stopOpacity="0.02"
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="oklch(0.922 0 0)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="m"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11, fill: "oklch(0.556 0 0)" }}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11, fill: "oklch(0.556 0 0)" }}
                        width={40}
                      />
                      <ChartTooltip />
                      <Area
                        type="monotone"
                        dataKey="upper"
                        stroke="none"
                        fill="oklch(0.646 0.222 41.116)"
                        fillOpacity={0.1}
                      />
                      <Area
                        type="monotone"
                        dataKey="lower"
                        stroke="none"
                        fill="oklch(1 0 0)"
                        fillOpacity={1}
                      />
                      <Area
                        type="monotone"
                        dataKey="actual"
                        stroke="oklch(0.205 0 0)"
                        strokeWidth={2.5}
                        fill="url(#gArea)"
                      />
                      <Area
                        type="monotone"
                        dataKey="forecast"
                        stroke="oklch(0.646 0.222 41.116)"
                        strokeWidth={2.5}
                        strokeDasharray="5 4"
                        fill="none"
                      />
                    </RechartsAreaChart>
                  </ChartContainer>
                  <ChartContainer
                    config={{
                      actual: { label: "Actual", color: "oklch(0.205 0 0)" },
                      forecast: {
                        label: "Forecast",
                        color: "oklch(0.646 0.222 41.116)",
                      },
                    }}
                    className="hidden w-full h-70"
                  >
                    <RechartsLineChart
                      data={[
                        { m: "Jan", actual: 7800 },
                        { m: "Feb", actual: 8100 },
                        { m: "Mar", actual: 8800 },
                        { m: "Apr", actual: 8500 },
                        { m: "May", actual: 9600 },
                        { m: "Jun", actual: 10300 },
                        { m: "Jul", actual: 11000 },
                        { m: "Aug", forecast: 11700 },
                        { m: "Sep", forecast: 12300 },
                        { m: "Oct", forecast: 12900 },
                        { m: "Nov", forecast: 13600 },
                        { m: "Dec", forecast: 14200 },
                      ]}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="oklch(0.922 0 0)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="m"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11, fill: "oklch(0.556 0 0)" }}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11, fill: "oklch(0.556 0 0)" }}
                        width={40}
                      />
                      <ChartTooltip />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="oklch(0.205 0 0)"
                        strokeWidth={2.5}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="forecast"
                        stroke="oklch(0.646 0.222 41.116)"
                        strokeWidth={2.5}
                        strokeDasharray="5 4"
                        dot={false}
                      />
                    </RechartsLineChart>
                  </ChartContainer>
                  <div className="flex pt-1 items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full bg-neutral-900" />
                      <span className="text-neutral-500 text-xs leading-4">
                        Actual demand
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 bg-[oklch(0.646_0.222_41.116)] rounded-full" />
                      <span className="text-neutral-500 text-xs leading-4">
                        Forecast
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 bg-[oklch(0.646_0.222_41.116)]/20 rounded-full" />
                      <span className="text-neutral-500 text-xs leading-4">
                        88% confidence band
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-sm bg-gradient-to-b from-primary/[0.03] to-transparent rounded-2xl border-neutral-200 border-0 border-solid p-6 gap-4">
                <CardHeader className="p-0 gap-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-lg bg-neutral-900 flex justify-center items-center">
                        <Sparkles className="size-4 text-neutral-50" />
                      </div>
                      <span className="font-semibold text-base leading-6 tracking-tight">
                        AI Reasoning
                      </span>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <span className="text-neutral-500 text-xs leading-4">
                    How the model reached this forecast
                  </span>
                </CardHeader>
                <CardContent className="p-0 gap-3">
                  <p className="leading-relaxed text-neutral-950/80 text-[13px]">
                    Demand is trending upward with strong momentum. Here's
                    what's driving the projection:
                  </p>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2.5">
                      <TrendingUp className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                      <p className="leading-relaxed text-neutral-950/75 text-[13px]">
                        A consistent
                        <span className="font-medium text-neutral-950">
                          14% MoM growth
                        </span>
                        over the last quarter suggests continued expansion into
                        Q4.
                      </p>
                    </div>
                    <div className="flex gap-2.5">
                      <CalendarDays className="size-4 shrink-0 text-amber-600 mt-0.5" />
                      <p className="leading-relaxed text-neutral-950/75 text-[13px]">
                        Historical
                        <span className="font-medium text-neutral-950">
                          festive-season spikes
                        </span>
                        in Oct–Dec are amplifying the upper band.
                      </p>
                    </div>
                    <div className="flex gap-2.5">
                      <Package className="size-4 shrink-0 text-neutral-900 mt-0.5" />
                      <p className="leading-relaxed text-neutral-950/75 text-[13px]">
                        {`Grains & Cereals lead demand, contributing`}
                        <span className="font-medium text-neutral-950">
                          42% of predicted volume
                        </span>
                        .
                      </p>
                    </div>
                    <div className="flex gap-2.5">
                      <ShieldCheck className="size-4 shrink-0 text-neutral-500 mt-0.5" />
                      <p className="leading-relaxed text-neutral-950/75 text-[13px]">
                        Confidence held at
                        <span className="font-medium text-neutral-950">
                          88%
                        </span>
                        — supplier lead times remain the key uncertainty.
                      </p>
                    </div>
                  </div>
                  <div className="rounded-xl bg-amber-500/10 border-amber-500/20 border-1 border-solid flex mt-1 p-3 gap-2.5">
                    <Lightbulb className="size-4 shrink-0 text-amber-600 mt-0.5" />
                    <p className="leading-relaxed text-neutral-950/80 text-[13px]">
                      <span className="font-medium">Recommendation:</span>
                      Increase reorder volume by 18% before September to avoid
                      stockouts during the projected spike.
                    </p>
                  </div>
                  <Button className="rounded-lg bg-neutral-100 text-neutral-950 text-xs leading-4 mt-1 gap-2 h-9">
                    <MessageSquare className="size-3.5" />
                    Ask a follow-up
                  </Button>
                </CardContent>
                <CardContent className="hidden p-0 gap-2">
                  <p className="text-neutral-500 text-[13px]">
                    Reasoning collapsed. Toggle to view the model's analysis.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <Card className="col-span-2 shadow-sm rounded-2xl border-neutral-200 border-0 border-solid p-6 gap-4">
                <CardHeader className="p-0 flex-row justify-between items-center gap-1">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-base leading-6 tracking-tight">
                      Demand Spike Heatmap
                    </span>
                    <span className="text-neutral-500 text-xs leading-4">
                      Intensity by category across the year
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500 text-[11px]">Low</span>
                    <div className="flex gap-0.5">
                      <span className="size-3 rounded-sm bg-neutral-900/10" />
                      <span className="size-3 rounded-sm bg-neutral-900/25" />
                      <span className="size-3 rounded-sm bg-neutral-900/45" />
                      <span className="size-3 rounded-sm bg-neutral-900/70" />
                      <span className="size-3 rounded-sm bg-neutral-900" />
                    </div>
                    <span className="text-neutral-500 text-[11px]">High</span>
                  </div>
                </CardHeader>
                <CardContent className="p-0 gap-2">
                  <div className="flex flex-col gap-1.5">
                    <div className="grid grid-cols-[110px_repeat(12,1fr)] gap-1.5">
                      <span />
                      <span className="text-center text-neutral-500 text-[10px]">
                        J
                      </span>
                      <span className="text-center text-neutral-500 text-[10px]">
                        F
                      </span>
                      <span className="text-center text-neutral-500 text-[10px]">
                        M
                      </span>
                      <span className="text-center text-neutral-500 text-[10px]">
                        A
                      </span>
                      <span className="text-center text-neutral-500 text-[10px]">
                        M
                      </span>
                      <span className="text-center text-neutral-500 text-[10px]">
                        J
                      </span>
                      <span className="text-center text-neutral-500 text-[10px]">
                        J
                      </span>
                      <span className="text-center text-neutral-500 text-[10px]">
                        A
                      </span>
                      <span className="text-center text-neutral-500 text-[10px]">
                        S
                      </span>
                      <span className="text-center text-neutral-500 text-[10px]">
                        O
                      </span>
                      <span className="text-center text-neutral-500 text-[10px]">
                        N
                      </span>
                      <span className="text-center text-neutral-500 text-[10px]">
                        D
                      </span>
                    </div>
                    <div className="grid grid-cols-[110px_repeat(12,1fr)] items-center gap-1.5">
                      <span className="text-neutral-500 text-xs leading-4">
                        Grains
                      </span>
                      <span className="rounded-sm bg-neutral-900/25 h-6" />
                      <span className="rounded-sm bg-neutral-900/25 h-6" />
                      <span className="rounded-sm bg-neutral-900/45 h-6" />
                      <span className="rounded-sm bg-neutral-900/45 h-6" />
                      <span className="rounded-sm bg-neutral-900/70 h-6" />
                      <span className="rounded-sm bg-neutral-900/45 h-6" />
                      <span className="rounded-sm bg-neutral-900/70 h-6" />
                      <span className="rounded-sm bg-neutral-900/70 h-6" />
                      <span className="rounded-sm bg-neutral-900 h-6" />
                      <span className="rounded-sm bg-neutral-900 h-6" />
                      <span className="rounded-sm bg-neutral-900/70 h-6" />
                      <span className="rounded-sm bg-neutral-900/45 h-6" />
                    </div>
                    <div className="grid grid-cols-[110px_repeat(12,1fr)] items-center gap-1.5">
                      <span className="text-neutral-500 text-xs leading-4">
                        Dairy
                      </span>
                      <span className="rounded-sm bg-neutral-900/45 h-6" />
                      <span className="rounded-sm bg-neutral-900/25 h-6" />
                      <span className="rounded-sm bg-neutral-900/25 h-6" />
                      <span className="rounded-sm bg-neutral-900/10 h-6" />
                      <span className="rounded-sm bg-neutral-900/25 h-6" />
                      <span className="rounded-sm bg-neutral-900/45 h-6" />
                      <span className="rounded-sm bg-neutral-900/70 h-6" />
                      <span className="rounded-sm bg-neutral-900/45 h-6" />
                      <span className="rounded-sm bg-neutral-900/25 h-6" />
                      <span className="rounded-sm bg-neutral-900/45 h-6" />
                      <span className="rounded-sm bg-neutral-900/70 h-6" />
                      <span className="rounded-sm bg-neutral-900/45 h-6" />
                    </div>
                    <div className="grid grid-cols-[110px_repeat(12,1fr)] items-center gap-1.5">
                      <span className="text-neutral-500 text-xs leading-4">
                        Beverages
                      </span>
                      <span className="rounded-sm bg-neutral-900/10 h-6" />
                      <span className="rounded-sm bg-neutral-900/25 h-6" />
                      <span className="rounded-sm bg-neutral-900/45 h-6" />
                      <span className="rounded-sm bg-neutral-900/70 h-6" />
                      <span className="rounded-sm bg-neutral-900 h-6" />
                      <span className="rounded-sm bg-neutral-900 h-6" />
                      <span className="rounded-sm bg-neutral-900/70 h-6" />
                      <span className="rounded-sm bg-neutral-900/45 h-6" />
                      <span className="rounded-sm bg-neutral-900/25 h-6" />
                      <span className="rounded-sm bg-neutral-900/25 h-6" />
                      <span className="rounded-sm bg-neutral-900/45 h-6" />
                      <span className="rounded-sm bg-neutral-900/70 h-6" />
                    </div>
                    <div className="grid grid-cols-[110px_repeat(12,1fr)] items-center gap-1.5">
                      <span className="text-neutral-500 text-xs leading-4">
                        Snacks
                      </span>
                      <span className="rounded-sm bg-neutral-900/25 h-6" />
                      <span className="rounded-sm bg-neutral-900/45 h-6" />
                      <span className="rounded-sm bg-neutral-900/45 h-6" />
                      <span className="rounded-sm bg-neutral-900/25 h-6" />
                      <span className="rounded-sm bg-neutral-900/45 h-6" />
                      <span className="rounded-sm bg-neutral-900/70 h-6" />
                      <span className="rounded-sm bg-neutral-900/45 h-6" />
                      <span className="rounded-sm bg-neutral-900/70 h-6" />
                      <span className="rounded-sm bg-neutral-900 h-6" />
                      <span className="rounded-sm bg-neutral-900 h-6" />
                      <span className="rounded-sm bg-neutral-900 h-6" />
                      <span className="rounded-sm bg-neutral-900/70 h-6" />
                    </div>
                    <div className="grid grid-cols-[110px_repeat(12,1fr)] items-center gap-1.5">
                      <span className="text-neutral-500 text-xs leading-4">
                        Household
                      </span>
                      <span className="rounded-sm bg-neutral-900/45 h-6" />
                      <span className="rounded-sm bg-neutral-900/45 h-6" />
                      <span className="rounded-sm bg-neutral-900/25 h-6" />
                      <span className="rounded-sm bg-neutral-900/25 h-6" />
                      <span className="rounded-sm bg-neutral-900/10 h-6" />
                      <span className="rounded-sm bg-neutral-900/25 h-6" />
                      <span className="rounded-sm bg-neutral-900/45 h-6" />
                      <span className="rounded-sm bg-neutral-900/45 h-6" />
                      <span className="rounded-sm bg-neutral-900/70 h-6" />
                      <span className="rounded-sm bg-neutral-900/70 h-6" />
                      <span className="rounded-sm bg-neutral-900/45 h-6" />
                      <span className="rounded-sm bg-neutral-900/25 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex flex-col gap-6">
                <Card className="shadow-sm rounded-2xl border-neutral-200 border-0 border-solid p-6 gap-4">
                  <CardHeader className="p-0 flex-row justify-between items-center gap-1">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-base leading-6 tracking-tight">
                        Seasonality
                      </span>
                      <span className="text-neutral-500 text-xs leading-4">
                        Cyclical demand pattern
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-500 text-[11px]">YoY</span>
                      <Switch defaultChecked={true} />
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 gap-2">
                    <ChartContainer
                      config={{
                        y: { label: "This year", color: "oklch(0.205 0 0)" },
                        p: {
                          label: "Last year",
                          color: "oklch(0.6 0.118 184.704)",
                        },
                      }}
                      className="w-full h-37.5"
                    >
                      <RechartsAreaChart
                        data={[
                          { m: "Q1", y: 40, p: 34 },
                          { m: "Q2", y: 62, p: 50 },
                          { m: "Q3", y: 55, p: 58 },
                          { m: "Q4", y: 92, p: 78 },
                        ]}
                      >
                        <defs>
                          <linearGradient
                            id="gSeas"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="oklch(0.205 0 0)"
                              stopOpacity="0.25"
                            />
                            <stop
                              offset="100%"
                              stopColor="oklch(0.205 0 0)"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>
                        <XAxis
                          dataKey="m"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 11, fill: "oklch(0.556 0 0)" }}
                        />
                        <ChartTooltip />
                        <Area
                          type="monotone"
                          dataKey="p"
                          stroke="oklch(0.6 0.118 184.704)"
                          strokeWidth={2}
                          strokeDasharray="4 3"
                          fill="none"
                        />
                        <Area
                          type="monotone"
                          dataKey="y"
                          stroke="oklch(0.205 0 0)"
                          strokeWidth={2.5}
                          fill="url(#gSeas)"
                        />
                      </RechartsAreaChart>
                    </ChartContainer>
                    <p className="leading-relaxed text-neutral-500 text-xs leading-4">
                      Q4 shows the strongest seasonal lift, consistent with
                      prior-year festive demand.
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-sm rounded-2xl border-neutral-200 border-0 border-solid p-6 gap-4">
                  <CardHeader className="p-0 gap-1">
                    <span className="font-semibold text-base leading-6 tracking-tight">
                      Category Mix
                    </span>
                    <span className="text-neutral-500 text-xs leading-4">
                      Share of predicted demand
                    </span>
                  </CardHeader>
                  <CardContent className="flex p-0 justify-center items-center gap-2">
                    <ChartContainer
                      config={{
                        grains: { label: "Grains", color: "oklch(0.205 0 0)" },
                        dairy: {
                          label: "Dairy",
                          color: "oklch(0.6 0.118 184.704)",
                        },
                        bev: {
                          label: "Beverages",
                          color: "oklch(0.769 0.188 70.08)",
                        },
                        other: { label: "Other", color: "oklch(0.922 0 0)" },
                      }}
                      className="w-full h-37.5"
                    >
                      <RechartsPieChart>
                        <Pie
                          data={[
                            {
                              name: "Grains",
                              value: 42,
                              fill: "oklch(0.205 0 0)",
                            },
                            {
                              name: "Dairy",
                              value: 24,
                              fill: "oklch(0.6 0.118 184.704)",
                            },
                            {
                              name: "Beverages",
                              value: 20,
                              fill: "oklch(0.769 0.188 70.08)",
                            },
                            {
                              name: "Other",
                              value: 14,
                              fill: "oklch(0.922 0 0)",
                            },
                          ]}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={38}
                          outerRadius={62}
                          paddingAngle={3}
                          strokeWidth={0}
                        />
                        <ChartTooltip />
                      </RechartsPieChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
