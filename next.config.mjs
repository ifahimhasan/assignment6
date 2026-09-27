/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets you open the dev server from your LAN IP (e.g. http://10.30.86.143:3000)
  // without Next.js blocking its dev scripts. Only affects `npm run dev`.
  allowedDevOrigins: ["10.30.86.143", "10.*.*.*", "192.168.*.*", "172.*.*.*"],

  images: {
    // Workout images are loaded straight from the API's image host by the browser.
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "img.magnific.com" }],
  },
};

export default nextConfig;
