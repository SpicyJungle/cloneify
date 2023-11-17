import Head from "next/head";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { useEffect, type ReactNode } from "react";
import { Player } from "./player";
import { useQuery } from "@tanstack/react-query";
import type { PlayerResponse } from "~/types/PlayerResponse";
import { useSession } from "next-auth/react";

export const Layout = ({ children }: { children: ReactNode }) => {
  // add a scrolling listener
  useEffect(() => {
    const mainContentWindow = document.getElementById("main_content");

    if (mainContentWindow) {
      mainContentWindow.addEventListener("scroll", () => {
        if (mainContentWindow.scrollTop > 0) {
          const header = document.querySelector("header");
          if (!header) return;
  
          const opacity = Math.ceil((100 / (mainContentWindow.scrollHeight/4)) * mainContentWindow.scrollTop);
          header.style.backgroundColor = `rgba(64,64,68,${opacity / 100})`;

        } else {
          const header = document.querySelector("header");
          if (!header) return;
          header.classList.remove("bg-black");
        }
      });
    }
  }, [])


  const { data: session } = useSession();

  const { status, data, error, isFetching } = useQuery({
    queryKey: ["player"],
    queryFn: async (): Promise<PlayerResponse | null> => {
      if (!session) return null;
      const res = await fetch(`https://api.spotify.com/v1/me/player`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}}`,
        },
      });
      const d = (await res.json()) as PlayerResponse;
      return d;
    },
    refetchInterval: 1000,
  });
  
  return (
    <main className="flex h-screen max-h-screen w-screen flex-col overflow-x-hidden overflow-y-hidden bg-black">
      <Head>
        <title>Cloneify</title>
        <meta
          name="description"
          content="A clone of spotify, just for practice."
        />
        <link rel="icon" href="/Untitled.png" />
      </Head>
      <div className="max-w-screen flex h-[90%] w-screen flex-row p-2">
        <Sidebar data={data ?? null}/>

        <div
          className="collectionScroller ml-2 h-full w-full overflow-y-scroll rounded-lg bg-gradient-to-b from-[#404444] to-[#121212] to-70%"
          id="main_content"
        >
          <div className="sticky top-0 z-50">
            <Header />
          </div>
          <div className="h-full">{children}</div>
        </div>
      </div>
      <div className="h-[12%]">
        <Player data={data ?? null}/>
      </div>
    </main>
  );
};
