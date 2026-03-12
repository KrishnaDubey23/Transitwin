(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/src/components/traffic/TrafficLeafletMap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TrafficLeafletMap",
    ()=>TrafficLeafletMap
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
const TRAFFIC_SEGMENTS = [
    {
        coords: [
            [
                19.13,
                72.84
            ],
            [
                19.08,
                72.84
            ],
            [
                19.06,
                72.83
            ]
        ],
        level: "green"
    },
    {
        coords: [
            [
                19.06,
                72.83
            ],
            [
                19.04,
                72.85
            ],
            [
                19.02,
                72.86
            ]
        ],
        level: "yellow"
    },
    {
        coords: [
            [
                19.08,
                72.84
            ],
            [
                19.07,
                72.86
            ],
            [
                19.06,
                72.88
            ]
        ],
        level: "red"
    },
    {
        coords: [
            [
                19.10,
                72.82
            ],
            [
                19.08,
                72.83
            ],
            [
                19.06,
                72.84
            ]
        ],
        level: "green"
    },
    {
        coords: [
            [
                19.05,
                72.87
            ],
            [
                19.04,
                72.88
            ],
            [
                19.02,
                72.90
            ]
        ],
        level: "yellow"
    }
];
const TRAFFIC_ZONES = [
    {
        lat: 19.08,
        lng: 72.85,
        radius: 1.5,
        level: "green"
    },
    {
        lat: 19.06,
        lng: 72.86,
        radius: 1.2,
        level: "yellow"
    },
    {
        lat: 19.04,
        lng: 72.88,
        radius: 1.0,
        level: "red"
    },
    {
        lat: 19.10,
        lng: 72.84,
        radius: 1.3,
        level: "green"
    },
    {
        lat: 19.02,
        lng: 72.87,
        radius: 1.1,
        level: "yellow"
    }
];
const COLORS = {
    green: "#22C55E",
    yellow: "#EAB308",
    red: "#EF4444"
};
function getOpacity(viewMode, level) {
    if (viewMode === "peak") return level === "red" ? 0.65 : 0.4;
    if (viewMode === "density") return 0.5;
    return 0.35;
}
function TrafficLeafletMap({ viewMode }) {
    _s();
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const layersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TrafficLeafletMap.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const container = document.getElementById("traffic-map-container");
            if (!container || mapRef.current) return;
            const map = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].map(container, {
                center: MUMBAI_CENTER,
                zoom: 12
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution: "© OpenStreetMap"
            }).addTo(map);
            __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].control.zoom({
                position: "topright"
            }).addTo(map);
            mapRef.current = map;
            return ({
                "TrafficLeafletMap.useEffect": ()=>{
                    map.remove();
                    mapRef.current = null;
                }
            })["TrafficLeafletMap.useEffect"];
        }
    }["TrafficLeafletMap.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TrafficLeafletMap.useEffect": ()=>{
            const map = mapRef.current;
            if (!map) return;
            // Remove previous overlays
            layersRef.current.forEach({
                "TrafficLeafletMap.useEffect": (layer)=>map.removeLayer(layer)
            }["TrafficLeafletMap.useEffect"]);
            layersRef.current = [];
            const weight = viewMode === "density" ? 8 : 6;
            // Road segments (polylines)
            TRAFFIC_SEGMENTS.forEach({
                "TrafficLeafletMap.useEffect": (seg)=>{
                    const opacity = getOpacity(viewMode, seg.level);
                    const polyline = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].polyline(seg.coords, {
                        color: COLORS[seg.level],
                        weight,
                        opacity: 0.9
                    }).addTo(map);
                    layersRef.current.push(polyline);
                }
            }["TrafficLeafletMap.useEffect"]);
            // Heatmap/density zones (circles)
            const radiusScale = viewMode === "peak" ? 1.2 : viewMode === "density" ? 1.1 : 1;
            TRAFFIC_ZONES.forEach({
                "TrafficLeafletMap.useEffect": (zone)=>{
                    const opacity = getOpacity(viewMode, zone.level);
                    const circle = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].circle([
                        zone.lat,
                        zone.lng
                    ], {
                        radius: zone.radius * 1000 * radiusScale,
                        color: COLORS[zone.level],
                        fillColor: COLORS[zone.level],
                        fillOpacity: opacity,
                        weight: 2
                    }).addTo(map);
                    layersRef.current.push(circle);
                }
            }["TrafficLeafletMap.useEffect"]);
        }
    }["TrafficLeafletMap.useEffect"], [
        viewMode
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: "traffic-map-container",
        className: "w-full h-[calc(100vh-10rem)] min-h-[400px]",
        style: {
            minHeight: 400
        }
    }, void 0, false, {
        fileName: "[project]/frontend/src/components/traffic/TrafficLeafletMap.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, this);
}
_s(TrafficLeafletMap, "nwjgk3sJOnBW7+WxsMkbdEL15og=");
_c = TrafficLeafletMap;
var _c;
__turbopack_context__.k.register(_c, "TrafficLeafletMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/components/traffic/TrafficLeafletMap.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/frontend/src/components/traffic/TrafficLeafletMap.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=frontend_src_components_traffic_TrafficLeafletMap_tsx_c8e242d5._.js.map