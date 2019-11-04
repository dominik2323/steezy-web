const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const prefix =
  process.env.NODE_ENV === 'production'
    ? 'http://steezy.cz'
    : 'http://localhost:3000';
module.exports = withCSS(
  withSass({
    env: {
      PREFIX: prefix
    },
    sassLoaderOptions: {
      data: `$prefix: "${prefix}";`
    }
  })
);
