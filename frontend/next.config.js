const nextConfig = {
    reactStrictMode: true,
    profiler: true,
};

module.exports = {
    ...nextConfig,
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.externals.push({
                bufferutil: "bufferutil",
                "utf-8-validate": "utf-8-validate",
                "supports-color": "supports-color",
            });
        }

        return config;
    },
};
