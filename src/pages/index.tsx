import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { Sidebar } from "~/components/sidebar";
import { Header } from "~/components/header";
import { Player } from "~/components/player";
import { Layout } from "~/components/Layout";
import { PlaylistSection } from "~/components/playlistSection";

interface playlistCardInfo {
  title: string;
  description: string;
  image: string;
  key: string;
}

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="h-full">
        <div className="h-full">
          <PlaylistSection
            sectionTitle="Focus"
            playlists={[
              {
                title: "Peaceful Piano",
                description: "Relax and indulge with beautiful piano pieces",
                image:
                  "https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6",
                key: "peaceful-piano",
              },
              {
                title: "Deep Focus",
                description: "Keep calm and focus with ambient and post-rock music.",
                image:
                  "https://i.scdn.co/image/ab67706f000000025551996f500ba876bda73fa5",
                key: "deep-focus",
              },
              // {
              //   title: "Instrumental Study",
              //   description: "Focus with soft study music in the background.",
              //   image:
              //   "https://i.scdn.co/image/ab67706f00000002fe24d7084be472288cd6ee6c",
              //   key: "instrumental-study",
              // },
              // {
              //   title: "Focus Flow",
              //   description: "Uptempo instumental hip-hop beats.",
              //   image:
              //   "https://i.scdn.co/image/ab67706f00000002724554ed6bed6f051d9b0bfc",
              //   key: "focus-flow",
              // },
              // {
              //   title: "Beats to think to",
              //   description: "Focus with deep techno and tech house.",
              //   image:
              //   "https://i.scdn.co/image/ab67706f0000000296e08a91ef3c7a6e7bfaa9a6",
              //   key: "beats-to-think-to",
              // }
            ]} />
          
        </div>
      </div>
    </Layout>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
