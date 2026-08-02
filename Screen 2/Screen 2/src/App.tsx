import { useEffect } from "react";
import {
  BarChart3,
  Bell,
  CheckCircle,
  CheckCircle2,
  ChevronsUpDown,
  Clock,
  CreditCard,
  FileBarChart,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LayoutGrid,
  List,
  Minus,
  Package,
  PanelLeftClose,
  Plus,
  Radar as LucideRadar,
  Search,
  Settings,
  SlidersHorizontal,
  Sparkles,
  Star,
  Tag,
  TrendingUp,
  Truck,
  Warehouse,
  Wheat,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Area, AreaChart as RechartsAreaChart } from "recharts";

export default function App() {
  return (
    <div>
      <div className="bg-[oklch(0.97_0.01_255)] [font-family:'Inter',system-ui,sans-serif] text-neutral-950 flex w-full h-239 overflow-hidden h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <aside className="shrink-0 transition-all bg-neutral-50 border-neutral-200 border-t-0 border-r-1 border-b-0 border-l-0 border-solid flex flex-col h-full">
          <div className="border-neutral-200 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex p-4 items-center gap-2 h-16">
            <div className="size-9 shrink-0 bg-[oklch(0.45_0.16_277)] shadow-sm rounded-xl flex justify-center items-center">
              <LucideRadar className="size-5 text-white" />
            </div>
            <div className="leading-tight flex flex-col">
              <span className="font-bold text-sm leading-5 tracking-tight">
                StockPilot
              </span>
              <span className="text-[oklch(0.45_0.16_277)] font-medium text-[10px] tracking-wide">
                AI INTELLIGENCE
              </span>
            </div>
          </div>
          <nav className="overflow-y-auto flex p-3 flex-col justify-start items-start flex-1 gap-1">
            <button className="transition-colors font-medium rounded-lg text-neutral-950 text-sm leading-5 flex px-3 py-2 items-center gap-3 w-full">
              <LayoutDashboard className="size-[18px] shrink-0 text-neutral-500" />
              <span>Dashboard</span>
            </button>
            <button className="relative bg-[oklch(0.45_0.16_277/0.1)] text-[oklch(0.4_0.16_277)] font-semibold rounded-lg text-sm leading-5 flex px-3 py-2 items-center gap-3 w-full">
              <span className="top-1/2 -translate-y-1/2 bg-[oklch(0.45_0.16_277)] rounded-full absolute left-0 w-1 h-5" />
              <Package className="size-[18px] shrink-0" />
              <span>Inventory Intelligence</span>
            </button>
            <button className="transition-colors font-medium rounded-lg text-neutral-950 text-sm leading-5 flex px-3 py-2 items-center gap-3 w-full">
              <FileText className="size-[18px] shrink-0 text-neutral-500" />
              <span>Invoice Intelligence</span>
            </button>
            <button className="transition-colors font-medium rounded-lg text-neutral-950 text-sm leading-5 flex px-3 py-2 items-center gap-3 w-full">
              <CheckCircle className="size-[18px] shrink-0 text-neutral-500" />
              <span>GST Compliance</span>
            </button>
            <button className="transition-colors font-medium rounded-lg text-neutral-950 text-sm leading-5 flex px-3 py-2 items-center gap-3 w-full">
              <CreditCard className="size-[18px] shrink-0 text-neutral-500" />
              <span>Payments</span>
            </button>
            <button className="transition-colors font-medium rounded-lg text-neutral-950 text-sm leading-5 flex px-3 py-2 items-center gap-3 w-full">
              <TrendingUp className="size-[18px] shrink-0 text-neutral-500" />
              <span>Business Health</span>
            </button>
            <button className="transition-colors font-medium rounded-lg text-neutral-950 text-sm leading-5 flex px-3 py-2 items-center gap-3 w-full">
              <Sparkles className="size-[18px] shrink-0 text-neutral-500" />
              <span>AI Insights</span>
            </button>
            <button className="transition-colors font-medium rounded-lg text-neutral-950 text-sm leading-5 flex px-3 py-2 items-center gap-3 w-full">
              <BarChart3 className="size-[18px] shrink-0 text-neutral-500" />
              <span>Forecast</span>
            </button>
            <button className="transition-colors font-medium rounded-lg text-neutral-950 text-sm leading-5 flex px-3 py-2 items-center gap-3 w-full">
              <FileBarChart className="size-[18px] shrink-0 text-neutral-500" />
              <span>Reports</span>
            </button>
            <div className="bg-neutral-200 my-1 w-full h-px" />
            <button className="transition-colors font-medium rounded-lg text-neutral-950 text-sm leading-5 flex px-3 py-2 items-center gap-3 w-full">
              <Settings className="size-[18px] shrink-0 text-neutral-500" />
              <span>Settings</span>
            </button>
            <button className="transition-colors font-medium rounded-lg text-neutral-950 text-sm leading-5 flex px-3 py-2 items-center gap-3 w-full">
              <HelpCircle className="size-[18px] shrink-0 text-neutral-500" />
              <span>Support</span>
            </button>
          </nav>
          <div className="border-neutral-200 border-t-1 border-r-0 border-b-0 border-l-0 border-solid p-3">
            <button className="transition-colors font-medium rounded-lg text-neutral-500 text-sm leading-5 flex px-3 py-2 items-center gap-3 w-full">
              <PanelLeftClose className="size-[18px] shrink-0 transition-transform" />
              <span>Collapse</span>
            </button>
          </div>
        </aside>
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          <header className="shrink-0 backdrop-blur bg-white/80 border-neutral-200 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-6 items-center gap-4 h-16">
            <div className="relative max-w-md flex-1">
              <Search className="top-1/2 -translate-y-1/2 size-4 text-neutral-500 absolute left-3" />
              <Input
                className="border-transparent rounded-xl bg-neutral-100 pl-9 h-10"
                placeholder="Search products, SKUs, suppliers..."
              />
              <kbd className="top-1/2 -translate-y-1/2 font-medium rounded-sm bg-white text-neutral-500 text-[10px] border-neutral-200 border-1 border-solid absolute right-3 px-1.5 py-0.5">
                ⌘K
              </kbd>
            </div>
            <div className="flex ml-auto items-center gap-2">
              <Button className="bg-[oklch(0.45_0.16_277)] shadow-sm rounded-xl text-white gap-2 h-10">
                <Sparkles className="size-4" />
                AI Assistant
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-xl w-10 h-10"
              >
                <Bell className="size-[18px]" />
                <span className="size-2 bg-[oklch(0.6_0.2_25)] rounded-full absolute right-2 top-2" />
              </Button>
              <Button
                variant="outline"
                className="rounded-xl bg-white gap-2 h-10"
              >
                <span className="size-5 bg-[oklch(0.5_0.12_160)] font-bold rounded-md text-white text-[10px] flex justify-center items-center">
                  S
                </span>
                <span className="font-medium text-sm leading-5">
                  Sharma Traders
                </span>
                <ChevronsUpDown className="size-3.5 text-neutral-500" />
              </Button>
              <div className="size-9 bg-gradient-to-br from-[oklch(0.5_0.15_277)] to-[oklch(0.55_0.12_160)] font-semibold rounded-full text-white text-sm leading-5 flex justify-center items-center">
                RS
              </div>
            </div>
          </header>
          <main className="overflow-y-auto p-8 flex-1">
            <div className="flex mb-6 justify-between items-start">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-2xl leading-8 tracking-tight">
                    Inventory Intelligence
                  </h1>
                  <Badge className="bg-[oklch(0.5_0.12_160/0.12)] text-[oklch(0.42_0.12_160)] border-transparent font-medium rounded-full">
                    Live
                  </Badge>
                </div>
                <p className="text-neutral-500 text-sm leading-5">
                  AI-predicted stock health across 6 products · Updated 4 min
                  ago
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white border-neutral-200 border-1 border-solid flex px-3 py-2 items-center gap-2">
                  <Zap className="size-4 text-[oklch(0.65_0.16_60)]" />
                  <span className="font-medium text-sm leading-5">
                    Auto-reorder
                  </span>
                  <Switch defaultChecked={true} />
                </div>
                <div className="rounded-xl bg-white border-neutral-200 border-1 border-solid flex p-1 items-center">
                  <button className="size-8 transition-colors rounded-lg flex justify-center items-center">
                    <LayoutGrid className="size-4" />
                  </button>
                  <button className="size-8 transition-colors rounded-lg flex justify-center items-center">
                    <List className="size-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex mb-6 flex-wrap items-center gap-3">
              <span className="font-semibold uppercase text-neutral-500 text-xs leading-4 tracking-wide mr-1">
                Filters
              </span>
              <Select defaultValue="all">
                <SelectTrigger className="font-medium rounded-full bg-white text-sm leading-5 border-neutral-200 border-0 border-solid px-4 gap-2 w-auto h-9">
                  <Warehouse className="size-3.5 text-neutral-500" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Warehouses</SelectItem>
                  <SelectItem value="mumbai">Mumbai Central</SelectItem>
                  <SelectItem value="delhi">Delhi Hub</SelectItem>
                  <SelectItem value="pune">Pune Depot</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="font-medium rounded-full bg-white text-sm leading-5 border-neutral-200 border-0 border-solid px-4 gap-2 w-auto h-9">
                  <Tag className="size-3.5 text-neutral-500" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="grains">Grains</SelectItem>
                  <SelectItem value="oils">Oils</SelectItem>
                  <SelectItem value="beverages">Beverages</SelectItem>
                </SelectContent>
              </Select>
              <div className="rounded-full bg-white border-neutral-200 border-1 border-solid flex p-1 items-center">
                <button className="transition-colors font-medium rounded-full text-xs leading-4 px-3.5 py-1.5">
                  All
                </button>
                <button className="transition-colors font-medium rounded-full text-xs leading-4 px-3.5 py-1.5">
                  Critical
                </button>
                <button className="transition-colors font-medium rounded-full text-xs leading-4 px-3.5 py-1.5">
                  Watch
                </button>
                <button className="transition-colors font-medium rounded-full text-xs leading-4 px-3.5 py-1.5">
                  Healthy
                </button>
              </div>
              <Button
                variant="ghost"
                className="rounded-full text-neutral-500 text-sm leading-5 ml-auto gap-2 h-9"
              >
                <SlidersHorizontal className="size-3.5" />
                More filters
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <Card className="shadow-sm transition-all rounded-2xl border-neutral-200 border-0 border-solid p-5 gap-4">
                <CardHeader className="p-0 flex-row justify-between items-start gap-0">
                  <div className="flex items-center gap-3">
                    <div className="size-11 shrink-0 rounded-xl overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1612257416648-ee7a6c533b4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxsZW50aWxzJTIwcHVsc2VzJTIwZGFsJTIwZ3JhaW5zfGVufDF8Mnx8fDE3ODU1MTE2MjF8MA&ixlib=rb-4.1.0&q=80&w=400"
                        alt="Basmati Rice"
                        className="object-cover w-full h-full"
                        data-photoid="BJXiSrrCvA8"
                        data-authorname="Süheyl Burak"
                        data-authorurl="https://unsplash.com/@suheylburak"
                        data-blurhash="LOI4w*JR0MQ.%2M{t7R*0#n4bHkW"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="leading-tight font-semibold text-sm leading-5">
                        Basmati Rice 25kg
                      </span>
                      <Badge
                        variant="secondary"
                        className="font-medium rounded-full text-[10px] mt-1 px-2 w-fit"
                      >
                        Grains
                      </Badge>
                    </div>
                  </div>
                  <button>
                    <Star />
                  </button>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <div className="text-xs leading-4 flex justify-between items-center">
                      <span className="text-neutral-500">Stock level</span>
                      <span className="text-[oklch(0.55_0.2_25)] font-semibold">
                        12%
                      </span>
                    </div>
                    <div className="rounded-full bg-neutral-100 w-full h-2 overflow-hidden">
                      <div className="bg-[oklch(0.6_0.2_25)] w-[12%] rounded-full h-full" />
                    </div>
                  </div>
                  <div className="rounded-xl bg-neutral-100/60 p-3">
                    <div className="flex mb-1 justify-between items-center">
                      <span className="font-medium uppercase text-neutral-500 text-[10px] tracking-wide">
                        14-day forecast
                      </span>
                      <span className="text-[oklch(0.55_0.2_25)] font-semibold text-[10px]">
                        Declining
                      </span>
                    </div>
                    <ChartContainer
                      config={{
                        v: { label: "Stock", color: "oklch(0.6 0.2 25)" },
                      }}
                      className="w-full h-14"
                    >
                      <RechartsAreaChart
                        data={[
                          { d: 1, v: 60 },
                          { d: 2, v: 52 },
                          { d: 3, v: 45 },
                          { d: 4, v: 38 },
                          { d: 5, v: 30 },
                          { d: 6, v: 22 },
                          { d: 7, v: 12 },
                        ]}
                      >
                        <defs>
                          <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="0%"
                              stopColor="oklch(0.6 0.2 25)"
                              stopOpacity="0.35"
                            />
                            <stop
                              offset="100%"
                              stopColor="oklch(0.6 0.2 25)"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="v"
                          stroke="oklch(0.6 0.2 25)"
                          strokeWidth={2}
                          fill="url(#g1)"
                        />
                      </RechartsAreaChart>
                    </ChartContainer>
                  </div>
                  <div className="grid grid-cols-2 text-xs leading-4 gap-2">
                    <div className="rounded-lg bg-neutral-100/50 flex p-2.5 flex-col">
                      <span className="text-neutral-500 text-[10px]">
                        Days remaining
                      </span>
                      <span className="text-[oklch(0.55_0.2_25)] font-bold text-base leading-6">
                        6 days
                      </span>
                    </div>
                    <div className="rounded-lg bg-neutral-100/50 flex p-2.5 flex-col">
                      <span className="text-neutral-500 text-[10px]">
                        Demand
                      </span>
                      <span className="font-semibold text-sm leading-5">
                        High ↑
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl border-neutral-200 border-1 border-solid flex p-2.5 justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-neutral-500 text-[10px]">
                        Suggested reorder
                      </span>
                      <span className="font-semibold text-sm leading-5">
                        400 units
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="size-7 rounded-lg border-neutral-200 border-1 border-solid flex justify-center items-center">
                        <Minus className="size-3.5" />
                      </button>
                      <button className="size-7 rounded-lg border-neutral-200 border-1 border-solid flex justify-center items-center">
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-0 flex-col items-stretch gap-2">
                  <div className="flex justify-between items-center">
                    <div className="text-neutral-500 text-xs leading-4 flex items-center gap-1.5">
                      <Truck className="size-3.5" />
                      Om Agro Mills
                    </div>
                    <Badge className="bg-[oklch(0.6_0.2_25/0.12)] text-[oklch(0.5_0.2_25)] border-transparent font-semibold rounded-full text-[10px]">
                      Critical
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500 text-[10px]">
                      AI Confidence 94%
                    </span>
                    <Button
                      size="sm"
                      className="bg-[oklch(0.45_0.16_277)] rounded-lg text-white text-xs leading-4 h-7"
                    >
                      Reorder
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              <Card className="shadow-sm transition-all rounded-2xl border-neutral-200 border-0 border-solid p-5 gap-4">
                <CardHeader className="p-0 flex-row justify-between items-start gap-0">
                  <div className="flex items-center gap-3">
                    <div className="size-11 shrink-0 rounded-xl overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1678942953384-91aae690abd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwb2lsJTIwYm90dGxlcyUyMHByb2R1Y3R8ZW58MXwyfHx8MTc4NTUxMTYyMXww&ixlib=rb-4.1.0&q=80&w=400"
                        alt="Sunflower Oil"
                        className="object-cover w-full h-full"
                        data-photoid="QWLQ9vgQEDw"
                        data-authorname="Andrey Haimin"
                        data-authorurl="https://unsplash.com/@akb001"
                        data-blurhash="LtM7WHNe~Tx8?wsoX9kXadk9Rjbc"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="leading-tight font-semibold text-sm leading-5">
                        Sunflower Oil 15L
                      </span>
                      <Badge
                        variant="secondary"
                        className="font-medium rounded-full text-[10px] mt-1 px-2 w-fit"
                      >
                        Oils
                      </Badge>
                    </div>
                  </div>
                  <button>
                    <Star />
                  </button>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <div className="text-xs leading-4 flex justify-between items-center">
                      <span className="text-neutral-500">Stock level</span>
                      <span className="text-[oklch(0.55_0.14_60)] font-semibold">
                        38%
                      </span>
                    </div>
                    <div className="rounded-full bg-neutral-100 w-full h-2 overflow-hidden">
                      <div className="bg-[oklch(0.65_0.16_60)] w-[38%] rounded-full h-full" />
                    </div>
                  </div>
                  <div className="rounded-xl bg-neutral-100/60 p-3">
                    <div className="flex mb-1 justify-between items-center">
                      <span className="font-medium uppercase text-neutral-500 text-[10px] tracking-wide">
                        14-day forecast
                      </span>
                      <span className="text-[oklch(0.55_0.14_60)] font-semibold text-[10px]">
                        Stable
                      </span>
                    </div>
                    <ChartContainer
                      config={{
                        v: { label: "Stock", color: "oklch(0.65 0.16 60)" },
                      }}
                      className="w-full h-14"
                    >
                      <RechartsAreaChart
                        data={[
                          { d: 1, v: 50 },
                          { d: 2, v: 48 },
                          { d: 3, v: 46 },
                          { d: 4, v: 43 },
                          { d: 5, v: 41 },
                          { d: 6, v: 40 },
                          { d: 7, v: 38 },
                        ]}
                      >
                        <defs>
                          <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="0%"
                              stopColor="oklch(0.65 0.16 60)"
                              stopOpacity="0.35"
                            />
                            <stop
                              offset="100%"
                              stopColor="oklch(0.65 0.16 60)"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="v"
                          stroke="oklch(0.65 0.16 60)"
                          strokeWidth={2}
                          fill="url(#g2)"
                        />
                      </RechartsAreaChart>
                    </ChartContainer>
                  </div>
                  <div className="grid grid-cols-2 text-xs leading-4 gap-2">
                    <div className="rounded-lg bg-neutral-100/50 flex p-2.5 flex-col">
                      <span className="text-neutral-500 text-[10px]">
                        Days remaining
                      </span>
                      <span className="text-[oklch(0.55_0.14_60)] font-bold text-base leading-6">
                        21 days
                      </span>
                    </div>
                    <div className="rounded-lg bg-neutral-100/50 flex p-2.5 flex-col">
                      <span className="text-neutral-500 text-[10px]">
                        Demand
                      </span>
                      <span className="font-semibold text-sm leading-5">
                        Medium →
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl border-neutral-200 border-1 border-solid flex p-2.5 justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-neutral-500 text-[10px]">
                        Suggested reorder
                      </span>
                      <span className="font-semibold text-sm leading-5">
                        120 units
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="size-7 rounded-lg border-neutral-200 border-1 border-solid flex justify-center items-center">
                        <Minus className="size-3.5" />
                      </button>
                      <button className="size-7 rounded-lg border-neutral-200 border-1 border-solid flex justify-center items-center">
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-0 flex-col items-stretch gap-2">
                  <div className="flex justify-between items-center">
                    <div className="text-neutral-500 text-xs leading-4 flex items-center gap-1.5">
                      <Truck className="size-3.5" />
                      Gokul Edibles
                    </div>
                    <Badge className="bg-[oklch(0.65_0.16_60/0.15)] text-[oklch(0.5_0.14_60)] border-transparent font-semibold rounded-full text-[10px]">
                      Watch
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500 text-[10px]">
                      AI Confidence 88%
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-lg text-xs leading-4 h-7"
                    >
                      Reorder
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              <Card className="shadow-sm transition-all rounded-2xl border-neutral-200 border-0 border-solid p-5 gap-4">
                <CardHeader className="p-0 flex-row justify-between items-start gap-0">
                  <div className="flex items-center gap-3">
                    <div className="size-11 shrink-0 rounded-xl overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1766185387603-f03cb6d658fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHx0ZWElMjBsZWF2ZXMlMjBwcm9kdWN0JTIwcGFja2FnZXxlbnwxfDJ8fHwxNzg1NTExNjIxfDA&ixlib=rb-4.1.0&q=80&w=400"
                        alt="Assam Tea"
                        className="object-cover w-full h-full"
                        data-photoid="b3Xszpkl48A"
                        data-authorname="Stacy"
                        data-authorurl="https://unsplash.com/@stacysuxx"
                        data-blurhash="LeNdaboy_NoLRjj[ofof_4j[i_WB"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="leading-tight font-semibold text-sm leading-5">
                        Assam Tea 5kg
                      </span>
                      <Badge
                        variant="secondary"
                        className="font-medium rounded-full text-[10px] mt-1 px-2 w-fit"
                      >
                        Beverages
                      </Badge>
                    </div>
                  </div>
                  <button>
                    <Star />
                  </button>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <div className="text-xs leading-4 flex justify-between items-center">
                      <span className="text-neutral-500">Stock level</span>
                      <span className="text-[oklch(0.45_0.12_160)] font-semibold">
                        76%
                      </span>
                    </div>
                    <div className="rounded-full bg-neutral-100 w-full h-2 overflow-hidden">
                      <div className="bg-[oklch(0.55_0.12_160)] w-[76%] rounded-full h-full" />
                    </div>
                  </div>
                  <div className="rounded-xl bg-neutral-100/60 p-3">
                    <div className="flex mb-1 justify-between items-center">
                      <span className="font-medium uppercase text-neutral-500 text-[10px] tracking-wide">
                        14-day forecast
                      </span>
                      <span className="text-[oklch(0.45_0.12_160)] font-semibold text-[10px]">
                        Healthy
                      </span>
                    </div>
                    <ChartContainer
                      config={{
                        v: { label: "Stock", color: "oklch(0.55 0.12 160)" },
                      }}
                      className="w-full h-14"
                    >
                      <RechartsAreaChart
                        data={[
                          { d: 1, v: 82 },
                          { d: 2, v: 80 },
                          { d: 3, v: 79 },
                          { d: 4, v: 78 },
                          { d: 5, v: 77 },
                          { d: 6, v: 76 },
                          { d: 7, v: 76 },
                        ]}
                      >
                        <defs>
                          <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="0%"
                              stopColor="oklch(0.55 0.12 160)"
                              stopOpacity="0.35"
                            />
                            <stop
                              offset="100%"
                              stopColor="oklch(0.55 0.12 160)"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="v"
                          stroke="oklch(0.55 0.12 160)"
                          strokeWidth={2}
                          fill="url(#g3)"
                        />
                      </RechartsAreaChart>
                    </ChartContainer>
                  </div>
                  <div className="grid grid-cols-2 text-xs leading-4 gap-2">
                    <div className="rounded-lg bg-neutral-100/50 flex p-2.5 flex-col">
                      <span className="text-neutral-500 text-[10px]">
                        Days remaining
                      </span>
                      <span className="text-[oklch(0.45_0.12_160)] font-bold text-base leading-6">
                        48 days
                      </span>
                    </div>
                    <div className="rounded-lg bg-neutral-100/50 flex p-2.5 flex-col">
                      <span className="text-neutral-500 text-[10px]">
                        Demand
                      </span>
                      <span className="font-semibold text-sm leading-5">
                        Low →
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl border-neutral-200 border-1 border-solid flex p-2.5 justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-neutral-500 text-[10px]">
                        Suggested reorder
                      </span>
                      <span className="font-semibold text-sm leading-5">
                        No action
                      </span>
                    </div>
                    <CheckCircle2 className="size-5 text-[oklch(0.55_0.12_160)]" />
                  </div>
                </CardContent>
                <CardFooter className="p-0 flex-col items-stretch gap-2">
                  <div className="flex justify-between items-center">
                    <div className="text-neutral-500 text-xs leading-4 flex items-center gap-1.5">
                      <Truck className="size-3.5" />
                      Brahmaputra Tea Co
                    </div>
                    <Badge className="bg-[oklch(0.55_0.12_160/0.15)] text-[oklch(0.42_0.12_160)] border-transparent font-semibold rounded-full text-[10px]">
                      Healthy
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500 text-[10px]">
                      AI Confidence 91%
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-lg text-xs leading-4 h-7"
                    >
                      Details
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              <Card className="shadow-sm transition-all rounded-2xl border-neutral-200 border-0 border-solid p-5 gap-4">
                <CardHeader className="p-0 flex-row justify-between items-start gap-0">
                  <div className="flex items-center gap-3">
                    <div className="size-11 shrink-0 rounded-xl overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1781243680806-51150561d833?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxzdWdhciUyMHdoaXRlJTIwcHJvZHVjdCUyMHBhY2thZ2luZ3xlbnwxfDJ8fHwxNzg1NTExNjIwfDA&ixlib=rb-4.1.0&q=80&w=400"
                        alt="Sugar"
                        className="object-cover w-full h-full"
                        data-photoid="8SMdMWy4ydU"
                        data-authorname="Pop & Zebra"
                        data-authorurl="https://unsplash.com/@popandzebra"
                        data-blurhash="LBN^Vj?H$+M{-;rrR5X8_NNGx]oL"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="leading-tight font-semibold text-sm leading-5">
                        Refined Sugar 50kg
                      </span>
                      <Badge
                        variant="secondary"
                        className="font-medium rounded-full text-[10px] mt-1 px-2 w-fit"
                      >
                        Grains
                      </Badge>
                    </div>
                  </div>
                  <button>
                    <Star />
                  </button>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <div className="text-xs leading-4 flex justify-between items-center">
                      <span className="text-neutral-500">Stock level</span>
                      <span className="text-[oklch(0.55_0.2_25)] font-semibold">
                        18%
                      </span>
                    </div>
                    <div className="rounded-full bg-neutral-100 w-full h-2 overflow-hidden">
                      <div className="bg-[oklch(0.6_0.2_25)] w-[18%] rounded-full h-full" />
                    </div>
                  </div>
                  <div className="rounded-xl bg-neutral-100/60 p-3">
                    <div className="flex mb-1 justify-between items-center">
                      <span className="font-medium uppercase text-neutral-500 text-[10px] tracking-wide">
                        14-day forecast
                      </span>
                      <span className="text-[oklch(0.55_0.2_25)] font-semibold text-[10px]">
                        Declining
                      </span>
                    </div>
                    <ChartContainer
                      config={{
                        v: { label: "Stock", color: "oklch(0.6 0.2 25)" },
                      }}
                      className="w-full h-14"
                    >
                      <RechartsAreaChart
                        data={[
                          { d: 1, v: 55 },
                          { d: 2, v: 48 },
                          { d: 3, v: 42 },
                          { d: 4, v: 35 },
                          { d: 5, v: 28 },
                          { d: 6, v: 22 },
                          { d: 7, v: 18 },
                        ]}
                      >
                        <defs>
                          <linearGradient id="g4" x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="0%"
                              stopColor="oklch(0.6 0.2 25)"
                              stopOpacity="0.35"
                            />
                            <stop
                              offset="100%"
                              stopColor="oklch(0.6 0.2 25)"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="v"
                          stroke="oklch(0.6 0.2 25)"
                          strokeWidth={2}
                          fill="url(#g4)"
                        />
                      </RechartsAreaChart>
                    </ChartContainer>
                  </div>
                  <div className="grid grid-cols-2 text-xs leading-4 gap-2">
                    <div className="rounded-lg bg-neutral-100/50 flex p-2.5 flex-col">
                      <span className="text-neutral-500 text-[10px]">
                        Days remaining
                      </span>
                      <span className="text-[oklch(0.55_0.2_25)] font-bold text-base leading-6">
                        9 days
                      </span>
                    </div>
                    <div className="rounded-lg bg-neutral-100/50 flex p-2.5 flex-col">
                      <span className="text-neutral-500 text-[10px]">
                        Demand
                      </span>
                      <span className="font-semibold text-sm leading-5">
                        High ↑
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl border-neutral-200 border-1 border-solid flex p-2.5 justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-neutral-500 text-[10px]">
                        Suggested reorder
                      </span>
                      <span className="font-semibold text-sm leading-5">
                        60 units
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="size-7 rounded-lg border-neutral-200 border-1 border-solid flex justify-center items-center">
                        <Minus className="size-3.5" />
                      </button>
                      <button className="size-7 rounded-lg border-neutral-200 border-1 border-solid flex justify-center items-center">
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-0 flex-col items-stretch gap-2">
                  <div className="flex justify-between items-center">
                    <div className="text-neutral-500 text-xs leading-4 flex items-center gap-1.5">
                      <Truck className="size-3.5" />
                      Shree Sugars Ltd
                    </div>
                    <Badge className="bg-[oklch(0.6_0.2_25/0.12)] text-[oklch(0.5_0.2_25)] border-transparent font-semibold rounded-full text-[10px]">
                      Critical
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500 text-[10px]">
                      AI Confidence 89%
                    </span>
                    <Button
                      size="sm"
                      className="bg-[oklch(0.45_0.16_277)] rounded-lg text-white text-xs leading-4 h-7"
                    >
                      Reorder
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              <Card className="shadow-sm transition-all rounded-2xl border-neutral-200 border-0 border-solid p-5 gap-4">
                <CardHeader className="p-0 flex-row justify-between items-start gap-0">
                  <div className="flex items-center gap-3">
                    <div className="size-11 bg-[oklch(0.5_0.12_160/0.12)] shrink-0 rounded-xl flex justify-center items-center">
                      <Wheat className="size-5 text-[oklch(0.45_0.12_160)]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="leading-tight font-semibold text-sm leading-5">
                        Wheat Flour 10kg
                      </span>
                      <Badge
                        variant="secondary"
                        className="font-medium rounded-full text-[10px] mt-1 px-2 w-fit"
                      >
                        Grains
                      </Badge>
                    </div>
                  </div>
                  <button>
                    <Star />
                  </button>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <div className="text-xs leading-4 flex justify-between items-center">
                      <span className="text-neutral-500">Stock level</span>
                      <span className="text-[oklch(0.55_0.14_60)] font-semibold">
                        44%
                      </span>
                    </div>
                    <div className="rounded-full bg-neutral-100 w-full h-2 overflow-hidden">
                      <div className="bg-[oklch(0.65_0.16_60)] w-[44%] rounded-full h-full" />
                    </div>
                  </div>
                  <div className="rounded-xl bg-neutral-100/60 p-3">
                    <div className="flex mb-1 justify-between items-center">
                      <span className="font-medium uppercase text-neutral-500 text-[10px] tracking-wide">
                        14-day forecast
                      </span>
                      <span className="text-[oklch(0.55_0.14_60)] font-semibold text-[10px]">
                        Moderate
                      </span>
                    </div>
                    <ChartContainer
                      config={{
                        v: { label: "Stock", color: "oklch(0.65 0.16 60)" },
                      }}
                      className="w-full h-14"
                    >
                      <RechartsAreaChart
                        data={[
                          { d: 1, v: 62 },
                          { d: 2, v: 58 },
                          { d: 3, v: 55 },
                          { d: 4, v: 51 },
                          { d: 5, v: 48 },
                          { d: 6, v: 46 },
                          { d: 7, v: 44 },
                        ]}
                      >
                        <defs>
                          <linearGradient id="g5" x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="0%"
                              stopColor="oklch(0.65 0.16 60)"
                              stopOpacity="0.35"
                            />
                            <stop
                              offset="100%"
                              stopColor="oklch(0.65 0.16 60)"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="v"
                          stroke="oklch(0.65 0.16 60)"
                          strokeWidth={2}
                          fill="url(#g5)"
                        />
                      </RechartsAreaChart>
                    </ChartContainer>
                  </div>
                  <div className="grid grid-cols-2 text-xs leading-4 gap-2">
                    <div className="rounded-lg bg-neutral-100/50 flex p-2.5 flex-col">
                      <span className="text-neutral-500 text-[10px]">
                        Days remaining
                      </span>
                      <span className="text-[oklch(0.55_0.14_60)] font-bold text-base leading-6">
                        27 days
                      </span>
                    </div>
                    <div className="rounded-lg bg-neutral-100/50 flex p-2.5 flex-col">
                      <span className="text-neutral-500 text-[10px]">
                        Demand
                      </span>
                      <span className="font-semibold text-sm leading-5">
                        Medium →
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl border-neutral-200 border-1 border-solid flex p-2.5 justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-neutral-500 text-[10px]">
                        Suggested reorder
                      </span>
                      <span className="font-semibold text-sm leading-5">
                        80 units
                      </span>
                    </div>
                    <Clock className="size-5 text-[oklch(0.65_0.16_60)]" />
                  </div>
                </CardContent>
                <CardFooter className="p-0 flex-col items-stretch gap-2">
                  <div className="flex justify-between items-center">
                    <div className="text-neutral-500 text-xs leading-4 flex items-center gap-1.5">
                      <Truck className="size-3.5" />
                      Annapurna Foods
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
