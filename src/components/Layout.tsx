import Head from "next/head";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import type { ReactNode } from "react"
import { Player } from "./player";


export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="flex h-screen max-h-screen w-screen flex-col overflow-x-hidden bg-black">
        <Head>
          <title>Cloneify</title>
          <meta
            name="description"
            content="A clone of spotify, just for practice."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex w-screen max-w-screen h-[90%] flex-row p-2">
          <Sidebar />
          {/* <div className="ml-2 flex w-full h-full flex-col rounded-lg bg-gradient-to-b from-[#082112] to-[#121212] to-30%">
            <Header />
            {children}
          </div> */}

          <div className="flex flex-col bg-slate-500 max-w-full h-full ml-2 rounded-lg">
            
            <div className="header-container">
              <Header />
            </div>
            <div className="main-content bg-slate-900 h-full rounded-lg">
              {children}
            </div>
          </div>
        </div>
          <Player />
      </main>
    )
};