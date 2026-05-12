import type { Metadata } from "next";
// Usa require en lugar de import para evitar el error de TypeScript
const styles = require("./globals.css");

export const metadata: Metadata = {
  title: "Sintrópico Monitor",
  description: "Monitoreo de permacultura sintrópica",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
