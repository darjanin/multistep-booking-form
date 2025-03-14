import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";

import "./styles/globals.css";
import Overview from "./overview";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <head>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700"
            rel="stylesheet"
          />
        </head>
        <body>
          <div className="grid min-h-dvh grid-cols-12">
            <main className="col-span-8 border-r bg-slate-50 p-4">
              {children}
            </main>
            <aside className="col-span-4 min-h-screen p-4">
              <Overview />
            </aside>
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
