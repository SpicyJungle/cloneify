import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import {
  BsClock,
  BsExplicitFill,
  BsFillHeartFill,
  BsPlayFill,
  BsThreeDots,
} from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { MdOutlineDownloadForOffline } from "react-icons/md";

import { Layout } from "~/components/Layout";
import { Skeleton } from "~/components/Skeleton";

import { Album } from "~/types/album";
import { Artist } from "~/types/artist";
import { Track } from "~/types/track";

function LoadingSkeleton() {
  const fallbackImage =
    "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999";

  return (
    <Layout>
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
            <Skeleton />
            <h1 className="text-7xl font-bold text-white">name</h1>
            <p className="text-sm text-zinc-400">description</p>
          </div>
          <div className="flex flex-row items-center gap-1 text-white">
            <div
              className="aspect-square h-6 w-6 rounded-full shadow-md"
              style={{
                backgroundImage: `url(${fallbackImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <span className="font-bold">.....</span>
            <GoPrimitiveDot className="text-xs" />
            <span className="">0 likes</span>
            <GoPrimitiveDot className="text-xs" />
            <span className="">0 songs</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const TrackLine = ({track}: { track: Track }) => {
  const durMinutes = Math.floor((track.duration_ms ?? 0) / 1000 / 60);
  const durSeconds = Math.floor(((track.duration_ms ?? 0) / 1000) % 60);

  return (
    <div className="trackGrid h-14 flex items-center justify-center bg-white bg-opacity-0 hover:bg-opacity-20 px-4 rounded-lg">
      <div className="text-grayText">{track.track_number}</div>
      <div className="flex flex-col">
        <span>{track.name}</span>
        <span className="text-sm text-grayText inline-flex items-center">
          {track.explicit && <BsExplicitFill className="mr-2"/>}
          {track.artists.map((artist: Artist) => {return artist.name}).join(", ")}
          </span>
        </div>
      <div className="text-grayText">{`${durMinutes}:${
            durSeconds <= 9 ? `0${durSeconds}` : durSeconds
          }`}</div>
    </div>
  )
};

const TrackSection = ({tracks}: { tracks: Track[]}) => {
  return (
    <div className="trackWrapper w-full flex flex-col">
      <div className="w-full titles text-zinc-400 trackGrid p-4 text-lg">
        <div className="number w-1/12">#</div>
        <div className="title w-4/12">Title</div>
        <div className="duration w-3/12"> <BsClock /> </div>
      </div>
      <hr className="h-px border-px bg-zinc-400 opacity-30"/>
      <div className="w-full flex flex-col gap-4 text-white mt-2">
          {
            tracks.map((track) => {
              return <TrackLine track={track} key={track.id} />
            })
          }
      </div>
    </div>
  );
};

export default function Page() {
  const router = useRouter();
  const fallbackImage =
    "https://community.spotify.com/t5/image/serverpage/image-id/55829iC2AD64ADB887E2A5/image-size/large?v=v2&px=999";
  const albumId = router.query.id as string;
  const { data: session } = useSession();

  const { status, data, error, isFetching, refetch } = useQuery({
    queryKey: [albumId],
    queryFn: async (): Promise<{
      album: Album;
      detailedArtist?: Artist; // get more info for artist image if there is only one artist
      duration: number;
    }> => {
      const albumResponse = await fetch(`/api/getAlbum?id=${albumId}`);
      const albumData = (await albumResponse.json()) as Album;
      const duration = albumData.tracks.items.reduce(
        (acc, curr) => acc + curr.duration_ms,
        0
      );

      if (albumData.artists.length === 1) {
        if (!albumData.artists[0]?.href || !session?.accessToken)
          return { album: albumData, duration };

        const detailedArtistResponse = await fetch(albumData.artists[0].href, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        const detailedArtistData =
          (await detailedArtistResponse.json()) as Artist;
        console.log(detailedArtistData);

        return {
          album: albumData,
          detailedArtist: detailedArtistData,
          duration
        };
      }

      return {
        album: albumData,
        duration
      };
    },
    refetchInterval: 1000 * 60,
  });

  useEffect(() => {
    void refetch();
  }, [albumId, refetch]);

  if (status === "error")
    return (
      <Layout>
        <div className="text-center text-2xl text-white">
          An error occured, status error
        </div>
      </Layout>
    );
  if (status === "loading") return <LoadingSkeleton />;
  if (!data)
    return (
      <Layout>
        <div className="text-center text-2xl text-white">
          An error occured, data is undefined
        </div>
      </Layout>
    );
  const { album } = data;

  if (!album || !album.name)
    return (
      <Layout>
        <div className="text-center text-2xl text-white">
          An error occured, album
        </div>
      </Layout>
    );

  const { name } = album;
  const minutes = Math.floor(data.duration / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const seconds = Math.floor(((data.duration / 1000) % 60) % 60);
  let durString = ""
  if (hours === 0) {
    durString = `${minutes} min ${seconds} sec`;
  } else {
    durString = `${hours} hrs ${minutes} min`;
  }

  return (
    <Layout>
      <div className="headerinfo flex h-52 w-full flex-row items-end gap-4 p-4">
        <div
          className="aspect-square h-full rounded-md shadow-md"
          style={{
            backgroundImage: `url(${album.images?.[0]?.url ?? fallbackImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="info ml-4 flex flex-col justify-between w-full">
          <div className="titles -mt-32 w-5/6">
            <h1 className="text-base text-white">Album</h1>
            <h1 title={name} className="text-6xl font-bold text-white text-ellipsis overflow-hidden whitespace-nowrap">{name}</h1>
          </div>
          <div className="flex flex-row items-center gap-1 text-white">
            <span className="flex flex-row items-center gap-x-1 font-bold">
              {!data.detailedArtist ? (
                album.artists.map((artist) => {
                  return (
                    <>
                      <span>{artist.name}</span>{" "}
                      <GoPrimitiveDot className="text-xs" />
                    </>
                  );
                })
              ) : (
                <>
                  <div
                    className="aspect-square h-6 w-6 rounded-full shadow-md"
                    style={{
                      backgroundImage: `url(${
                        data.detailedArtist.images?.[0]?.url ?? fallbackImage
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <span>{album.artists[0]?.name}</span>{" "}
                  <GoPrimitiveDot className="text-xs" />
                </>
              )}
            </span>
            <span className="">{album.release_date.slice(0, 4)}</span>
            <GoPrimitiveDot className="text-xs" />
            <span className="">{album.total_tracks} songs,</span>
            <span className=" text-grayText">{durString}</span>
          </div>
        </div>
      </div>
      <div className="h-full w-full bg-black bg-opacity-20 p-4 flex flex-col">
        <div className="buttons ml-4 inline-flex w-full gap-6">
          <div className="playButton flex aspect-square h-16 items-center justify-center rounded-full bg-spotifyGreen">
            <BsPlayFill className="text-5xl text-black" />
          </div>
          <BsFillHeartFill className="h-16 text-3xl text-spotifyGreen" />
          <MdOutlineDownloadForOffline className="h-16 text-3xl text-zinc-400" />
          <BsThreeDots className="h-16 text-3xl text-zinc-400" />
        </div>
        <TrackSection tracks={album.tracks.items} />
      </div>
    </Layout>
  );
}
