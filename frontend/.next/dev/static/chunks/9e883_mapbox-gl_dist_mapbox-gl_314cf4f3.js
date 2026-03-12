(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/node_modules/mapbox-gl/dist/mapbox-gl.js [app-client] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "static/chunks/9e883_mapbox-gl_dist_mapbox-gl_d60d2211.js",
  "static/chunks/9e883_mapbox-gl_dist_mapbox-gl_fa1a6a50.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/frontend/node_modules/mapbox-gl/dist/mapbox-gl.js [app-client] (ecmascript)");
    });
});
}),
]);