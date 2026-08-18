import type { Metadata } from "next";

import "./globals.scss";

export const metadata: Metadata = {
  title: "Lyra | Usuários",
  description: "Painel para testar o CRUD de usuários do Lyra",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
