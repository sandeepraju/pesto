import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static exports: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
  output: 'export',
  images: {
    // Since we are exporting building time, don't optimize images: https://nextjs.org/docs/messages/export-image-api
    // Disable optimization: https://nextjs.org/docs/pages/api-reference/components/image#unoptimized
    unoptimized: true,
  }
};

export default nextConfig;
