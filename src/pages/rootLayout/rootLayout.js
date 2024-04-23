import { Inter } from "next/font/google";
const fontInter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return <main className={fontInter.className}>{children}</main>;
}
