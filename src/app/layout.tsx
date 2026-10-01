import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Octa Byte Capital | Portfolio Dashboard",
  description: "A live portfolio view for Octa Byte AI Pvt Ltd.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en"><body>{children}</body></html>
  );
}
