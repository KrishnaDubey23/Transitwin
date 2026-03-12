(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/src/components/planner/LeafletMap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LeafletMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const MUMBAI_CENTER = [
    19.076,
    72.8777
];
const FALLBACK_ROUTE = [
    [
        19.1197,
        72.8397
    ],
    [
        19.115,
        72.842
    ],
    [
        19.108,
        72.848
    ],
    [
        19.095,
        72.855
    ],
    [
        19.08,
        72.862
    ],
    [
        19.0596,
        72.8656
    ]
];
// Fix Leaflet default icon in Next.js
const DefaultIcon = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [
        25,
        41
    ],
    iconAnchor: [
        12,
        41
    ]
});
__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Marker.prototype.options.icon = DefaultIcon;
function LeafletMap({ source, destination, selectedRoute }) {
    _s();
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Create map on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeafletMap.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") === "undefined" || !containerRef.current) return;
            const map = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].map(containerRef.current, {
                center: MUMBAI_CENTER,
                zoom: 13
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution: "© OpenStreetMap"
            }).addTo(map);
            mapRef.current = map;
            return ({
                "LeafletMap.useEffect": ()=>{
                    map.remove();
                    mapRef.current = null;
                }
            })["LeafletMap.useEffect"];
        }
    }["LeafletMap.useEffect"], []);
    // Update markers and route when data changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeafletMap.useEffect": ()=>{
            const map = mapRef.current;
            if (!map) return;
            const origin = selectedRoute?.originCoords;
            const dest = selectedRoute?.destCoords;
            let polyline = selectedRoute?.polyline ?? [];
            if (polyline.length === 0 && selectedRoute && (source || destination)) {
                polyline = FALLBACK_ROUTE;
            }
            const hasOrigin = origin ?? (polyline.length > 0 ? {
                lat: polyline[0][0],
                lng: polyline[0][1]
            } : null);
            const hasDest = dest ?? (polyline.length > 0 ? {
                lat: polyline[polyline.length - 1][0],
                lng: polyline[polyline.length - 1][1]
            } : null);
            // Clear markers and polyline
            map.eachLayer({
                "LeafletMap.useEffect": (layer)=>{
                    if (layer instanceof __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Marker || layer instanceof __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Polyline) {
                        map.removeLayer(layer);
                    }
                }
            }["LeafletMap.useEffect"]);
            const bounds = [];
            if (hasOrigin) {
                const pos = [
                    hasOrigin.lat,
                    hasOrigin.lng
                ];
                __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].marker(pos).addTo(map).bindPopup(source || "Origin");
                bounds.push(pos);
            }
            if (hasDest) {
                const pos = [
                    hasDest.lat,
                    hasDest.lng
                ];
                __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].marker(pos).addTo(map).bindPopup(destination || "Destination");
                bounds.push(pos);
            }
            if (polyline.length >= 2) {
                const latLngs = polyline.map({
                    "LeafletMap.useEffect.latLngs": (p)=>[
                            p[0],
                            p[1]
                        ]
                }["LeafletMap.useEffect.latLngs"]);
                __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].polyline(latLngs, {
                    color: "#22C55E",
                    weight: 5,
                    opacity: 0.9
                }).addTo(map);
                bounds.push(...latLngs);
            }
            if (bounds.length >= 2) {
                map.fitBounds(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].latLngBounds(bounds), {
                    padding: [
                        30,
                        30
                    ],
                    maxZoom: 15
                });
            }
        }
    }["LeafletMap.useEffect"], [
        source,
        destination,
        selectedRoute
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "h-full w-full min-h-[400px] rounded-lg",
        style: {
            minHeight: 400
        }
    }, void 0, false, {
        fileName: "[project]/frontend/src/components/planner/LeafletMap.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
_s(LeafletMap, "cmwORyvLwqz9G+75ppUJjSEKcfo=");
_c = LeafletMap;
var _c;
__turbopack_context__.k.register(_c, "LeafletMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/components/planner/LeafletMap.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/frontend/src/components/planner/LeafletMap.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=frontend_src_components_planner_LeafletMap_tsx_b1c6ef0e._.js.map