import { useState } from "react";
import Papa from "papaparse";
import {
  Search, Bell, MessageSquare, Settings, Sun, Moon, Menu, X,
  LayoutDashboard, TrendingUp, TrendingDown, Package, Users, CreditCard,
  DollarSign, BarChart3, FileText, Upload, Sparkles, HelpCircle, LogOut,
  ChevronLeft, ChevronRight, ChevronDown, Eye, EyeOff, Mail, Lock,
  ArrowRight, CheckCircle2, AlertTriangle, ShoppingCart, Boxes, PackageX,
  PackageCheck, Star, Calendar, Filter, Download, Plus, ArrowUpRight,
  ArrowDownRight, Building2, Shield, Zap, Globe, Award, PlayCircle,
  UploadCloud, FileSpreadsheet, RefreshCw, ClipboardList, Home, Activity,
  Stethoscope, Truck, PieChart as PieIcon, Clock, Quote, Bot, Send, Percent,
  Copy, Database, Layers, Gauge, Wallet, MapPin, Info
} from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, AreaChart, Area, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts";

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

const fmt = (n) => "$" + n.toLocaleString("en-US");
const fmtK = (n) => (n >= 1000 ? (n / 1000).toFixed(1) + "K" : n);

const revenueTrend = [
  { m: "Jan", revenue: 182000, target: 175000 },
  { m: "Feb", revenue: 194000, target: 180000 },
  { m: "Mar", revenue: 201000, target: 190000 },
  { m: "Apr", revenue: 187000, target: 195000 },
  { m: "May", revenue: 215000, target: 200000 },
  { m: "Jun", revenue: 228000, target: 205000 },
  { m: "Jul", revenue: 241000, target: 210000 },
  { m: "Aug", revenue: 233000, target: 215000 },
  { m: "Sep", revenue: 252000, target: 220000 },
  { m: "Oct", revenue: 268000, target: 230000 },
  { m: "Nov", revenue: 279000, target: 240000 },
  { m: "Dec", revenue: 612000, target: 250000 },
];

const monthlyOrders = [
  { m: "Jan", orders: 820 }, { m: "Feb", orders: 902 }, { m: "Mar", orders: 940 },
  { m: "Apr", orders: 870 }, { m: "May", orders: 1010 }, { m: "Jun", orders: 1080 },
  { m: "Jul", orders: 1145 }, { m: "Aug", orders: 1090 }, { m: "Sep", orders: 1190 },
  { m: "Oct", orders: 1240 }, { m: "Nov", orders: 1265 }, { m: "Dec", orders: 1284 },
];

const topProducts = [
  { name: "Surgical N95 Masks", revenue: 84200 },
  { name: "Digital BP Monitor", revenue: 71300 },
  { name: "IV Cannula Set", revenue: 63900 },
  { name: "Pulse Oximeter", revenue: 58100 },
  { name: "Nitrile Exam Gloves", revenue: 52700 },
  { name: "Infusion Pump", revenue: 47600 },
];

const salesByCategory = [
  { name: "PPE & Consumables", value: 34 },
  { name: "Diagnostic Devices", value: 27 },
  { name: "Surgical Equipment", value: 19 },
  { name: "Pharma Supplies", value: 12 },
  { name: "Mobility Aids", value: 8 },
];

const stockStatus = [
  { name: "In Stock", value: 68 },
  { name: "Low Stock", value: 17 },
  { name: "Out of Stock", value: 6 },
  { name: "Overstock", value: 9 },
];

const demandTrend = [
  { m: "Feb", actual: 940, forecast: 900 }, { m: "Mar", actual: 1010, forecast: 980 },
  { m: "Apr", actual: 970, forecast: 1000 }, { m: "May", actual: 1080, forecast: 1040 },
  { m: "Jun", actual: 1150, forecast: 1110 }, { m: "Jul", actual: 1190, forecast: 1170 },
  { m: "Aug", actual: null, forecast: 1230 }, { m: "Sep", actual: null, forecast: 1290 },
];

const recentTransactions = [
  { id: "TXN-8841", customer: "St. Xavier General Hospital", product: "Digital BP Monitor x40", amount: 12800, status: "Paid", date: "Jul 28" },
  { id: "TXN-8840", customer: "MedCore Diagnostics Pvt Ltd", product: "IV Cannula Set x500", amount: 9450, status: "Pending", date: "Jul 28" },
  { id: "TXN-8839", customer: "Sunrise Multispeciality Clinic", product: "Surgical N95 x2000", amount: 21200, status: "Paid", date: "Jul 27" },
  { id: "TXN-8838", customer: "Apex Wellness Pharmacy", product: "Pulse Oximeter x120", amount: 6300, status: "Overdue", date: "Jul 26" },
  { id: "TXN-8837", customer: "Greenfield Care Home", product: "Nitrile Gloves x300 bx", amount: 4100, status: "Paid", date: "Jul 26" },
];

const lowStockProducts = [
  { name: "Infusion Pump", sku: "INF-2201", stock: 6, reorder: 20, status: "Critical" },
  { name: "Pulse Oximeter", sku: "OXI-1140", stock: 14, reorder: 30, status: "Low" },
  { name: "Surgical Sutures", sku: "SUT-0087", stock: 22, reorder: 50, status: "Low" },
  { name: "Digital Thermometer", sku: "THM-3305", stock: 9, reorder: 25, status: "Critical" },
];

const topCustomers = [
  { name: "St. Xavier General Hospital", orders: 142, revenue: 284000, tier: "Platinum" },
  { name: "MedCore Diagnostics Pvt Ltd", orders: 118, revenue: 219500, tier: "Gold" },
  { name: "Sunrise Multispeciality Clinic", orders: 96, revenue: 176200, tier: "Gold" },
  { name: "Apex Wellness Pharmacy", orders: 74, revenue: 121800, tier: "Silver" },
];

const dailySales = Array.from({ length: 14 }).map((_, i) => ({
  d: `D${i + 1}`,
  sales: 28000 + Math.round(Math.sin(i / 2) * 6000 + i * 900),
}));

const revenueByRegion = [
  { name: "North", value: 186000 }, { name: "South", value: 214000 },
  { name: "East", value: 142000 }, { name: "West", value: 176000 },
  { name: "Central", value: 98000 },
];

const salesHistory = [
  { id: "SO-5521", date: "Jul 28", customer: "St. Xavier General Hospital", category: "Diagnostic Devices", product: "Digital BP Monitor", amount: 12800, status: "Paid" },
  { id: "SO-5520", date: "Jul 28", customer: "MedCore Diagnostics", category: "PPE & Consumables", product: "IV Cannula Set", amount: 9450, status: "Pending" },
  { id: "SO-5519", date: "Jul 27", customer: "Sunrise Clinic", category: "PPE & Consumables", product: "Surgical N95", amount: 21200, status: "Paid" },
  { id: "SO-5518", date: "Jul 26", customer: "Apex Wellness", category: "Diagnostic Devices", product: "Pulse Oximeter", amount: 6300, status: "Overdue" },
  { id: "SO-5517", date: "Jul 25", customer: "Greenfield Care Home", category: "PPE & Consumables", product: "Nitrile Gloves", amount: 4100, status: "Paid" },
  { id: "SO-5516", date: "Jul 25", customer: "Metro Surgical Center", category: "Surgical Equipment", product: "Infusion Pump", amount: 15600, status: "Paid" },
];

const inventoryDistribution = [
  { name: "PPE & Consumables", value: 320000 }, { name: "Diagnostic Devices", value: 540000 },
  { name: "Surgical Equipment", value: 610000 }, { name: "Pharma Supplies", value: 210000 },
  { name: "Mobility Aids", value: 120000 },
];

const stockMovement = [
  { m: "Feb", in: 4200, out: 3800 }, { m: "Mar", in: 4600, out: 4100 },
  { m: "Apr", in: 3900, out: 4300 }, { m: "May", in: 5200, out: 4700 },
  { m: "Jun", in: 5600, out: 5100 }, { m: "Jul", in: 5100, out: 5400 },
];

const inventoryList = [
  { name: "Digital BP Monitor", sku: "BPM-1042", category: "Diagnostic Devices", stock: 240, value: 71300, status: "In Stock" },
  { name: "IV Cannula Set", sku: "IVC-3390", category: "PPE & Consumables", stock: 58, value: 63900, status: "Low Stock" },
  { name: "Infusion Pump", sku: "INF-2201", category: "Surgical Equipment", stock: 6, value: 47600, status: "Critical" },
  { name: "Nitrile Exam Gloves", sku: "GLV-0021", category: "PPE & Consumables", stock: 1240, value: 52700, status: "Overstock" },
  { name: "Pulse Oximeter", sku: "OXI-1140", category: "Diagnostic Devices", stock: 14, value: 58100, status: "Low Stock" },
];

const reorderList = [
  { name: "Infusion Pump", current: 6, reorder: 20, suggested: 40 },
  { name: "Digital Thermometer", current: 9, reorder: 25, suggested: 60 },
  { name: "Pulse Oximeter", current: 14, reorder: 30, suggested: 50 },
  { name: "Surgical Sutures", current: 22, reorder: 50, suggested: 80 },
];

const PIE_COLORS = ["#2563EB", "#16A34A", "#F59E0B", "#DC2626", "#64748B"];

/* ------------------------------------------------------------------ */
/*  BACKEND-READY DATA LAYER                                          */
/*  Every object below is shaped like the JSON a Django + Pandas      */
/*  endpoint would return. Going live means fetching each one from    */
/*  its noted route and passing the result into the same components — */
/*  no component needs to change shape, only where its data comes from.*/
/* ------------------------------------------------------------------ */

// TODO(API): GET /api/dashboard/kpis/
const EXEC_KPIS = {
  totalSales: { label: "Total Sales", value: 2438500, kind: "currency", delta: 12.4, up: true, icon: DollarSign, color: "blue" },
  inventoryValue: { label: "Inventory Value", value: 1804200, kind: "currency", delta: -1.3, up: false, icon: Boxes, color: "amber" },
  lowStockProducts: { label: "Low Stock Products", value: 23, kind: "count", delta: 5, deltaIsCount: true, up: false, icon: AlertTriangle, color: "red" },
  outstandingPayments: { label: "Outstanding Payments", value: 86400, kind: "currency", delta: 9.5, up: false, icon: Wallet, color: "red" },
  todaysOrders: { label: "Today's Orders", value: 58, kind: "count", delta: 4.1, up: true, icon: ShoppingCart, color: "blue" },
  activeCustomers: { label: "Active Customers", value: 342, kind: "count", delta: 2.8, up: true, icon: Users, color: "green" },
  profitMargin: { label: "Profit Margin", value: 24.6, kind: "percent", delta: 1.1, up: true, icon: Percent, color: "green" },
};

// TODO(API): GET /api/uploads/ — most recent import status per dataset
const UPLOAD_DATASETS = [
  { key: "sales", label: "Sales", description: "Order-level sales transactions", icon: TrendingUp, lastUpload: "Jul 28, 2026", rows: 1284, status: "synced" },
  { key: "inventory", label: "Inventory", description: "Stock levels & warehouse counts", icon: Boxes, lastUpload: "Jul 26, 2026", rows: 412, status: "synced" },
  { key: "customers", label: "Customers", description: "Accounts, hospitals & clinics", icon: Users, lastUpload: "Jul 20, 2026", rows: 342, status: "stale" },
  { key: "payments", label: "Payments", description: "Invoices & collections", icon: CreditCard, lastUpload: null, rows: 0, status: "missing" },
];

// TODO(API): GET /api/data-quality/?dataset=<key> — df.info()-style summary,
// returned right after Django finishes processing an uploaded CSV.
// Used here as a fallback for datasets the user hasn't re-uploaded this session;
// once a file is dropped in, computeDataQuality() below produces the live version.
const DATA_QUALITY_FALLBACK = {
  sales: { healthScore: 94, missingValues: 12, duplicateRows: 3, totalRecords: 1284, totalColumns: 9, memoryUsageKb: 186 },
  inventory: { healthScore: 88, missingValues: 26, duplicateRows: 1, totalRecords: 412, totalColumns: 7, memoryUsageKb: 64 },
  customers: { healthScore: 91, missingValues: 8, duplicateRows: 0, totalRecords: 342, totalColumns: 11, memoryUsageKb: 58 },
  payments: { healthScore: null, missingValues: null, duplicateRows: null, totalRecords: 0, totalColumns: 0, memoryUsageKb: 0 },
};

// TODO(API): GET /api/stats/summary/?metric=<key> — pandas .describe() output
const STAT_METRICS = [
  { key: "orderAmount", label: "Order Amount", kind: "currency", mean: 1898.4, median: 1620, max: 21200, min: 210, stdDev: 1342.7 },
  { key: "stockLevel", label: "Stock Level (units)", kind: "count", mean: 214.6, median: 96, max: 1240, min: 6, stdDev: 268.1 },
  { key: "paymentAmount", label: "Payment Amount", kind: "currency", mean: 3420.8, median: 2100, max: 21200, min: 850, stdDev: 4210.3 },
];

// TODO(API): GET /api/alerts/ — server-generated from live threshold rules
const SMART_ALERTS = [
  { id: 1, severity: "critical", icon: AlertTriangle, text: "Infusion Pump stock fell below reorder level", time: "12m ago" },
  { id: 2, severity: "warning", icon: Boxes, text: "Inventory dataset missing-value rate above 5%", time: "1h ago" },
  { id: 3, severity: "warning", icon: CreditCard, text: "4 customer invoices are now overdue", time: "2h ago" },
  { id: 4, severity: "critical", icon: TrendingDown, text: "Regional sales in East dropped 9% week over week", time: "5h ago" },
  { id: 5, severity: "info", icon: UploadCloud, text: "Sales CSV import completed — 1,284 rows processed", time: "1d ago" },
];

// TODO(API): GET /api/charts/payment-collection/
const paymentCollection = [
  { m: "Feb", collected: 168000, pending: 24000 }, { m: "Mar", collected: 181000, pending: 28000 },
  { m: "Apr", collected: 174000, pending: 31000 }, { m: "May", collected: 196000, pending: 26000 },
  { m: "Jun", collected: 212000, pending: 33000 }, { m: "Jul", collected: 227000, pending: 30000 },
];

// TODO(API): GET /api/charts/low-stock-trend/
const lowStockTrend = [
  { m: "Feb", count: 11 }, { m: "Mar", count: 14 }, { m: "Apr", count: 13 },
  { m: "May", count: 17 }, { m: "Jun", count: 19 }, { m: "Jul", count: 23 },
];

// Client-side approximation of what Django + Pandas will return for a freshly
// uploaded file (df.shape, df.isna().sum(), duplicated().sum(), memory_usage()).
// TODO(API): once live, replace this call with the response from
// POST /api/uploads/<dataset>/ instead of computing it in the browser.
function computeDataQuality(allRows, columns) {
  const totalRecords = allRows.length;
  const totalColumns = columns.length;
  let missingValues = 0;
  allRows.forEach((row) => {
    columns.forEach((c) => {
      const v = row[c];
      if (v === undefined || v === null || String(v).trim() === "") missingValues++;
    });
  });
  const seen = new Set();
  let duplicateRows = 0;
  allRows.forEach((row) => {
    const key = JSON.stringify(row);
    if (seen.has(key)) duplicateRows++; else seen.add(key);
  });
  const totalCells = Math.max(totalRecords * totalColumns, 1);
  const missingRate = missingValues / totalCells;
  const dupRate = totalRecords ? duplicateRows / totalRecords : 0;
  const healthScore = Math.max(0, Math.min(100, Math.round(100 - missingRate * 150 - dupRate * 150)));
  const memoryUsageKb = Math.max(1, Math.round(JSON.stringify(allRows).length / 1024));
  return { healthScore, missingValues, duplicateRows, totalRecords, totalColumns, memoryUsageKb };
}

const fmtCurrency0 = (n) => fmt(Math.round(n));
const fmtStat = (v, kind) => (kind === "currency" ? fmt(Math.round(v)) : kind === "percent" ? `${v}%` : v.toLocaleString("en-US"));

const NAV_ITEMS = [
  { key: "home", label: "Dashboard", icon: LayoutDashboard },
  { key: "upload", label: "Upload Center", icon: UploadCloud },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
  { key: "inventory", label: "Inventory", icon: Boxes },
  { key: "customers", label: "Customers", icon: Users },
  { key: "payments", label: "Payments", icon: CreditCard },
  { key: "forecasting", label: "Forecasting", icon: Activity },
  { key: "ai", label: "AI Assistant", icon: Bot },
];
const NAV_FOOTER = [
  { key: "settings", label: "Settings", icon: Settings },
  { key: "help", label: "Help", icon: HelpCircle },
];

// Converts an EXEC_KPIS entry into the {label, value, delta, up, icon, color}
// shape KpiCard expects — keeps KpiCard itself dumb and reusable.
const kpiCardItem = (k) => ({
  label: k.label,
  value: k.kind === "currency" ? fmt(k.value) : k.kind === "percent" ? `${k.value}%` : k.value.toLocaleString("en-US"),
  delta: `${k.delta > 0 ? "+" : ""}${k.delta}${k.deltaIsCount ? "" : "%"}`,
  up: k.up,
  icon: k.icon,
  color: k.color,
});

const PRIMARY_KPIS = ["totalSales", "inventoryValue", "lowStockProducts", "outstandingPayments"].map((k) => kpiCardItem(EXEC_KPIS[k]));
const SECONDARY_KPIS = ["todaysOrders", "activeCustomers", "profitMargin"].map((k) => kpiCardItem(EXEC_KPIS[k]));

const colorMap = {
  blue: { bg: "bg-blue-50", text: "text-blue-600" },
  green: { bg: "bg-green-50", text: "text-green-600" },
  amber: { bg: "bg-amber-50", text: "text-amber-600" },
  red: { bg: "bg-red-50", text: "text-red-600" },
};

const statusStyle = (s) => {
  const map = {
    Paid: "bg-green-50 text-green-700 border-green-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Overdue: "bg-red-50 text-red-700 border-red-200",
    Critical: "bg-red-50 text-red-700 border-red-200",
    Low: "bg-amber-50 text-amber-700 border-amber-200",
    "Low Stock": "bg-amber-50 text-amber-700 border-amber-200",
    "In Stock": "bg-green-50 text-green-700 border-green-200",
    Overstock: "bg-blue-50 text-blue-700 border-blue-200",
  };
  return map[s] || "bg-slate-100 text-slate-600 border-slate-200";
};

/* ------------------------------------------------------------------ */
/*  SHARED UI PIECES                                                   */
/* ------------------------------------------------------------------ */

function KpiCard({ item, dark }) {
  const c = colorMap[item.color];
  const Icon = item.icon;
  return (
    <div className={`rounded-2xl border p-5 shadow-sm hover:shadow-md transition-shadow ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
      <div className="flex items-start justify-between">
        <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${c.bg}`}>
          <Icon className={`h-5 w-5 ${c.text}`} />
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${item.up ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {item.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {item.delta}
        </span>
      </div>
      <p className={`mt-4 text-2xl font-semibold tracking-tight ${dark ? "text-white" : "text-slate-800"}`}>{item.value}</p>
      <p className={`text-sm mt-1 ${dark ? "text-slate-400" : "text-slate-500"}`}>{item.label}</p>
    </div>
  );
}

function Panel({ title, subtitle, children, dark, right }) {
  return (
    <div className={`rounded-2xl border shadow-sm p-5 ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={`font-semibold ${dark ? "text-white" : "text-slate-800"}`}>{title}</h3>
          {subtitle && <p className={`text-xs mt-0.5 ${dark ? "text-slate-400" : "text-slate-500"}`}>{subtitle}</p>}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

function ComingSoon({ icon: Icon, title, description, bullets, dark }) {
  return (
    <div className={`rounded-2xl border shadow-sm p-10 flex flex-col items-center text-center max-w-2xl mx-auto mt-8 ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
      <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
        <Icon className="h-7 w-7 text-blue-600" />
      </div>
      <span className="text-xs font-semibold tracking-wide uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3">Phase 2 — In Progress</span>
      <h3 className={`text-lg font-semibold ${dark ? "text-white" : "text-slate-800"}`}>{title}</h3>
      <p className={`mt-2 text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>{description}</p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left w-full">
        {bullets.map((b) => (
          <div key={b} className={`flex items-start gap-2 text-sm rounded-xl px-3 py-2 ${dark ? "bg-slate-700/50 text-slate-300" : "bg-slate-50 text-slate-600"}`}>
            <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
            {b}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScoreRing({ score, dark }) {
  const color = score == null ? "#94A3B8" : score >= 90 ? "#16A34A" : score >= 75 ? "#F59E0B" : "#DC2626";
  const pct = score == null ? 0 : score;
  const r = 30, c = 2 * Math.PI * r;
  return (
    <div className="relative h-20 w-20 shrink-0">
      <svg viewBox="0 0 72 72" className="h-20 w-20 -rotate-90">
        <circle cx="36" cy="36" r={r} fill="none" stroke={dark ? "#334155" : "#E2E8F0"} strokeWidth="7" />
        <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="7" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-sm font-bold ${dark ? "text-white" : "text-slate-800"}`}>{score == null ? "—" : score}</span>
      </div>
    </div>
  );
}

function DataQualityCard({ quality, datasetLabel, dark }) {
  const textMain = dark ? "text-white" : "text-slate-800";
  const textSub = dark ? "text-slate-400" : "text-slate-500";
  const tileBg = dark ? "bg-slate-700/50" : "bg-slate-50";
  const empty = quality.totalRecords === 0;

  const tiles = [
    { label: "Missing Values", value: empty ? "—" : quality.missingValues.toLocaleString("en-US"), icon: AlertTriangle },
    { label: "Duplicate Rows", value: empty ? "—" : quality.duplicateRows.toLocaleString("en-US"), icon: Copy },
    { label: "Total Records", value: empty ? "—" : quality.totalRecords.toLocaleString("en-US"), icon: Database },
    { label: "Total Columns", value: empty ? "—" : quality.totalColumns.toLocaleString("en-US"), icon: Layers },
  ];

  return (
    <div className={`rounded-2xl border shadow-sm p-5 ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={`font-semibold ${textMain}`}>Data Quality</h3>
          <p className={`text-xs mt-0.5 ${textSub}`}>{datasetLabel} dataset · calculated by the backend on upload</p>
        </div>
        <Gauge className={`h-4 w-4 ${textSub}`} />
      </div>
      <div className="flex items-center gap-5">
        <ScoreRing score={quality.healthScore} dark={dark} />
        <div className="grid grid-cols-2 gap-2.5 flex-1">
          {tiles.map((t) => (
            <div key={t.label} className={`rounded-xl px-3 py-2 ${tileBg}`}>
              <div className="flex items-center gap-1.5">
                <t.icon className={`h-3.5 w-3.5 ${textSub}`} />
                <span className={`text-[11px] ${textSub}`}>{t.label}</span>
              </div>
              <p className={`text-sm font-semibold mt-0.5 ${textMain}`}>{t.value}</p>
            </div>
          ))}
        </div>
      </div>
      {empty ? (
        <p className={`text-xs mt-4 ${textSub}`}>No file uploaded yet for this dataset — upload a CSV to see live quality metrics.</p>
      ) : (
        <p className={`text-xs mt-4 ${textSub}`}>Memory usage ≈ {quality.memoryUsageKb.toLocaleString("en-US")} KB</p>
      )}
    </div>
  );
}

const alertStyles = {
  critical: { dot: "bg-red-500", chip: "bg-red-50 text-red-600" },
  warning: { dot: "bg-amber-500", chip: "bg-amber-50 text-amber-600" },
  info: { dot: "bg-blue-500", chip: "bg-blue-50 text-blue-600" },
};

function AlertsPanel({ dark }) {
  const textMain = dark ? "text-white" : "text-slate-800";
  const textSub = dark ? "text-slate-400" : "text-slate-500";
  return (
    <Panel title="Smart Alerts" subtitle="Live thresholds across every dataset" dark={dark}>
      <div className="space-y-3">
        {SMART_ALERTS.map((a) => {
          const s = alertStyles[a.severity];
          return (
            <div key={a.id} className="flex items-start gap-3">
              <span className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${s.chip}`}>
                <a.icon className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0">
                <p className={`text-sm leading-snug ${textMain}`}>{a.text}</p>
                <p className={`text-xs mt-0.5 ${textSub}`}>{a.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

function StatisticsPanel({ dark }) {
  const [metricKey, setMetricKey] = useState(STAT_METRICS[0].key);
  const metric = STAT_METRICS.find((m) => m.key === metricKey);
  const textMain = dark ? "text-white" : "text-slate-800";
  const textSub = dark ? "text-slate-400" : "text-slate-500";
  const rows = [
    { label: "Mean", value: metric.mean },
    { label: "Median", value: metric.median },
    { label: "Maximum", value: metric.max },
    { label: "Minimum", value: metric.min },
    { label: "Std. Deviation", value: metric.stdDev },
  ];
  return (
    <Panel
      title="Statistics"
      subtitle="Summary computed by the backend for the selected metric"
      dark={dark}
      right={
        <select value={metricKey} onChange={(e) => setMetricKey(e.target.value)} className={`text-xs rounded-lg border px-2.5 py-1.5 ${dark ? "bg-slate-700 border-slate-600 text-slate-200" : "bg-white border-slate-200 text-slate-600"}`}>
          {STAT_METRICS.map((m) => <option key={m.key} value={m.key}>{m.label}</option>)}
        </select>
      }
    >
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {rows.map((r) => (
          <div key={r.label} className={`rounded-xl border p-3 ${dark ? "bg-slate-700/40 border-slate-700" : "bg-slate-50 border-slate-100"}`}>
            <p className={`text-[11px] ${textSub}`}>{r.label}</p>
            <p className={`text-sm font-semibold mt-1 ${textMain}`}>{fmtStat(r.value, metric.kind)}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/*  LANDING PAGE                                                       */
/* ------------------------------------------------------------------ */

function LandingPage({ onLogin }) {
  const [faqOpen, setFaqOpen] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const features = [
    { icon: BarChart3, title: "Real-time sales analytics", desc: "Track revenue, orders, and growth across every branch, product line, and region — updated live." },
    { icon: Boxes, title: "Smart inventory control", desc: "Get ahead of stockouts with automated low-stock alerts and reorder recommendations." },
    { icon: Activity, title: "AI demand forecasting", desc: "Predict next month's demand with seasonal-aware forecasting built for medical supply cycles." },
    { icon: Users, title: "360° customer intelligence", desc: "See purchase history, payment health, and loyalty tier for every hospital and clinic you serve." },
    { icon: CreditCard, title: "Payment & collections tracking", desc: "Monitor outstanding balances and overdue invoices before they become a cash-flow problem." },
    { icon: Upload, title: "One-click CSV import", desc: "Drag in your existing spreadsheets and get a validated, analytics-ready dataset in seconds." },
  ];

  const stats = [
    { value: "500+", label: "Distributors onboard" },
    { value: "$2.1B+", label: "Inventory value tracked" },
    { value: "99.95%", label: "Platform uptime" },
    { value: "38%", label: "Avg. stockout reduction" },
  ];

  const testimonials = [
    { quote: "We caught a critical PPE shortage three weeks before it would've hit our floors. That alone paid for the platform.", name: "R. Iyer", role: "VP Operations, Coastal Medical Supply", initials: "RI" },
    { quote: "Our finance team finally has one number for outstanding receivables instead of five spreadsheets that never agree.", name: "A. Fernandes", role: "Finance Director, MedCore Distribution", initials: "AF" },
    { quote: "The demand forecast is the first one our planners actually trust enough to order against.", name: "T. Okafor", role: "Head of Supply Chain, Northline Health", initials: "TO" },
  ];

  const pricing = [
    { name: "Starter", price: "$299", period: "/mo", desc: "For single-location distributors getting started with data.", features: ["Up to 5 users", "Core sales & inventory dashboards", "CSV import", "Email support"], cta: "Start free trial", highlighted: false },
    { name: "Professional", price: "$799", period: "/mo", desc: "For growing distributors managing multiple warehouses.", features: ["Up to 25 users", "AI demand forecasting", "Price analysis & reporting", "Priority support", "Role-based access"], cta: "Start free trial", highlighted: true },
    { name: "Enterprise", price: "Custom", period: "", desc: "For national distributors with complex compliance needs.", features: ["Unlimited users", "Dedicated success manager", "Custom integrations & SSO", "Audit-ready reporting", "99.95% uptime SLA"], cta: "Talk to sales", highlighted: false },
  ];

  const faqs = [
    { q: "How long does implementation take?", a: "Most distributors are live within a week. Upload a CSV of your existing sales and inventory data, and the dashboards populate automatically — no engineering work required." },
    { q: "Can it handle multiple warehouses and branches?", a: "Yes. Every chart and table can be filtered by location, so regional managers see their numbers while leadership sees the consolidated view." },
    { q: "Is our data secure?", a: "All data is encrypted in transit and at rest, with role-based access controls and full audit logs — built to support healthcare supply chain compliance requirements." },
    { q: "Do you support Excel and CSV files?", a: "Both. The import tool accepts .csv and .xlsx files, validates columns automatically, and flags any rows that need review before import." },
    { q: "What does the free trial include?", a: "Full access to every dashboard for 14 days, including AI demand forecasting, with your own data or our sample medical distribution dataset." },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* NAV */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <Stethoscope className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-lg tracking-tight">MediPulse<span className="text-blue-600">BI</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#stats" className="hover:text-slate-900">Results</a>
            <a href="#pricing" className="hover:text-slate-900">Pricing</a>
            <a href="#faq" className="hover:text-slate-900">FAQ</a>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <button onClick={onLogin} className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2">Log in</button>
            <button onClick={onLogin} className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">Start free trial</button>
          </div>
          <button className="md:hidden" onClick={() => setNavOpen(!navOpen)}>
            {navOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden border-t border-slate-200 px-6 py-4 flex flex-col gap-3 text-sm font-medium text-slate-600">
            <a href="#features" onClick={() => setNavOpen(false)}>Features</a>
            <a href="#stats" onClick={() => setNavOpen(false)}>Results</a>
            <a href="#pricing" onClick={() => setNavOpen(false)}>Pricing</a>
            <a href="#faq" onClick={() => setNavOpen(false)}>FAQ</a>
            <button onClick={onLogin} className="text-left text-blue-600 font-semibold">Log in</button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50" />
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-full">
              <Sparkles className="h-3.5 w-3.5" /> New: AI-powered demand forecasting
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-slate-900">
              Run your medical distribution business on real numbers, not guesswork.
            </h1>
            <p className="mt-5 text-lg text-slate-600 max-w-xl">
              One dashboard for sales, inventory, pricing, and payments — built specifically for medical distributors who can't afford a stockout or a missed collection.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button onClick={onLogin} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow-sm transition-colors">
                Start free trial <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={onLogin} className="inline-flex items-center gap-2 text-slate-700 font-medium px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 transition-colors">
                <PlayCircle className="h-4 w-4" /> Watch demo
              </button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-600" /> No credit card required</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-600" /> 14-day free trial</span>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white shadow-xl p-4">
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500">REVENUE TREND</span>
                <span className="text-xs font-semibold text-green-600">+18.7%</span>
              </div>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueTrend}>
                    <defs>
                      <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2} fill="url(#heroGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {PRIMARY_KPIS.slice(0, 3).map((k) => (
                  <div key={k.label} className="bg-white rounded-lg border border-slate-200 p-3">
                    <p className="text-[11px] text-slate-500">{k.label}</p>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">{k.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGO STRIP */}
      <section className="border-y border-slate-200 py-8 bg-slate-50">
        <p className="text-center text-xs font-semibold tracking-wide text-slate-400 uppercase mb-5">Trusted by distributors and healthcare networks nationwide</p>
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-4 text-slate-400 font-semibold text-lg">
          <span className="flex items-center gap-1.5"><Building2 className="h-5 w-5" /> Coastal Medical</span>
          <span className="flex items-center gap-1.5"><Truck className="h-5 w-5" /> Northline Health</span>
          <span className="flex items-center gap-1.5"><Shield className="h-5 w-5" /> MedCore Group</span>
          <span className="flex items-center gap-1.5"><Globe className="h-5 w-5" /> Apex Wellness</span>
          <span className="flex items-center gap-1.5"><Award className="h-5 w-5" /> Sunrise Network</span>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-2xl mb-12">
          <span className="text-sm font-semibold text-blue-600">Platform</span>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">Everything a distribution team checks every morning — in one place</h2>
          <p className="text-slate-600 mt-3">Purpose-built modules for the decisions medical distributors make daily, not a generic BI template.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:border-blue-200 transition-all">
              <div className="h-11 w-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                <f.icon className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-800">{f.title}</h3>
              <p className="text-sm text-slate-500 mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section id="stats" className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl sm:text-4xl font-bold text-white">{s.value}</p>
              <p className="text-slate-400 text-sm mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-2xl mb-12 mx-auto text-center">
          <span className="text-sm font-semibold text-blue-600">Customer stories</span>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">Built for the people who can't afford to be wrong</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-slate-200 p-6 bg-slate-50">
              <Quote className="h-6 w-6 text-blue-300 mb-3" />
              <p className="text-sm text-slate-700 leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-3 mt-5">
                <div className="h-9 w-9 rounded-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center">{t.initials}</div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-12 mx-auto text-center">
            <span className="text-sm font-semibold text-blue-600">Pricing</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">Simple plans that scale with your warehouse count</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {pricing.map((p) => (
              <div key={p.name} className={`rounded-2xl p-7 border ${p.highlighted ? "border-blue-600 bg-white shadow-xl relative" : "border-slate-200 bg-white"}`}>
                {p.highlighted && <span className="absolute -top-3 left-7 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Most popular</span>}
                <h3 className="font-semibold text-slate-800">{p.name}</h3>
                <div className="flex items-baseline gap-1 mt-3">
                  <span className="text-3xl font-bold text-slate-900">{p.price}</span>
                  <span className="text-slate-500 text-sm">{p.period}</span>
                </div>
                <p className="text-sm text-slate-500 mt-2">{p.desc}</p>
                <ul className="mt-5 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={onLogin} className={`w-full mt-7 py-2.5 rounded-xl text-sm font-medium transition-colors ${p.highlighted ? "bg-blue-600 hover:bg-blue-700 text-white" : "border border-slate-300 hover:bg-slate-50 text-slate-700"}`}>
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">Frequently asked questions</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="border border-slate-200 rounded-xl overflow-hidden">
              <button onClick={() => setFaqOpen(faqOpen === i ? -1 : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                <span className="font-medium text-slate-800 text-sm">{f.q}</span>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${faqOpen === i ? "rotate-180" : ""}`} />
              </button>
              {faqOpen === i && <div className="px-5 pb-4 text-sm text-slate-600">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-14 text-center relative overflow-hidden">
          <h2 className="text-3xl font-bold text-white">Stop finding out about stockouts from your customers.</h2>
          <p className="text-blue-100 mt-3 max-w-xl mx-auto">Join 500+ distributors running their operations on live data. Set up takes under a week.</p>
          <button onClick={onLogin} className="mt-7 inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">
            Start your free trial <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Stethoscope className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-white">MediPulse<span className="text-blue-500">BI</span></span>
            </div>
            <p className="text-sm mt-4 max-w-xs">Business intelligence built for medical distributors — sales, inventory, pricing, and forecasting in one dashboard.</p>
            <div className="mt-5">
              <p className="text-xs font-semibold text-slate-300 mb-2">Get product updates</p>
              {subscribed ? (
                <p className="text-sm text-green-400 flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> You're subscribed</p>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) setSubscribed(true); }} className="flex gap-2">
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@company.com" className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 w-full focus:outline-none focus:ring-2 focus:ring-blue-600" />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shrink-0">Subscribe</button>
                </form>
              )}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-300 uppercase mb-3">Product</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">Integrations</a></li>
              <li><a href="#" className="hover:text-white">Changelog</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-300 uppercase mb-3">Company</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-300 uppercase mb-3">Legal</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Privacy policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of service</a></li>
              <li><a href="#" className="hover:text-white">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-slate-800 text-xs flex flex-col sm:flex-row justify-between gap-3">
          <span>© 2026 MediPulseBI. All rights reserved.</span>
          <span>Made for medical distribution teams.</span>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  LOGIN PAGE                                                         */
/* ------------------------------------------------------------------ */

function LoginPage({ onSuccess, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = "Email is required";
    if (!password.trim()) e.password = "Password is required";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(onSuccess, 500);
    }, 1100);
  };

  const fillDemo = () => {
    setEmail("demo@medipulsebi.io");
    setPassword("demo1234");
    setErrors({});
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* LEFT */}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-700 via-blue-600 to-slate-900 text-white p-12 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-500/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="relative flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
            <Stethoscope className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-lg">MediPulseBI</span>
        </div>
        <div className="relative">
          <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mb-6">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold leading-tight max-w-md">Welcome back. Your inventory doesn't manage itself — but your dashboard does.</h2>
          <p className="text-blue-100 mt-4 max-w-sm">Sales, stock, pricing, and demand forecasting for your entire distribution network, updated in real time.</p>
          <div className="flex items-center gap-6 mt-8 text-sm text-blue-100">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> SOC 2 aligned</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> 99.95% uptime</span>
          </div>
        </div>
        <p className="relative text-xs text-blue-200">© 2026 MediPulseBI · Trusted by 500+ medical distributors</p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <button onClick={onBack} className="lg:hidden flex items-center gap-2 mb-8 text-slate-500 text-sm">
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          <div className="flex items-center gap-2 mb-8">
            <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <Stethoscope className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-lg text-slate-800">MediPulseBI</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Log in to your account</h1>
          <p className="text-sm text-slate-500 mt-1.5">Enter your details to access the dashboard.</p>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <button type="button" className="flex items-center justify-center gap-2 border border-slate-300 rounded-xl py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.09V7.06H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.94z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.85C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
              Google
            </button>
            <button type="button" className="flex items-center justify-center gap-2 border border-slate-300 rounded-xl py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <svg className="h-4 w-4" viewBox="0 0 23 23"><path fill="#f35325" d="M1 1h10v10H1z"/><path fill="#81bc06" d="M12 1h10v10H12z"/><path fill="#05a6f0" d="M1 12h10v10H1z"/><path fill="#ffba08" d="M12 12h10v10H12z"/></svg>
              Microsoft
            </button>
          </div>
          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-slate-200 flex-1" /><span className="text-xs text-slate-400">OR</span><div className="h-px bg-slate-200 flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="text-sm font-medium text-slate-700">Email</label>
              <div className={`mt-1.5 flex items-center gap-2 rounded-xl border px-3 py-2.5 ${errors.email ? "border-red-400" : "border-slate-300"} focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500`}>
                <Mail className="h-4 w-4 text-slate-400" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@company.com" className="w-full text-sm outline-none text-slate-800 placeholder-slate-400" />
              </div>
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-700">Forgot password?</a>
              </div>
              <div className={`mt-1.5 flex items-center gap-2 rounded-xl border px-3 py-2.5 ${errors.password ? "border-red-400" : "border-slate-300"} focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500`}>
                <Lock className="h-4 w-4 text-slate-400" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPw ? "text" : "password"} placeholder="••••••••" className="w-full text-sm outline-none text-slate-800 placeholder-slate-400" />
                <button type="button" onClick={() => setShowPw(!showPw)}>
                  {showPw ? <EyeOff className="h-4 w-4 text-slate-400" /> : <Eye className="h-4 w-4 text-slate-400" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" checked={remember} onChange={() => setRemember(!remember)} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              Remember me for 30 days
            </label>
            <button type="submit" disabled={loading} className={`w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-colors flex items-center justify-center gap-2 ${success ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"} disabled:opacity-80`}>
              {loading ? (<><RefreshCw className="h-4 w-4 animate-spin" /> Signing in...</>) : success ? (<><CheckCircle2 className="h-4 w-4" /> Success — redirecting</>) : "Log in"}
            </button>
            <button type="button" onClick={fillDemo} className="w-full text-xs font-medium text-blue-600 hover:text-blue-700 py-1">
              Use demo credentials
            </button>
          </form>
          <p className="text-center text-sm text-slate-500 mt-6">Don't have an account? <a href="#" className="text-blue-600 font-medium">Start a free trial</a></p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DASHBOARD SHELL — SIDEBAR + NAVBAR                                 */
/* ------------------------------------------------------------------ */

function Sidebar({ section, setSection, collapsed, setCollapsed, mobileOpen, setMobileOpen, dark, onLogout }) {
  const width = collapsed ? "w-20" : "w-64";
  const base = dark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200";

  const Item = ({ item, active }) => (
    <button
      onClick={() => { setSection(item.key); setMobileOpen(false); }}
      className={`group w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
        active ? "bg-blue-600 text-white shadow-sm" : dark ? "text-slate-300 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-100"
      }`}
      title={collapsed ? item.label : undefined}
    >
      <item.icon className={`h-[18px] w-[18px] shrink-0 ${active ? "text-white" : "text-current"}`} />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </button>
  );

  return (
    <>
      {mobileOpen && <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setMobileOpen(false)} />}
      <aside className={`fixed z-50 md:z-30 top-0 left-0 h-full ${width} ${base} border-r flex flex-col transition-all duration-200 ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className={`h-16 flex items-center gap-2 px-4 border-b ${dark ? "border-slate-800" : "border-slate-200"}`}>
          <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
            <Stethoscope className="h-5 w-5 text-white" />
          </div>
          {!collapsed && <span className={`font-semibold truncate ${dark ? "text-white" : "text-slate-800"}`}>MediPulse<span className="text-blue-500">BI</span></span>}
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => <Item key={item.key} item={item} active={section === item.key} />)}
          <div className={`my-3 h-px ${dark ? "bg-slate-800" : "bg-slate-200"}`} />
          {NAV_FOOTER.map((item) => <Item key={item.key} item={item} active={section === item.key} />)}
          <button onClick={onLogout} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${dark ? "text-red-400 hover:bg-red-950/40" : "text-red-600 hover:bg-red-50"}`}>
            <LogOut className="h-[18px] w-[18px] shrink-0" />
            {!collapsed && "Logout"}
          </button>
        </nav>
        <button onClick={() => setCollapsed(!collapsed)} className={`hidden md:flex items-center justify-center h-10 border-t ${dark ? "border-slate-800 text-slate-400 hover:bg-slate-800" : "border-slate-200 text-slate-400 hover:bg-slate-50"}`}>
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <><ChevronLeft className="h-4 w-4" /><span className="text-xs ml-1">Collapse</span></>}
        </button>
      </aside>
    </>
  );
}

function Navbar({ collapsed, dark, setDark, setMobileOpen, section }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const title = [...NAV_ITEMS, ...NAV_FOOTER].find((n) => n.key === section)?.label || "Dashboard";
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  const notifications = [
    { text: "Infusion Pump stock fell below reorder level", time: "12m ago", type: "warning" },
    { text: "Invoice TXN-8838 is now 5 days overdue", time: "1h ago", type: "danger" },
    { text: "CSV import completed — 1,204 rows processed", time: "3h ago", type: "success" },
  ];

  return (
    <header className={`sticky top-0 z-20 h-16 border-b flex items-center justify-between px-4 sm:px-6 ${dark ? "bg-slate-900/95 border-slate-800" : "bg-white/95 border-slate-200"} backdrop-blur`}>
      <div className="flex items-center gap-3 min-w-0">
        <button className="md:hidden" onClick={() => setMobileOpen(true)}>
          <Menu className={`h-5 w-5 ${dark ? "text-slate-300" : "text-slate-600"}`} />
        </button>
        <div className="min-w-0">
          <h1 className={`text-sm sm:text-base font-semibold truncate ${dark ? "text-white" : "text-slate-800"}`}>{title}</h1>
          <p className={`text-xs hidden sm:block ${dark ? "text-slate-500" : "text-slate-400"}`}>{today}</p>
        </div>
      </div>

      <div className={`hidden lg:flex items-center gap-2 rounded-xl border px-3 py-2 w-72 ${dark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
        <Search className="h-4 w-4 text-slate-400" />
        <input placeholder="Search orders, products, customers..." className={`bg-transparent text-sm outline-none w-full ${dark ? "text-slate-200 placeholder-slate-500" : "text-slate-700 placeholder-slate-400"}`} />
      </div>

      <div className="flex items-center gap-1.5 sm:gap-3">
        <button onClick={() => setDark(!dark)} className={`h-9 w-9 rounded-lg flex items-center justify-center ${dark ? "hover:bg-slate-800 text-slate-300" : "hover:bg-slate-100 text-slate-600"}`}>
          {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </button>
        <button className={`h-9 w-9 rounded-lg hidden sm:flex items-center justify-center ${dark ? "hover:bg-slate-800 text-slate-300" : "hover:bg-slate-100 text-slate-600"}`}>
          <MessageSquare className="h-[18px] w-[18px]" />
        </button>
        <div className="relative">
          <button onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }} className={`h-9 w-9 rounded-lg flex items-center justify-center relative ${dark ? "hover:bg-slate-800 text-slate-300" : "hover:bg-slate-100 text-slate-600"}`}>
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
          {notifOpen && (
            <div className={`absolute right-0 mt-2 w-80 rounded-xl border shadow-lg overflow-hidden ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
              <div className={`px-4 py-3 border-b text-sm font-semibold ${dark ? "border-slate-700 text-white" : "border-slate-100 text-slate-800"}`}>Notifications</div>
              {notifications.map((n, i) => (
                <div key={i} className={`px-4 py-3 flex items-start gap-3 text-sm border-b last:border-0 ${dark ? "border-slate-700/60" : "border-slate-100"}`}>
                  <span className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${n.type === "danger" ? "bg-red-500" : n.type === "warning" ? "bg-amber-500" : "bg-green-500"}`} />
                  <div>
                    <p className={dark ? "text-slate-200" : "text-slate-700"}>{n.text}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <button onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }} className="flex items-center gap-2 pl-1">
            <div className="h-8 w-8 rounded-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center">SK</div>
            <ChevronDown className={`h-3.5 w-3.5 hidden sm:block ${dark ? "text-slate-400" : "text-slate-400"}`} />
          </button>
          {profileOpen && (
            <div className={`absolute right-0 mt-2 w-48 rounded-xl border shadow-lg overflow-hidden text-sm ${dark ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-white border-slate-200 text-slate-700"}`}>
              <div className={`px-4 py-3 border-b ${dark ? "border-slate-700" : "border-slate-100"}`}>
                <p className="font-medium">Sanjay Kumar</p>
                <p className="text-xs text-slate-400">Operations Manager</p>
              </div>
              <button className={`w-full text-left px-4 py-2.5 flex items-center gap-2 ${dark ? "hover:bg-slate-700" : "hover:bg-slate-50"}`}><Settings className="h-4 w-4" /> Settings</button>
              <button className={`w-full text-left px-4 py-2.5 flex items-center gap-2 text-red-500 ${dark ? "hover:bg-slate-700" : "hover:bg-slate-50"}`}><LogOut className="h-4 w-4" /> Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGES                                                               */
/* ------------------------------------------------------------------ */

function HomePage({ dark, setSection }) {
  const axisColor = dark ? "#64748B" : "#94A3B8";
  const gridColor = dark ? "#334155" : "#E2E8F0";
  const textMain = dark ? "text-white" : "text-slate-800";
  const textSub = dark ? "text-slate-400" : "text-slate-500";

  const quickActions = [
    { icon: Upload, label: "Upload CSV", to: "upload" },
    { icon: FileText, label: "Generate Report", to: null },
    { icon: Activity, label: "Forecast Demand", to: "forecasting" },
    { icon: Download, label: "Export PDF", to: null },
  ];

  return (
    <div className="space-y-6">
      {/* Executive KPIs — answers "how healthy is the business today?" */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {PRIMARY_KPIS.map((k) => <KpiCard key={k.label} item={k} dark={dark} />)}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {SECONDARY_KPIS.map((k) => (
          <div key={k.label} className={`rounded-2xl border p-4 flex items-center gap-3 ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
            <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${colorMap[k.color].bg}`}><k.icon className={`h-4 w-4 ${colorMap[k.color].text}`} /></div>
            <div className="min-w-0">
              <p className={`text-sm font-semibold truncate ${textMain}`}>{k.value}</p>
              <p className={`text-xs truncate ${textSub}`}>{k.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <Panel title="Monthly Sales Trend" subtitle="Revenue vs. target" dark={dark}>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueTrend}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                  <XAxis dataKey="m" tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} tickFormatter={fmtK} />
                  <Tooltip formatter={(v) => fmt(v)} contentStyle={{ borderRadius: 12, fontSize: 12, border: "1px solid #E2E8F0" }} />
                  <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2.5} fill="url(#rev)" name="Revenue" />
                  <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeWidth={2} strokeDasharray="4 4" dot={false} name="Target" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>
        <Panel title="Regional Sales" subtitle="Revenue by region" dark={dark}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueByRegion}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} tickFormatter={fmtK} />
                <Tooltip formatter={(v) => fmt(v)} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="value" fill="#F59E0B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Panel title="Top Selling Products" dark={dark}>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: axisColor }} axisLine={false} tickLine={false} tickFormatter={fmtK} />
                <YAxis type="category" dataKey="name" width={95} tick={{ fontSize: 10, fill: axisColor }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v) => fmt(v)} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="revenue" fill="#16A34A" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Inventory Distribution" subtitle="Value by category" dark={dark}>
          <div className="h-56 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={inventoryDistribution} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={3}>
                  {inventoryDistribution.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => fmt(v)} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Low Stock Trend" subtitle="SKUs below reorder point" dark={dark}>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lowStockTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Line type="monotone" dataKey="count" stroke="#DC2626" strokeWidth={2.5} dot={{ r: 3 }} name="Low stock SKUs" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <Panel title="Payment Collection" subtitle="Collected vs. pending, by month" dark={dark}>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={paymentCollection}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="m" tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} tickFormatter={fmtK} />
              <Tooltip formatter={(v) => fmt(v)} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="collected" stackId="a" fill="#16A34A" radius={[0, 0, 0, 0]} name="Collected" />
              <Bar dataKey="pending" stackId="a" fill="#F59E0B" radius={[6, 6, 0, 0]} name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <DataQualityCard quality={DATA_QUALITY_FALLBACK.sales} datasetLabel="Sales" dark={dark} />
        </div>
        <AlertsPanel dark={dark} />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <Panel title="Recent Transactions" dark={dark}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`text-left border-b ${dark ? "border-slate-700 text-slate-400" : "border-slate-100 text-slate-400"}`}>
                    <th className="pb-2 font-medium">ID</th><th className="pb-2 font-medium">Customer</th><th className="pb-2 font-medium">Amount</th><th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((t) => (
                    <tr key={t.id} className={`border-b last:border-0 ${dark ? "border-slate-700/60" : "border-slate-50"}`}>
                      <td className={`py-2.5 font-medium ${textMain}`}>{t.id}</td>
                      <td className={`py-2.5 ${textSub} max-w-[180px] truncate`}>{t.customer}</td>
                      <td className={`py-2.5 ${textMain}`}>{fmt(t.amount)}</td>
                      <td className="py-2.5"><span className={`text-xs px-2 py-1 rounded-full border ${statusStyle(t.status)}`}>{t.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
        <Panel title="Low Stock Products" dark={dark}>
          <div className="space-y-3">
            {lowStockProducts.map((p) => (
              <div key={p.sku} className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${textMain}`}>{p.name}</p>
                  <p className={`text-xs ${textSub}`}>{p.stock} units left</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full border ${statusStyle(p.status)}`}>{p.status}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <Panel title="Top Customers" dark={dark}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className={`text-left border-b ${dark ? "border-slate-700 text-slate-400" : "border-slate-100 text-slate-400"}`}>
                    <th className="pb-2 font-medium">Customer</th><th className="pb-2 font-medium">Orders</th><th className="pb-2 font-medium">Revenue</th><th className="pb-2 font-medium">Tier</th>
                  </tr>
                </thead>
                <tbody>
                  {topCustomers.map((c) => (
                    <tr key={c.name} className={`border-b last:border-0 ${dark ? "border-slate-700/60" : "border-slate-50"}`}>
                      <td className={`py-2.5 font-medium ${textMain}`}>{c.name}</td>
                      <td className={`py-2.5 ${textSub}`}>{c.orders}</td>
                      <td className={`py-2.5 ${textMain}`}>{fmt(c.revenue)}</td>
                      <td className="py-2.5"><span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">{c.tier}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
        <Panel title="Quick Actions" dark={dark}>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((a) => (
              <button
                key={a.label}
                onClick={a.to ? () => setSection(a.to) : undefined}
                className={`flex flex-col items-center gap-2 rounded-xl border py-4 text-xs font-medium transition-colors ${dark ? "border-slate-700 hover:bg-slate-700 text-slate-300" : "border-slate-200 hover:bg-slate-50 text-slate-600"} ${!a.to ? "opacity-60 cursor-default" : ""}`}
              >
                <a.icon className="h-5 w-5 text-blue-600" /> {a.label}
              </button>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function AnalyticsPage({ dark }) {
  const [category, setCategory] = useState("All categories");
  const axisColor = dark ? "#64748B" : "#94A3B8";
  const gridColor = dark ? "#334155" : "#E2E8F0";
  const textMain = dark ? "text-white" : "text-slate-800";
  const textSub = dark ? "text-slate-400" : "text-slate-500";
  const cats = ["All categories", ...new Set(salesHistory.map((s) => s.category))];
  const filtered = category === "All categories" ? salesHistory : salesHistory.filter((s) => s.category === category);
  const cards = [
    { label: "Total Revenue", value: fmt(2438500), icon: DollarSign, color: "blue" },
    { label: "Daily Revenue", value: fmt(48290), icon: Calendar, color: "green" },
    { label: "Weekly Revenue", value: fmt(312400), icon: TrendingUp, color: "amber" },
    { label: "Monthly Revenue", value: fmt(612400), icon: BarChart3, color: "blue" },
    { label: "Growth", value: "+18.7%", icon: ArrowUpRight, color: "green" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {cards.map((k) => (
          <div key={k.label} className={`rounded-2xl border p-4 shadow-sm ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
            <div className={`h-9 w-9 rounded-lg flex items-center justify-center mb-3 ${colorMap[k.color].bg}`}><k.icon className={`h-4 w-4 ${colorMap[k.color].text}`} /></div>
            <p className={`text-lg font-semibold ${textMain}`}>{k.value}</p>
            <p className={`text-xs ${textSub}`}>{k.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Panel title="Daily Sales" subtitle="Last 14 days" dark={dark}>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailySales}>
                <defs>
                  <linearGradient id="ds" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.35} /><stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="d" tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} tickFormatter={fmtK} />
                <Tooltip formatter={(v) => fmt(v)} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="sales" stroke="#2563EB" strokeWidth={2.5} fill="url(#ds)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Revenue by Region" dark={dark}>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueByRegion}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} tickFormatter={fmtK} />
                <Tooltip formatter={(v) => fmt(v)} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="value" fill="#F59E0B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <Panel
        title="Sales History"
        dark={dark}
        right={
          <div className="flex items-center gap-2">
            <Filter className={`h-4 w-4 ${textSub}`} />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={`text-xs rounded-lg border px-2.5 py-1.5 ${dark ? "bg-slate-700 border-slate-600 text-slate-200" : "bg-white border-slate-200 text-slate-600"}`}>
              {cats.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`text-left border-b ${dark ? "border-slate-700 text-slate-400" : "border-slate-100 text-slate-400"}`}>
                <th className="pb-2 font-medium">Order</th><th className="pb-2 font-medium">Date</th><th className="pb-2 font-medium">Customer</th><th className="pb-2 font-medium">Category</th><th className="pb-2 font-medium">Amount</th><th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className={`border-b last:border-0 ${dark ? "border-slate-700/60" : "border-slate-50"}`}>
                  <td className={`py-2.5 font-medium ${textMain}`}>{s.id}</td>
                  <td className={`py-2.5 ${textSub}`}>{s.date}</td>
                  <td className={`py-2.5 ${textSub}`}>{s.customer}</td>
                  <td className={`py-2.5 ${textSub}`}>{s.category}</td>
                  <td className={`py-2.5 ${textMain}`}>{fmt(s.amount)}</td>
                  <td className="py-2.5"><span className={`text-xs px-2 py-1 rounded-full border ${statusStyle(s.status)}`}>{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <StatisticsPanel dark={dark} />
    </div>
  );
}

function InventoryPage({ dark }) {
  const gridColor = dark ? "#334155" : "#E2E8F0";
  const axisColor = dark ? "#64748B" : "#94A3B8";
  const textMain = dark ? "text-white" : "text-slate-800";
  const textSub = dark ? "text-slate-400" : "text-slate-500";
  const cards = [
    { label: "Current Stock", value: "18,240 units", icon: Boxes, color: "blue" },
    { label: "Low Stock", value: "17 SKUs", icon: AlertTriangle, color: "amber" },
    { label: "Out of Stock", value: "6 SKUs", icon: PackageX, color: "red" },
    { label: "Overstock", value: "9 SKUs", icon: PackageCheck, color: "blue" },
    { label: "Inventory Value", value: fmt(1804200), icon: DollarSign, color: "green" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {cards.map((k) => (
          <div key={k.label} className={`rounded-2xl border p-4 shadow-sm ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
            <div className={`h-9 w-9 rounded-lg flex items-center justify-center mb-3 ${colorMap[k.color].bg}`}><k.icon className={`h-4 w-4 ${colorMap[k.color].text}`} /></div>
            <p className={`text-lg font-semibold ${textMain}`}>{k.value}</p>
            <p className={`text-xs ${textSub}`}>{k.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Panel title="Inventory Distribution" subtitle="Value by category" dark={dark}>
          <div className="h-56 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={inventoryDistribution} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {inventoryDistribution.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => fmt(v)} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Stock Movement" subtitle="Units in vs. out" dark={dark}>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockMovement}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="in" fill="#16A34A" radius={[6, 6, 0, 0]} name="Stock In" />
                <Bar dataKey="out" fill="#DC2626" radius={[6, 6, 0, 0]} name="Stock Out" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Panel title="Inventory List" dark={dark}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={`text-left border-b ${dark ? "border-slate-700 text-slate-400" : "border-slate-100 text-slate-400"}`}>
                  <th className="pb-2 font-medium">Product</th><th className="pb-2 font-medium">Stock</th><th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {inventoryList.map((p) => (
                  <tr key={p.sku} className={`border-b last:border-0 ${dark ? "border-slate-700/60" : "border-slate-50"}`}>
                    <td className="py-2.5">
                      <p className={`font-medium ${textMain}`}>{p.name}</p>
                      <p className={`text-xs ${textSub}`}>{p.sku} · {p.category}</p>
                    </td>
                    <td className={`py-2.5 ${textMain}`}>{p.stock}</td>
                    <td className="py-2.5"><span className={`text-xs px-2 py-1 rounded-full border ${statusStyle(p.status)}`}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
        <Panel title="Reorder List" subtitle="Suggested purchase quantities" dark={dark}>
          <div className="space-y-3">
            {reorderList.map((r) => (
              <div key={r.name} className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${textMain}`}>{r.name}</p>
                  <p className={`text-xs ${textSub}`}>{r.current} in stock · reorder at {r.reorder}</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">Order {r.suggested}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

const uploadStatusStyle = {
  synced: { label: "Synced", chip: "bg-green-50 text-green-700 border-green-200" },
  stale: { label: "Needs refresh", chip: "bg-amber-50 text-amber-700 border-amber-200" },
  missing: { label: "Not uploaded", chip: "bg-slate-100 text-slate-500 border-slate-200" },
};

function UploadCenterPage({ dark }) {
  const [activeKey, setActiveKey] = useState("sales");
  const [dragOver, setDragOver] = useState(false);
  // Keyed by dataset — mirrors one row per dataset in a future `uploads` table.
  const [sessionUploads, setSessionUploads] = useState({});
  const cardBg = dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200";
  const textMain = dark ? "text-white" : "text-slate-800";
  const textSub = dark ? "text-slate-400" : "text-slate-500";

  const activeDataset = UPLOAD_DATASETS.find((d) => d.key === activeKey);
  const activeUpload = sessionUploads[activeKey] || { status: "idle" };

  const setActive = (patch) => setSessionUploads((prev) => ({ ...prev, [activeKey]: { ...prev[activeKey], ...patch } }));

const processFile = async (file) => {
  if (!file) return;

  try {
    setSessionUploads((prev) => ({
      ...prev,
      [activeKey]: {
        status: "uploading",
        progress: 30,
        fileName: file.name,
      },
    }));

    const formData = new FormData();
    formData.append("csv_file", file);

   const response = await fetch(
  "https://ecommerce-analytics-dashboard-production-506f.up.railway.app/",
  {
    method: "POST",
    body: formData,
  }
);

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();

console.log("FULL RESPONSE");
console.log(data);

console.log("QUALITY");
console.log(data.quality);

console.log("METADATA");
console.log(data.metadata);
    setSessionUploads((prev) => ({
      ...prev,
      [activeKey]: {
        status: "imported",
        progress: 100,
        fileName: data.upload.filename,
        rowCount: data.metadata.row_count,
        columns: Object.keys(data.preview[0] || {}),
       quality: {
    healthScore: data.quality.score,
    missingValues: data.quality.missing_values,
    duplicateRows: data.quality.duplicate_rows,
    totalRecords: data.metadata.row_count,
    totalColumns: data.metadata.column_count,
    memoryUsageKb: Math.round(data.metadata.memory_usage / 1024),
},
        previewRows: data.preview,
        dashboardData: data,
      },
    }));

  } catch (err) {
    console.error(err);

    setSessionUploads((prev) => ({
      ...prev,
      [activeKey]: {
        status: "error",
      },
    }));
  }
};
const importActive = () => setActive({ status: "imported" });
  const resetActive = () => setSessionUploads((prev) => { const next = { ...prev }; delete next[activeKey]; return next; });
  const displayedQuality = activeUpload.quality || DATA_QUALITY_FALLBACK[activeKey];

  return (
    <div className="space-y-6">
      <div>
        <h2 className={`text-lg font-semibold ${textMain}`}>Upload Center</h2>
        <p className={`text-sm mt-1 ${textSub}`}>Import CSV exports for each dataset — the Django + Pandas backend processes every file and returns quality metrics automatically.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {UPLOAD_DATASETS.map((d) => {
          const session = sessionUploads[d.key];
          const effectiveStatus = session?.status === "imported" ? "synced" : d.status;
          const s = uploadStatusStyle[effectiveStatus];
          const active = activeKey === d.key;
          return (
            <button
              key={d.key}
              onClick={() => setActiveKey(d.key)}
              className={`text-left rounded-2xl border p-4 shadow-sm transition-colors ${dark ? "bg-slate-800" : "bg-white"} ${
                active ? "border-blue-500 ring-1 ring-blue-500" : dark ? "border-slate-700 hover:border-slate-600" : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center"><d.icon className="h-4 w-4 text-blue-600" /></div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${s.chip}`}>{s.label}</span>
              </div>
              <p className={`text-sm font-semibold ${textMain}`}>Upload {d.label} CSV</p>
              <p className={`text-xs mt-1 ${textSub}`}>{d.description}</p>
              <p className={`text-xs mt-2 ${textSub}`}>
                {session?.status === "imported"
                  ? `${session.rowCount.toLocaleString("en-US")} rows · just now`
                  : d.lastUpload ? `${d.rows.toLocaleString("en-US")} rows · ${d.lastUpload}` : "No file uploaded yet"}
              </p>
            </button>
          );
        })}
      </div>

      <Panel title={`Import ${activeDataset.label} Data`} subtitle="Drag a CSV or browse to select one" dark={dark}>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); processFile(e.dataTransfer.files[0]); }}
          className={`rounded-2xl border-2 border-dashed p-8 flex flex-col items-center text-center transition-colors ${
            dragOver ? "border-blue-500 bg-blue-50" : dark ? "border-slate-700 bg-slate-900/40" : "border-slate-300 bg-slate-50"
          }`}
        >
          <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
            <UploadCloud className="h-6 w-6 text-blue-600" />
          </div>
          <p className={`font-semibold ${textMain}`}>Drag and drop your {activeDataset.label.toLowerCase()} CSV here</p>
          <p className={`text-sm mt-1 ${textSub}`}>or click below to browse</p>
          <label className="mt-4 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl cursor-pointer transition-colors">
            <FileSpreadsheet className="h-4 w-4" /> Browse files
            <input type="file" accept=".csv" className="hidden" onChange={(e) => processFile(e.target.files[0])} />
          </label>
          <p className="text-xs text-slate-400 mt-3">Supports .csv up to 25MB</p>
        </div>

        {activeUpload.status === "error" && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 flex items-center gap-2 text-sm text-red-700">
            <AlertTriangle className="h-4 w-4" /> That file couldn't be read — please upload a valid .csv file.
          </div>
        )}

        {activeUpload.fileName && activeUpload.status !== "error" && (
          <div className={`rounded-2xl border p-5 mt-4 ${cardBg}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center"><FileSpreadsheet className="h-5 w-5 text-green-600" /></div>
                <div>
                  <p className={`text-sm font-medium ${textMain}`}>{activeUpload.fileName}</p>
                  <p className={`text-xs ${textSub}`}>
                    {activeUpload.columns?.length || 0} columns detected
                    {activeUpload.status !== "parsing" && activeUpload.rowCount != null && ` · ${activeUpload.rowCount.toLocaleString("en-US")} rows`}
                  </p>
                </div>
              </div>
              <button onClick={resetActive} className={`text-xs font-medium ${dark ? "text-slate-400 hover:text-white" : "text-slate-400 hover:text-slate-700"}`}>Remove</button>
            </div>
            <div className={`h-1.5 rounded-full mt-4 overflow-hidden ${dark ? "bg-slate-700" : "bg-slate-100"}`}>
              <div className="h-full bg-blue-600 transition-all duration-200" style={{ width: `${activeUpload.progress || 0}%` }} />
            </div>

            {activeUpload.status === "ready" && (
              <>
                <div className="overflow-x-auto mt-5 rounded-xl border border-slate-200">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className={dark ? "bg-slate-700" : "bg-slate-50"}>
                        {activeUpload.columns.map((c) => <th key={c} className={`text-left px-3 py-2 font-medium ${dark ? "text-slate-300" : "text-slate-500"}`}>{c}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {activeUpload.previewRows.map((r, i) => (
                        <tr key={i} className={`border-t ${dark ? "border-slate-700" : "border-slate-100"}`}>
                          {activeUpload.columns.map((c) => <td key={c} className={`px-3 py-2 ${dark ? "text-slate-300" : "text-slate-600"}`}>{String(r[c] ?? "")}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <button onClick={importActive} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors">
                    <CheckCircle2 className="h-4 w-4" /> Import {activeUpload.rowCount.toLocaleString("en-US")} rows
                  </button>
                  <button onClick={resetActive} className={`text-sm font-medium ${textSub}`}>Cancel</button>
                </div>
              </>
            )}
            {activeUpload.status === "imported" && (
              <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 flex items-center gap-2 text-sm text-green-700">
                <CheckCircle2 className="h-4 w-4" /> Import complete — your data is now reflected across the dashboards.
              </div>
            )}
          </div>
        )}
      </Panel>

      <DataQualityCard quality={displayedQuality} datasetLabel={activeDataset.label} dark={dark} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  APP ROOT                                                           */
/* ------------------------------------------------------------------ */

function ForecastingPage({ dark }) {
  const axisColor = dark ? "#64748B" : "#94A3B8";
  const gridColor = dark ? "#334155" : "#E2E8F0";
  const textMain = dark ? "text-white" : "text-slate-800";
  const textSub = dark ? "text-slate-400" : "text-slate-500";

  return (
    <div className="space-y-6">
      <Panel title="Demand Forecast" subtitle="Actual vs. forecasted units" dark={dark}>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={demandTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="m" tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="actual" stroke="#2563EB" strokeWidth={2.5} name="Actual" connectNulls={false} />
              <Line type="monotone" dataKey="forecast" stroke="#F59E0B" strokeWidth={2.5} strokeDasharray="5 4" name="Forecast" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <div className={`rounded-2xl border shadow-sm p-6 ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
        <span className="text-xs font-semibold tracking-wide uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Phase 2 — In progress</span>
        <h3 className={`text-lg font-semibold mt-3 ${textMain}`}>Full forecasting model in development</h3>
        <p className={`mt-2 text-sm ${textSub}`}>The chart above uses the same demand data the rest of the dashboard sees today. Once the Django backend's forecasting endpoint ships, it will replace the static forecast series with a live, seasonally-aware model.</p>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {["Seasonal trend detection", "Forecast accuracy score", "Recommended stock levels", "Per-product forecasts"].map((b) => (
            <div key={b} className={`flex items-start gap-2 text-sm rounded-xl px-3 py-2 ${dark ? "bg-slate-700/50 text-slate-300" : "bg-slate-50 text-slate-600"}`}>
              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />{b}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const AI_EXAMPLE_QUESTIONS = [
  "Which products need reordering?",
  "Why did sales decrease?",
  "Which customers have overdue payments?",
  "Forecast next month's demand.",
];

function AIAssistantPage({ dark }) {
  const [input, setInput] = useState("");
  const textMain = dark ? "text-white" : "text-slate-800";
  const textSub = dark ? "text-slate-400" : "text-slate-500";

  return (
    <div className="max-w-3xl space-y-6">
      <div className={`rounded-2xl border shadow-sm p-6 ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className={`font-semibold ${textMain}`}>Business AI Assistant</h2>
            <p className={`text-xs mt-0.5 ${textSub}`}>Ask plain-language questions about your live sales, inventory, and payments data.</p>
          </div>
        </div>

        <div className={`mt-5 rounded-xl px-4 py-3 text-sm flex items-start gap-2 ${dark ? "bg-slate-700/40 text-slate-300" : "bg-slate-50 text-slate-600"}`}>
          <Sparkles className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
          This is a preview of the assistant's interface. Answers will draw on your uploaded datasets once the backend connection is live.
        </div>

        <p className={`text-xs font-medium uppercase tracking-wide mt-5 mb-2 ${textSub}`}>Try asking</p>
        <div className="flex flex-wrap gap-2">
          {AI_EXAMPLE_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => setInput(q)}
              className={`text-sm px-3.5 py-2 rounded-xl border transition-colors ${dark ? "border-slate-700 text-slate-300 hover:bg-slate-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
            >
              {q}
            </button>
          ))}
        </div>

        <div className={`mt-6 flex items-center gap-2 rounded-2xl border px-4 py-3 ${dark ? "bg-slate-900 border-slate-700" : "bg-slate-50 border-slate-200"}`}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about sales, inventory, customers, or payments..."
            className={`flex-1 bg-transparent text-sm outline-none ${dark ? "text-slate-200 placeholder-slate-500" : "text-slate-700 placeholder-slate-400"}`}
          />
          <button disabled className="h-9 w-9 rounded-xl bg-blue-600 opacity-60 cursor-not-allowed flex items-center justify-center shrink-0">
            <Send className="h-4 w-4 text-white" />
          </button>
        </div>
        <p className={`text-xs mt-2 ${textSub}`}>Sending is disabled in this preview — no backend is connected yet.</p>
      </div>
    </div>
  );
}

const ROADMAP = {
  customers: { icon: Users, title: "Customers", description: "Full customer directory with growth, purchase patterns, and segments.", bullets: ["Customer growth chart", "Purchase history", "Segment analysis", "New vs. repeat vs. inactive"] },
  payments: { icon: CreditCard, title: "Payments", description: "Track outstanding, collected, pending, and overdue balances by customer.", bullets: ["Payment trend chart", "Status breakdown", "Payment methods", "Pending payments table"] },
  settings: { icon: Settings, title: "Settings", description: "Manage your profile, theme, notifications, security, and backups.", bullets: ["Profile & security", "Notification preferences", "Language settings", "Data backup"] },
  help: { icon: HelpCircle, title: "Help Center", description: "Guides, FAQs, and support contact for your team.", bullets: ["Getting started guide", "Video walkthroughs", "Contact support", "Release notes"] },
};

export default function App() {
  const [view, setView] = useState("landing"); // landing | login | app
  const [section, setSection] = useState("home");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  if (view === "landing") return <LandingPage onLogin={() => setView("login")} />;
  if (view === "login") return <LoginPage onSuccess={() => setView("app")} onBack={() => setView("landing")} />;

  const renderSection = () => {
    if (section === "home") return <HomePage dark={dark} setSection={setSection} />;
    if (section === "upload") return <UploadCenterPage dark={dark} />;
    if (section === "analytics") return <AnalyticsPage dark={dark} />;
    if (section === "inventory") return <InventoryPage dark={dark} />;
    if (section === "forecasting") return <ForecastingPage dark={dark} />;
    if (section === "ai") return <AIAssistantPage dark={dark} />;
    const r = ROADMAP[section];
    if (r) return <ComingSoon icon={r.icon} title={r.title} description={r.description} bullets={r.bullets} dark={dark} />;
    return null;
  };

  return (
    <div className={`min-h-screen ${dark ? "bg-slate-950" : "bg-slate-50"}`}>
      <Sidebar section={section} setSection={setSection} collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} dark={dark} onLogout={() => setView("landing")} />
      <div className={`${collapsed ? "md:pl-20" : "md:pl-64"} transition-all duration-200`}>
        <Navbar collapsed={collapsed} dark={dark} setDark={setDark} setMobileOpen={setMobileOpen} section={section} />
        <main className="p-4 sm:p-6">{renderSection()}</main>
      </div>
    </div>
);
}