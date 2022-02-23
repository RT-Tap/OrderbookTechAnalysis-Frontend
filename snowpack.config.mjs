/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: ['@snowpack/plugin-react-refresh', '@snowpack/plugin-dotenv'],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
    /* needed for bokeh because :  https://www.snowpack.dev/reference/common-error-details */
    namedExports: ['@bokeh/bokehjs', '@bokeh.slickgrid.v2.4.4102.js'],
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
