
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'C:/Program Files/Git/arcadia-travel-new',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "node_modules/@angular/animations/fesm2022/browser.mjs": [
    {
      "path": "chunk-FAQ2M3MA.js",
      "dynamicImport": false
    }
  ]
},
  assets: {
    'index.csr.html': {size: 14670, hash: '55f2d092b6b43439640a1d59eaf3a157572a0f37f62ed5da772a7b787bfe497a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 14662, hash: '85a600739bdb94c22f6c01831f8dc21eeed4cd9fa61401f3a8cd7e9de1c5780b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-G3PK3NA2.css': {size: 15818, hash: 'TK94CfJXruM', text: () => import('./assets-chunks/styles-G3PK3NA2_css.mjs').then(m => m.default)}
  },
};
