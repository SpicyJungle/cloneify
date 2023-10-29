import { useQuery } from "@tanstack/react-query";
import { type NextPage } from "next";
import Image from "next/image";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { Layout } from "~/components/Layout";
import type { Playlist } from "~/types/playlist";
import type { SpotifyUserProfile } from "~/types/user";

function LoadingSkeleton() {

  const fallbackImage =
    "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999";

  return (
    <div className="headerinfo flex h-60 w-full flex-row gap-4">
    <div
      className="aspect-square h-full rounded-md shadow-md"
      style={{
        backgroundImage: `url(${fallbackImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
    <div className="info ml-4 flex flex-col justify-between">
      <div className="titles mt-12">
        <LoadingSkeleton />
        <h1 className="text-7xl font-bold text-white">name</h1>
        <p className="text-zinc-400 text-sm">description</p>
      </div>
      <div className="flex flex-row gap-1 text-white items-center">
        <div
          className="aspect-square h-6 w-6 rounded-full shadow-md"
          style={{
            backgroundImage: `url(${fallbackImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <span className="font-bold">.....</span>
        <GoPrimitiveDot  className="text-xs"/>
        <span className="">0 likes</span>
        <GoPrimitiveDot  className="text-xs"/>
        <span className="">0 songs</span>
      </div>
    </div>
  </div>
  )
}

export default function Page() {
  const router = useRouter();
  const fallbackImage =
    "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999";
  const playlistId = router.query.id as string;

  const { status, data, error, isFetching, refetch } = useQuery({
    queryKey: [playlistId, "user"],
    queryFn: async (): Promise<{
      playlist: Playlist;
      user: SpotifyUserProfile;
    }> => {
      const playlistRes = await fetch(`/api/getPlaylist?id=${playlistId}`);
      const playlistD = (await playlistRes.json()) as Playlist;

      const userRes = await fetch(`/api/getUser?id=${playlistD.owner.id}`);
      const userD = (await userRes.json()) as SpotifyUserProfile;

      return {
        playlist: playlistD,
        user: userD,
      };
    },
    refetchInterval: 1000 * 3,
  });

  useEffect(() => {
    console.log("refetching")
    void refetch();
  }, [playlistId, refetch]);
  
  return (
    <Layout>
      <LoadingSkeleton />
    </Layout>
  );

  if (status === "error")
    return (
      <Layout>
        <div className="text-center text-2xl text-white">
          An error occured, status error
        </div>
      </Layout>
    );
  if (status === "loading")
  if (!data)
    return (
      <Layout>
        <div className="text-center text-2xl text-white">
          An error occured, data is undefined
        </div>
      </Layout>
    );
  const { playlist, user } = data;
  console.log(data);

  if (!playlist || !user)
    return (
      <Layout>
        <div className="text-center text-2xl text-white">
          An error occured, playlist or user is undefined
        </div>
      </Layout>
    );

  const { description, name } = playlist;
  const { display_name } = user;
  console.log(playlist);

  return (
    <Layout>
      <div className="headerinfo flex h-60 w-full flex-row gap-4">
        <div
          className="aspect-square h-full rounded-md shadow-md"
          style={{
            backgroundImage: `url(${
              playlist.images?.[0]?.url ?? fallbackImage
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="info ml-4 flex flex-col justify-between">
          <div className="titles mt-12">
            <h1 className="text-base text-white">
              {playlist.public ? "Public" : "Private"} Playlist
            </h1>
            <h1 className="text-7xl font-bold text-white">{name}</h1>
            <p className="text-zinc-400 text-sm">{description}</p>
          </div>
          <div className="flex flex-row gap-1 text-white items-center">
            <div
              className="aspect-square h-6 w-6 rounded-full shadow-md"
              style={{
                backgroundImage: `url(${
                  user.images?.[0]?.url ?? fallbackImage
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <span className="font-bold">{display_name}</span>
            <GoPrimitiveDot  className="text-xs"/>
            <span className="">{playlist.followers.total} likes</span>
            <GoPrimitiveDot  className="text-xs"/>
            <span className="">{playlist.tracks.total} songs</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
