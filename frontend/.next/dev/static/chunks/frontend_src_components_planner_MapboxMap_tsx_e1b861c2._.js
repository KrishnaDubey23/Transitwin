(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/src/components/planner/MapboxMap.tsx [app-client] (ecmascript, next/dynamic entry, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "static/chunks/9e883_mapbox-gl_dist_mapbox-gl_314cf4f3.js",
  "static/chunks/frontend_194d9093._.js",
  {
    "path": "static/chunks/9e883_mapbox-gl_dist_mapbox-gl_7598ed2d.css",
    "included": [
      "[project]/frontend/node_modules/mapbox-gl/dist/mapbox-gl.css [app-client] (css)"
    ]
  },
  "static/chunks/frontend_src_components_planner_MapboxMap_tsx_7be95e21._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/frontend/src/components/planner/MapboxMap.tsx [app-client] (ecmascript, next/dynamic entry)");
    });
});
}),
]);