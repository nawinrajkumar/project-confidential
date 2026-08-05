export const metadata = {
  title: "A Little Surprise",
  description: "Something I made for you ❤️",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}