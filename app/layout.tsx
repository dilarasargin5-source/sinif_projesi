import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DILARA SARGIN — Yaratıcı Günlük",
  description: "Dilara Sargın’ın moda, dijital kültür, yaratıcı yön ve görsel hikâye anlatımını buluşturan bağımsız dijital günlüğü.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="tr"><body>{children}</body></html>;
}
