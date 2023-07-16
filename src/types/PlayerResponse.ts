import type { Track } from "./track";

export interface PlayerResponse {
    device: {
      id: string;
      is_active: boolean;
      is_private_session: false;
      is_restricted: false;
      name: string;
      type: string;
      volume_percent: number;
    };
    repeat_state: "off" | "track" | "context";
    shuffle_state: boolean;
    context: {
      type: string;
      href: string;
      external_urls: {
        spotify: string;
      };
      uri: string;
    };
    timestamp: number;
    progress_ms: number;
    is_playing: boolean;
    item: Track;
  }