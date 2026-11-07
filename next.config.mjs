/** @type {import('next').NextConfig} */
// Static export: `npm run build` writes a fully static site to ./out
// BASE_PATH is set automatically by the GitHub Pages workflow (e.g. "/venugopal-portfolio").
// Leave it empty for Vercel, Netlify or a custom domain.
const basePath = process.env.BASE_PATH || ''

const nextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  reactStrictMode: true,
}
export default nextConfig
