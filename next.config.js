const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

module.exports = withCSS(
  withSass({
    env: { ROOT: __dirname },
    webpack: function(cfg, { isServer }) {
      const originalEntry = cfg.entry;
      cfg.entry = async () => {
        const entries = await originalEntry();
        if (
          entries['main.js'] &&
          !entries['main.js'].includes('./client/polyfills.js')
        ) {
          entries['main.js'].unshift('./client/polyfills.js');
        }

        return entries;
      };

      return { ...cfg, node: { fs: 'empty' } };
    },
  })
);
