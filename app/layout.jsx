import Navbar from "../components/Navbar";
import Provider from "../components/Provider";
import "../styles/global.css";
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
  icons: {
    icon: ['/assets/images/logo.svg']
  }
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Navbar />
            {children}
            <Analytics/>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
