import './globals.css'

export const metadata = {
  title: 'التوانسة اليوم - Tunisians Today',
  description: 'موقع إخباري بالعربية والفرنسية',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
