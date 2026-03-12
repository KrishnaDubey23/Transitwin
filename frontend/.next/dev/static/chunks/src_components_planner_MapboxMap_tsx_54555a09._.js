(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/planner/MapboxMap.tsx [app-client] (ecmascript, next/dynamic entry, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "static/chunks/node_modules_mapbox-gl_dist_mapbox-gl_24ee5a60.js",
  "static/chunks/_aa3f34b0._.js",
  {
    "path": "static/chunks/node_modules_mapbox-gl_dist_mapbox-gl_9438b0bd.css",
    "included": [
      "[project]/node_modules/mapbox-gl/dist/mapbox-gl.css [app-client] (css)"
    ]
  },
  "static/chunks/src_components_planner_MapboxMap_tsx_0e399d65._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/components/planner/MapboxMap.tsx [app-client] (ecmascript, next/dynamic entry)");
    });
});
}),
]);