import "./globals.css";

export const metadata = {
  title: "DevOrbit | Developer Productivity Command Center",
  description:
    "A futuristic 3D developer productivity dashboard for visualizing projects, tasks, commits, bugs, and insights.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}