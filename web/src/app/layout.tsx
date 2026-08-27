import type { Metadata } from "next";
import { Indie_Flower } from "next/font/google";

import "./globals.scss";

const indieFlower = Indie_Flower({
    weight: "400",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Lyra",
    description: "Lyra",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <body className={indieFlower.className} suppressHydrationWarning>{children}</body>
        </html>
    );
}
