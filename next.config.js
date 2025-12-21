const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'luszhdqasmwiqpohfwwo.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  /* config options here */
};

module.exports = nextConfig;