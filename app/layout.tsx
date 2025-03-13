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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "4fr 1fr",
              minHeight: "100dvh",
            }}
          >
            <main style={{ borderRight: "1px solid black" }}>{children}</main>
            <aside>
              <Overview />
            </aside>
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
