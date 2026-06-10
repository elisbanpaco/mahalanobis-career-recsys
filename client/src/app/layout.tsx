import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Encuentra tu Órbita | Mahalanobis RecSys",
  description: "Test vocacional basado en Mahalanobis y el Modelo RIASEC para la Universidad Nacional del Altiplano de Puno.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
