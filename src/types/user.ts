export interface SpotifyUserProfile {
    display_name: string | null;
    external_urls: {
      spotify: string;
    };
    followers: {
      href: null | string;
      total: number;
    };
    href: string;
    id: string;
    images: {
      height: null | number;
      url: string;
      width: null | number;
    }[];
    type: "user";
    uri: string;
  }
  