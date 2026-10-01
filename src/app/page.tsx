"use client";

import { useEffect, useMemo, useState } from "react";

type Holding = { symbol: string; yahooSymbol?: string; name: string; sector: string; exchange: "NSE" | "BSE"; purchasePrice: number; quantity: number; cmp: number | null; pe: number | null; earnings: number | null };
const startingHoldings: Holding[] = [
  { symbol: "HDFCBANK", yahooSymbol: "HDFCBANK.NS", name: "HDFC Bank", sector: "Financial", exchange: "NSE", purchasePrice: 1490, quantity: 50, cmp: 713, pe: 13.93, earnings: 51.21 },
  { symbol: "BAJFINANCE", yahooSymbol: "BAJFINANCE.NS", name: "Bajaj Finance", sector: "Financial", exchange: "NSE", purchasePrice: 6466, quantity: 15, cmp: 959, pe: 29.44, earnings: 32.58 },
  { symbol: "532174", yahooSymbol: "ICICIBANK.NS", name: "ICICI Bank", sector: "Financial", exchange: "BSE", purchasePrice: 780, quantity: 84, cmp: 1323, pe: 17.09, earnings: 77.38 },
  { symbol: "544252", yahooSymbol: "BAJAJHFL.NS", name: "Bajaj Housing", sector: "Financial", exchange: "BSE", purchasePrice: 130, quantity: 504, cmp: 82, pe: 67.27, earnings: 3.22 },
  { symbol: "511577", name: "Savani Financials", sector: "Financial", exchange: "BSE", purchasePrice: 24, quantity: 1080, cmp: 18, pe: null, earnings: -4.6 },
  { symbol: "AFFLE", yahooSymbol: "AFFLE.NS", name: "Affle India", sector: "Technology", exchange: "NSE", purchasePrice: 1151, quantity: 50, cmp: 1505, pe: 44.47, earnings: 33.83 },
  { symbol: "LTIM", yahooSymbol: "LTIM.NS", name: "LTI Mindtree", sector: "Technology", exchange: "NSE", purchasePrice: 4775, quantity: 16, cmp: null, pe: null, earnings: null },
  { symbol: "542651", yahooSymbol: "KPITTECH.NS", name: "KPIT Tech", sector: "Technology", exchange: "BSE", purchasePrice: 672, quantity: 61, cmp: 500, pe: 23.49, earnings: 21.29 },
  { symbol: "544028", yahooSymbol: "TATATECH.NS", name: "Tata Tech", sector: "Technology", exchange: "BSE", purchasePrice: 1072, quantity: 63, cmp: 707, pe: 51.51, earnings: 13.73 },
  { symbol: "544107", yahooSymbol: "BLS.NS", name: "BLS E-Services", sector: "Technology", exchange: "BSE", purchasePrice: 232, quantity: 191, cmp: 329, pe: 51.49, earnings: 6.39 },
  { symbol: "532790", yahooSymbol: "TANLA.NS", name: "Tanla", sector: "Technology", exchange: "BSE", purchasePrice: 1134, quantity: 45, cmp: 492, pe: 12.24, earnings: 51.03 },
  { symbol: "DMART", yahooSymbol: "DMART.NS", name: "Dmart", sector: "Consumer", exchange: "NSE", purchasePrice: 3777, quantity: 27, cmp: 3805, pe: 81.12, earnings: 46.9 },
  { symbol: "532540", yahooSymbol: "TATACONSUM.NS", name: "Tata Consumer", sector: "Consumer", exchange: "BSE", purchasePrice: 845, quantity: 90, cmp: 953, pe: 14.89, earnings: 137.64 },
  { symbol: "500331", yahooSymbol: "PIDILITIND.NS", name: "Pidilite", sector: "Consumer", exchange: "BSE", purchasePrice: 2376, quantity: 36, cmp: 1471, pe: 56.65, earnings: 25.97 },
  { symbol: "500400", yahooSymbol: "TATAPOWER.NS", name: "Tata Power", sector: "Power", exchange: "BSE", purchasePrice: 224, quantity: 225, cmp: 359, pe: 29.74, earnings: 12.07 },
  { symbol: "542323", yahooSymbol: "KPIGREEN.NS", name: "KPI Green", sector: "Power", exchange: "BSE", purchasePrice: 875, quantity: 50, cmp: 359, pe: 15.53, earnings: 23.12 },
  { symbol: "532667", yahooSymbol: "SUZLON.NS", name: "Suzlon", sector: "Power", exchange: "BSE", purchasePrice: 44, quantity: 450, cmp: 39, pe: 17.35, earnings: 2.27 },
  { symbol: "542851", yahooSymbol: "GENSOL.NS", name: "Gensol", sector: "Power", exchange: "BSE", purchasePrice: 998, quantity: 45, cmp: 15, pe: 16.8, earnings: 27.37 },
  { symbol: "543517", yahooSymbol: "HARIOMPIPE.NS", name: "Hariom Pipes", sector: "Pipes", exchange: "BSE", purchasePrice: 580, quantity: 60, cmp: 341, pe: 15.38, earnings: 22.18 },
  { symbol: "ASTRAL", yahooSymbol: "ASTRAL.NS", name: "Astral", sector: "Pipes", exchange: "NSE", purchasePrice: 1517, quantity: 56, cmp: 1367, pe: 63.8, earnings: 21.42 },
  { symbol: "542652", yahooSymbol: "POLYCAB.NS", name: "Polycab", sector: "Pipes", exchange: "BSE", purchasePrice: 2818, quantity: 28, cmp: 8040, pe: 42.37, earnings: 189.76 },
  { symbol: "543318", yahooSymbol: "CLEAN.NS", name: "Clean Science", sector: "Others", exchange: "BSE", purchasePrice: 1610, quantity: 32, cmp: 794, pe: 36.22, earnings: 21.91 },
  { symbol: "506401", yahooSymbol: "DEEPAKNTR.NS", name: "Deepak Nitrite", sector: "Others", exchange: "BSE", purchasePrice: 2248, quantity: 27, cmp: 1522, pe: 27.14, earnings: 43.25 },
  { symbol: "541557", yahooSymbol: "FINEORG.NS", name: "Fine Organic", sector: "Others", exchange: "BSE", purchasePrice: 4284, quantity: 16, cmp: 5095, pe: 27.14, earnings: 43.25 },
  { symbol: "533282", yahooSymbol: "GRAVITA.NS", name: "Gravita", sector: "Others", exchange: "BSE", purchasePrice: 2037, quantity: 8, cmp: 1448, pe: 27.14, earnings: 43.25 },
  { symbol: "540719", yahooSymbol: "SBILIFE.NS", name: "SBI Life", sector: "Others", exchange: "BSE", purchasePrice: 1197, quantity: 49, cmp: 1691, pe: 117.5, earnings: 3.71 },
  { symbol: "500209", yahooSymbol: "INFY.NS", name: "Infosys", sector: "Others", exchange: "BSE", purchasePrice: 1647, quantity: 36, cmp: 995, pe: 13.44, earnings: 74.02 },
  { symbol: "543237", yahooSymbol: "HAPPSTMNDS.NS", name: "Happiest Mind", sector: "Others", exchange: "BSE", purchasePrice: 1103, quantity: 45, cmp: 310, pe: 20.98, earnings: 14.8 },
  { symbol: "543272", yahooSymbol: "EASEMYTRIP.NS", name: "Easemytrip", sector: "Others", exchange: "BSE", purchasePrice: 20, quantity: 1332, cmp: 6, pe: 27.14, earnings: 43.25 },
];
const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
const decimal = new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const formatMoney = (value: number | null) => value === null ? "N/A" : money.format(value).replace("₹", "₹ ");
const gainClass = (value: number | null) => value === null ? "" : value >= 0 ? "gain" : "loss";

export default function Home() {
  const [holdings, setHoldings] = useState(startingHoldings);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Using the latest saved market snapshot");
  async function refreshPrices() {
    setLoading(true);
    try {
      const response = await fetch("/api/market", { cache: "no-store" });
      if (!response.ok) throw new Error("Market data unavailable");
      const prices: Record<string, number> = await response.json();
      setHoldings((current) => current.map((holding) => ({ ...holding, cmp: prices[holding.symbol] || holding.cmp })));
      setUpdatedAt(new Date()); setMessage("Prices refreshed from Yahoo Finance when available");
    } catch { setMessage("Live source unavailable; showing the saved snapshot"); }
    finally { setLoading(false); }
  }
  useEffect(() => { const timer = window.setInterval(refreshPrices, 15000); return () => window.clearInterval(timer); }, []);
  const rows = useMemo(() => holdings.map((holding) => { const investment = holding.purchasePrice * holding.quantity; const presentValue = holding.cmp === null ? null : holding.cmp * holding.quantity; return { ...holding, investment, presentValue, gainLoss: presentValue === null ? null : presentValue - investment }; }), [holdings]);
  const totals = useMemo(() => rows.reduce((summary, row) => ({ investment: summary.investment + row.investment, presentValue: summary.presentValue + (row.presentValue || 0), gainLoss: summary.gainLoss + (row.gainLoss || 0) }), { investment: 0, presentValue: 0, gainLoss: 0 }), [rows]);
  const sectors = useMemo(() => Object.entries(rows.reduce<Record<string, typeof rows>>((groups, row) => { (groups[row.sector] ||= []).push(row); return groups; }, {})).map(([name, sectorRows]) => ({ name, investment: sectorRows.reduce((sum, row) => sum + row.investment, 0), gainLoss: sectorRows.reduce((sum, row) => sum + (row.gainLoss || 0), 0) })), [rows]);
  const largest = [...rows].sort((a, b) => b.investment - a.investment)[0];
  return <main className="dashboard-shell">
    <header className="topbar"><div className="brand"><span className="brand-mark">OB</span><span>Octa Byte <b>Capital</b></span></div><div className="topbar-meta"><span className="live-dot" /> Market open <span className="topbar-date">30 Sep 2026</span></div></header>
    <section className="hero"><div><p className="eyebrow">PERSONAL PORTFOLIO / NSE</p><h1>Investment overview</h1><p className="subtext">A clear view of what your money is doing today.</p></div><div className="refresh-box"><span className={loading ? "spinner" : "live-dot"} />{message}<small>Last checked {updatedAt ? updatedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Waiting for refresh"}</small></div></section>
    <section className="metric-grid"><article className="metric-card primary"><span>Total portfolio</span><strong>{formatMoney(totals.presentValue)}</strong><em className={gainClass(totals.gainLoss)}>{totals.gainLoss >= 0 ? "+" : ""}{formatMoney(totals.gainLoss)} overall</em></article><article className="metric-card"><span>Invested capital</span><strong>{formatMoney(totals.investment)}</strong><em>Across {holdings.length} holdings</em></article><article className="metric-card"><span>Return on investment</span><strong className={gainClass(totals.gainLoss)}>{((totals.gainLoss / totals.investment) * 100).toFixed(2)}%</strong><em>Since purchase</em></article><article className="metric-card"><span>Largest position</span><strong>{largest.symbol}</strong><em>{((largest.investment / totals.investment) * 100).toFixed(1)}% of portfolio</em></article></section>
    <section className="content-grid"><div className="table-panel"><div className="panel-heading"><div><p className="eyebrow">POSITIONS</p><h2>Holdings</h2></div><button onClick={refreshPrices} disabled={loading}>{loading ? "Updating..." : "Refresh prices"}</button></div><div className="table-scroll"><table><thead><tr><th>Particulars</th><th>Buy price</th><th>Qty</th><th>Investment</th><th>Portfolio</th><th>Exchange</th><th>CMP</th><th>Present value</th><th>Gain / loss</th><th>P/E</th><th>Latest earnings</th></tr></thead><tbody>{rows.map((row) => <tr key={row.symbol}><td><strong>{row.name}</strong><small>{row.symbol}</small></td><td>{formatMoney(row.purchasePrice)}</td><td>{row.quantity}</td><td>{formatMoney(row.investment)}</td><td>{((row.investment / totals.investment) * 100).toFixed(1)}%</td><td><span className="exchange">{row.exchange}</span></td><td className="cmp">{formatMoney(row.cmp)}</td><td>{formatMoney(row.presentValue)}</td><td className={gainClass(row.gainLoss)}>{row.gainLoss !== null && row.gainLoss >= 0 ? "+" : ""}{formatMoney(row.gainLoss)}</td><td>{row.pe === null ? "N/A" : `${decimal.format(row.pe)}x`}</td><td>{formatMoney(row.earnings)}</td></tr>)}</tbody><tfoot><tr><td>Total</td><td>-</td><td>{holdings.reduce((sum, row) => sum + row.quantity, 0)}</td><td>{formatMoney(totals.investment)}</td><td>100%</td><td>-</td><td>-</td><td>{formatMoney(totals.presentValue)}</td><td className={gainClass(totals.gainLoss)}>{totals.gainLoss >= 0 ? "+" : ""}{formatMoney(totals.gainLoss)}</td><td>-</td><td>-</td></tr></tfoot></table></div><p className="source-note">Market data is indicative. CMP is requested from Yahoo Finance; P/E and earnings are kept with the portfolio snapshot because Google Finance has no official public API. Rows marked N/A were unavailable in the supplied report.</p></div><aside className="sector-panel"><div className="panel-heading"><div><p className="eyebrow">ALLOCATION</p><h2>By sector</h2></div></div>{sectors.map((sector) => <div className="sector-row" key={sector.name}><div className="sector-title"><strong>{sector.name}</strong><span>{((sector.investment / totals.investment) * 100).toFixed(1)}%</span></div><div className="bar"><i style={{ width: `${(sector.investment / totals.investment) * 100}%` }} /></div><div className="sector-values"><span>{formatMoney(sector.investment)} invested</span><b className={gainClass(sector.gainLoss)}>{sector.gainLoss >= 0 ? "+" : ""}{formatMoney(sector.gainLoss)}</b></div></div>)}</aside></section>
    <footer><span>Octa Byte AI Pvt Ltd · CIN U62099KA2025PTC201620</span><span>Data refreshes every 15 seconds</span></footer>
  </main>;
}
