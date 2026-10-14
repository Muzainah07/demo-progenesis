
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/800.css";
import "./globals.css";
import { SITE_URL } from "../data/team";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "PROGENESIS'27", template: "%s · PROGENESIS'27" },
  description: "The team behind PROGENESIS hackathons.",
};
export const viewport = { themeColor: "#f5eefa", viewportFit: "cover" };

export default function RootLayout({ children }) {
  return (<html lang="en"><body>{children}</body></html>);
}
