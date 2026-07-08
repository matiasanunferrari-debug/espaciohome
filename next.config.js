/** @type {import('next').NextConfig} */

function supabaseHostname() {
  try {
    return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname;
  } catch {
    return undefined;
  }
}

const hostname = supabaseHostname();

const nextConfig = {
  images: {
    remotePatterns: hostname
      ? [
          {
            protocol: 'https',
            hostname,
            pathname: '/storage/v1/object/public/**',
          },
        ]
      : [],
  },
};

module.exports = nextConfig;
