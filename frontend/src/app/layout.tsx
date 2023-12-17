import UserProvider from "@/contexts/UserContext";
import "./globals.css";
import localFont from "next/font/local";
import { Metadata } from "next";
import 'react-tooltip/dist/react-tooltip.css'

const calibre = localFont({
  src: [
    { path: "../../public/fonts/CalibreRegular.otf", weight: "normal" },
    { path: "../../public/fonts/CalibreMedium.otf", weight: "500" },
    { path: "../../public/fonts/CalibreLight.otf", weight: "300" },
    { path: "../../public/fonts/CalibreSemibold.otf", weight: "600" },
    { path: "../../public/fonts/CalibreBold.otf", weight: "bold" },
  ],
});

export const metadata: Metadata = {
  title: "Kurakani",
  description: "kurakani - the best way to chat",
  icons: "/images/logo.png"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={calibre.className}>{children}</body>
      </UserProvider>
    </html>
  );
}
