import "./globals.css";

export const metadata = {
  title: "Kurakani",
  description: "kurakani - the best way to chat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-calibre">{children}</body>
    </html>
  );
}
