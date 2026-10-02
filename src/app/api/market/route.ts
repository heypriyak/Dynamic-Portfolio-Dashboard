import { NextResponse } from "next/server";

const symbols = ["HDFCBANK.NS", "BAJFINANCE.NS", "ICICIBANK.NS", "BAJAJHFL.NS", "AFFLE.NS", "LTIM.NS", "KPITTECH.NS", "TATATECH.NS", "BLS.NS", "TANLA.NS", "DMART.NS", "TATACONSUM.NS", "PIDILITIND.NS", "TATAPOWER.NS", "KPIGREEN.NS", "SUZLON.NS", "GENSOL.NS", "HARIOMPIPE.NS", "ASTRAL.NS", "POLYCAB.NS", "CLEAN.NS", "DEEPAKNTR.NS", "FINEORG.NS", "GRAVITA.NS", "SBILIFE.NS", "INFY.NS", "HAPPSTMNDS.NS", "EASEMYTRIP.NS"];
const fallback = { HDFCBANK: 713, BAJFINANCE: 959, ICICIBANK: 1323, BAJAJHFL: 82, AFFLE: 1505, LTIM: null, KPITTECH: 500, TATATECH: 707, BLS: 329, TANLA: 492, DMART: 3805, TATACONSUM: 953, PIDILITIND: 1471, TATAPOWER: 359, KPIGREEN: 359, SUZLON: 39, GENSOL: 15, HARIOMPIPE: 341, ASTRAL: 1367, POLYCAB: 8040, CLEAN: 794, DEEPAKNTR: 1522, FINEORG: 5095, GRAVITA: 1448, SBILIFE: 1691, INFY: 995, HAPPSTMNDS: 310, EASEMYTRIP: 6 };

export async function GET() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols.join(",")}`, { next: { revalidate: 10 }, signal: controller.signal, headers: { "User-Agent": "portfolio-dashboard/1.0" } });
    if (!response.ok) throw new Error("Yahoo Finance request failed");
    const data = await response.json();
    const prices: Record<string, number | null> = { ...fallback };
    for (const quote of data.quoteResponse?.result || []) {
      const symbol = quote.symbol.replace(".NS", "") as keyof typeof fallback;
      prices[symbol] = quote.regularMarketPrice || prices[symbol];
    }
    return NextResponse.json(prices);
  } catch { return NextResponse.json(fallback); }
  finally { clearTimeout(timeout); }
}