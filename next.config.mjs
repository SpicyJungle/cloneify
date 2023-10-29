/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '*/**',
      },    
      {
        protocol: 'https',
        hostname: 'mosaic.scdn.co',
        port: '',
        pathname: '*/**',
      },    
      {
        protocol: 'https',
        hostname: 'blend-playlist-covers.spotifycdn.com',
        port: '',
        pathname: '*/**',
      },    
      {
        protocol: 'https',
        hostname: 'image-cdn-ak.spotifycdn.com',
        port: '',
        pathname: '*/**',
      },    
      {
        protocol: 'https',
        hostname: 'image-cdn-fa.spotifycdn.com',
        port: '',
        pathname: '*/**',
      },    
      {
        protocol: 'https',
        hostname: 'st3.depositphotos.com',
        port: '',
        pathname: '*/**',
      },    
      {
        protocol: 'https',
        hostname: 'community.spotify.com',
        port: '',
        pathname: '*/**',
      },    
    ]
  }
};
export default config;
