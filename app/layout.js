import "./globals.css";

export const metadata = {
  title: {
    default: "DevOrbit | 3D Developer Productivity Command Center",
    template: "%s | DevOrbit",
  },
  description:
    "DevOrbit is a futuristic frontend-first developer productivity command center that visualizes projects, tasks, commits, bugs, and insights through animated dashboards and a 3D orbit map.",
  keywords: [
    "DevOrbit",
    "Developer Productivity",
    "Next.js",
    "React",
    "Three.js",
    "Tailwind CSS",
    "Framer Motion",
    "Frontend Project",
    "Dashboard",
    "Portfolio Project",
  ],
  authors: [{ name: "Mustafa Malak" }],
  creator: "Mustafa Malak",
  openGraph: {
    title: "DevOrbit | 3D Developer Productivity Command Center",
    description:
      "A futuristic animated frontend project built with Next.js, React, Tailwind CSS, Three.js, Framer Motion, and Recharts.",
    type: "website",
    locale: "en_US",
    siteName: "DevOrbit",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevOrbit | 3D Developer Productivity Command Center",
    description:
      "A futuristic animated developer productivity command center with 3D project visualization.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}