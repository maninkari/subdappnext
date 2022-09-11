/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.experiments = { asyncWebAssembly: true }

    // generate wasm module in ".next/server" for ssr & ssg
    if (isServer) {
      config.output.webassemblyModuleFilename = './../static/wasm/[name].wasm'
    } else {
      config.output.webassemblyModuleFilename = 'static/wasm/[name].wasm'
    }
    return config
  },
}

module.exports = nextConfig
