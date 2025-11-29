import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code, Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import { VisionModeProvider } from "@/context/VisionModeContext";
import ErrorBoundary from "@/components/ErrorBoundary";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

// Gaming/Futuristic font for headers (ROG-style aesthetic)
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Secondary futuristic font for subtitles
const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ankitdas.dev"),
  title: {
    default: "Ankit Das | Computer Vision Engineer",
    template: "%s | Ankit Das",
  },
  description:
    "Computer Vision Engineer specializing in deep learning, AI/ML systems, and production-ready vision pipelines. Building systems that see, understand, and act.",
  keywords: [
    "Computer Vision",
    "Machine Learning",
    "Deep Learning",
    "AI Engineer",
    "Python",
    "TensorFlow",
    "PyTorch",
    "YOLO",
    "OpenCV",
    "Portfolio",
  ],
  authors: [{ name: "Ankit Das" }],
  creator: "Ankit Das",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ankitdas.dev",
    siteName: "Ankit Das Portfolio",
    title: "Ankit Das | Computer Vision Engineer",
    description:
      "Building vision systems that see, understand, and act. Specializing in deep learning and production ML.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ankit Das - Computer Vision Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ankit Das | Computer Vision Engineer",
    description:
      "Building vision systems that see, understand, and act. Specializing in deep learning and production ML.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${firaCode.variable} ${orbitron.variable} ${rajdhani.variable} antialiased bg-void text-body`}
      >
        <ErrorBoundary>
          <VisionModeProvider>{children}</VisionModeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
