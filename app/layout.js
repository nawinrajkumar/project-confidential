import "./globals.css";
import { Parisienne, Poppins } from "next/font/google";


const headingFont = Parisienne({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

const bodyFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata = {
  title: "A Little Surprise",
  description: "Something I made for you ❤️",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${headingFont.variable} ${bodyFont.className} relative`}
        suppressHydrationWarning
      >

        <div className="background-wallpaper" />

        <div className="relative z-10">
          {children}
        </div>

      </body>
    </html>
  );
}