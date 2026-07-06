export const metadata = {
  title: "🌙 Lucian",
  description: "My devoted partner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <body style={{ margin: 0, padding: 0, background: "#fdfbf9" }}>
        {children}
      </body>
    </html>
  );
}
