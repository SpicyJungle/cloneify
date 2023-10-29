import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Layout } from "~/components/Layout";
import { PlaylistSection } from "~/components/playlistSection";
import { RecentlyPlayedCard } from "~/components/recentlyPlayedCard";
import useRecentTracks from "~/hooks/useRecentTracks";
import useSavedAlbums from "~/hooks/useSavedAlbums";
import useSpotifyPlaylists from "~/hooks/useSpotifyPlaylists";
import useFollowedArtists from "~/hooks/useFollowedArtists";
import type { Album } from "~/types/album";
import type { Playlist } from "~/types/playlist";
import type { PlayerResponse } from "~/types/PlayerResponse";
import { Artist } from "~/types/artist";
type DataProps = {
  data: PlayerResponse | null;
};
const Home: NextPage<DataProps> = ({ data }: DataProps) => {
  const { data: session, status } = useSession();
  const recentlyPlayed = useRecentTracks(session?.accessToken ?? "");
  const playlists = useSpotifyPlaylists(session?.accessToken ?? "");
  const followedArtist = useFollowedArtists(session?.accessToken ?? "");
  const [cardInfos, setCardInfos] = useState<(Playlist | Album)[]>([]);
  const savedAlbums = useSavedAlbums(session?.accessToken ?? "", 50);

  useEffect(() => {
    function getVerticalItemCardInfo() {
      if (recentlyPlayed?.items) {
        const foundContexts: string[] = [];
        const itms = recentlyPlayed.items;
        itms.forEach((item) => {
          if (
            foundContexts.includes(item.context?.href ?? "") ||
            foundContexts.length >= 6 ||
            item.context === null
          ) {
            return false;
          } else {
            foundContexts.push(item.context?.href ?? "");
            return true;
          }
        });

        if (foundContexts.length < 6) {
          if (!savedAlbums.albums) return foundContexts;
          const savedAlbumsItems = savedAlbums.albums;

          savedAlbumsItems.forEach(
            (item: { added_at: string; album: Album }) => {
              if (
                foundContexts.includes(item.album.href) ||
                foundContexts.length >= 6 ||
                !item.album.href
              ) {
                return false;
              } else {
                foundContexts.push(item.album.href);
                return true;
              }
            }
          );
        }

        return foundContexts;
      }
    }

    const fetchResults = async () => {
      const cardInfoUrls = getVerticalItemCardInfo();
      if (!cardInfoUrls) return;

      const fetchPromises = cardInfoUrls.map(async (url) => {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${session?.accessToken ?? ""}`,
          },
        });
        const itemData = (await response.json()) as object;

        return itemData;
      });

      const cardInfos = (await Promise.all(fetchPromises)) as (
        | Playlist
        | Album
      )[];
      setCardInfos(cardInfos);
    };

    void fetchResults();
  }, [session?.accessToken, recentlyPlayed.items, savedAlbums.albums]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const today = new Date();
  const hour = today.getHours();
  console.log(status)

  return (
    <Layout>
      <div className="h-full">
        { status === "authenticated" ? 
        <div className="flex h-full w-full flex-col gap-y-4">
          
          <div className="flex h-1/3 flex-col">
            <h3 className="mb-2 flex flex-row justify-between text-3xl font-bold text-white">
              {hour > 18 || hour < 3
                ? "Good Evening"
                : hour > 12
                ? "Good Afternoon"
                : "Good Morning"}
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cardInfos?.map((item: Album | Playlist) => {
                return (
                  <RecentlyPlayedCard
                  key={item.id}
                  data={{
                    title: item.name,
                      image: item?.images[0]?.url ?? "",
                    }}
                    />
                    );
                  })}
            </div>
          </div>
          <div className="flex h-full flex-col gap-y-4">
            {session?.accessToken && (
              <>
                <PlaylistSection
                  playlists={
                    playlists.playlists?.map((item) => {
                      return {
                        title: item.name,
                        image: item.images[0]?.url ?? "",
                        description: item.description,
                        key: item.id,
                      };
                    }) ?? []
                  }
                  sectionTitle="Your Playlists"
                  isArtists={false}
                  />
                <PlaylistSection
                  playlists={
                    followedArtist?.response?.map((item) => {
                      return {
                        title: item.name,
                        image: item.images[0]?.url ?? "",
                        description: "Artist",
                        key: item.id,
                      };
                    }) ?? []
                  }
                  sectionTitle="Your favorite artists"
                  isArtists={true}
                  />
                <PlaylistSection 
                  playlists={
                    savedAlbums.albums.map((item) => {
                      return {
                        title: item.album.name,
                        image: item.album.images[0]?.url ?? "",
                        description: item.album.artists.map((artist) => artist.name)
                        .join(", "),
                        key: item.album.id,
                      };
                    })
                  }
                  sectionTitle="Saved albums"
                  isArtists={false}
                  />
              </>
            )}
          </div>
        </div> : <h2 className="text-white">Not signed in, sign in to load your player status, playlists and saved albums.</h2>
        }
      </div>
    </Layout>
  );
};

export default Home;
