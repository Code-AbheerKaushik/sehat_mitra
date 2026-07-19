import "./globals.css";

export const metadata = {
  title: "SehatMitra",
  description: "Healthcare guidance and local health resources.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
