import { Track } from "./track";

export interface Album {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: {
        height: number;
        url: string;
        width: number;
    }[];
    name: string;
    release_date: string;
    release_date_precision: string;
    type: string;
    uri: string;
    copyrights: {
        text: string;
        type: string;
    }[];
    external_ids: {
        upc: string;
        ean: string;
        isrc: string;
    };
    genres: string[];
    label: string;
    popularity: number;
    album_group: string;
    artists: {
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
    }[];
    tracks: {
        href: string;
        limit: number;
        next: string;
        offset: number;
        previous: string;
        total: number;
        items: Track[];
    }
}