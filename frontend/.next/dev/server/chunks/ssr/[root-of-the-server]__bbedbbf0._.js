module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/frontend/src/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_URL",
    ()=>API_URL,
    "apiCreateTrip",
    ()=>apiCreateTrip,
    "apiGeocode",
    ()=>apiGeocode,
    "apiGetNotifications",
    ()=>apiGetNotifications,
    "apiGetStats",
    ()=>apiGetStats,
    "apiGetTrips",
    ()=>apiGetTrips,
    "apiLogin",
    ()=>apiLogin,
    "apiSignUp",
    ()=>apiSignUp,
    "apiSmartRouteCoords",
    ()=>apiSmartRouteCoords,
    "apiSmartRouteText",
    ()=>apiSmartRouteText
]);
/**
 * TransitWin API client - connects frontend to FastAPI backend
 */ const API_BASE = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : ("TURBOPACK compile-time value", "http://localhost:8000") || "http://localhost:8000";
const API_URL = API_BASE;
function getToken() {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
}
function getHeaders(includeAuth = true) {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json"
    };
    const token = includeAuth ? getToken() : null;
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
}
async function apiSignUp(data) {
    const res = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: getHeaders(false),
        body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) {
        return {
            user: null,
            error: json.detail || "Signup failed"
        };
    }
    return {
        user: json
    };
}
async function apiLogin(email, password) {
    const form = new URLSearchParams();
    form.append("username", email);
    form.append("password", password);
    const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
        },
        body: form.toString()
    });
    const json = await res.json();
    if (!res.ok) {
        return {
            access_token: "",
            token_type: "bearer",
            error: json.detail || "Login failed"
        };
    }
    return json;
}
async function apiGeocode(q) {
    const res = await fetch(`${API_BASE}/transit/geocode?${new URLSearchParams({
        q
    })}`);
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Geocoding failed");
    }
    return res.json();
}
async function apiSmartRouteText(origin, destination) {
    const params = new URLSearchParams({
        origin,
        destination
    });
    const res = await fetch(`${API_BASE}/transit/smart-route-text?${params}`);
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Route search failed");
    }
    return res.json();
}
async function apiSmartRouteCoords(originLat, originLng, destLat, destLng) {
    const params = new URLSearchParams({
        origin_lat: String(originLat),
        origin_lng: String(originLng),
        dest_lat: String(destLat),
        dest_lng: String(destLng)
    });
    const res = await fetch(`${API_BASE}/transit/smart-route?${params}`);
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Route search failed");
    }
    return res.json();
}
async function apiGetTrips() {
    const res = await fetch(`${API_BASE}/trips/`, {
        headers: getHeaders()
    });
    if (!res.ok) {
        if (res.status === 401) return [];
        throw new Error("Failed to fetch trips");
    }
    return res.json();
}
async function apiCreateTrip(data) {
    const res = await fetch(`${API_BASE}/trips/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to create trip");
    }
    return res.json();
}
async function apiGetStats() {
    const res = await fetch(`${API_BASE}/stats/`, {
        headers: getHeaders()
    });
    if (!res.ok) {
        if (res.status === 401) return null;
        throw new Error("Failed to fetch stats");
    }
    return res.json();
}
async function apiGetNotifications() {
    const res = await fetch(`${API_BASE}/notifications/`, {
        headers: getHeaders()
    });
    if (!res.ok) {
        if (res.status === 401) return [];
        throw new Error("Failed to fetch notifications");
    }
    return res.json();
}
}),
"[project]/frontend/src/lib/auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCurrentUser",
    ()=>getCurrentUser,
    "getStoredUsers",
    ()=>getStoredUsers,
    "getToken",
    ()=>getToken,
    "signIn",
    ()=>signIn,
    "signOut",
    ()=>signOut,
    "signUp",
    ()=>signUp,
    "updatePassword",
    ()=>updatePassword,
    "updateUser",
    ()=>updateUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/api.ts [app-ssr] (ecmascript)");
;
const STORAGE_KEY = "transitwin_user";
const TOKEN_KEY = "transitwin_token";
const USERS_KEY = "transitwin_users";
function getToken() {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
}
function getStoredUsers() {
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
}
async function signUp(username, email, password) {
    try {
        const { user, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiSignUp"])({
            email,
            password,
            full_name: username
        });
        if (error) return {
            success: false,
            error
        };
        // Backend doesn't return token on signup - user must login
        const loginResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiLogin"])(email, password);
        if (loginResult.error) return {
            success: false,
            error: "Account created. Please login."
        };
        if (loginResult.access_token) {
            localStorage.setItem(TOKEN_KEY, loginResult.access_token);
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                username: user?.full_name ?? username,
                email: user?.email ?? email
            }));
        }
        return {
            success: true
        };
    } catch  {
        // Fallback to local storage if backend unreachable
        const users = getStoredUsers();
        if (users.some((u)=>u.email.toLowerCase() === email.toLowerCase())) {
            return {
                success: false,
                error: "Email already registered"
            };
        }
        if (users.some((u)=>u.username.toLowerCase() === username.toLowerCase())) {
            return {
                success: false,
                error: "Username already taken"
            };
        }
        users.push({
            username,
            email,
            password
        });
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            username,
            email
        }));
        return {
            success: true
        };
    }
}
async function signIn(email, password) {
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiLogin"])(email, password);
        if (result.error) {
            // Try local fallback
            const users = getStoredUsers();
            const user = users.find((u)=>u.email.toLowerCase() === email.toLowerCase());
            if (user && user.password === password) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({
                    username: user.username,
                    email: user.email
                }));
                return {
                    success: true
                };
            }
            return {
                success: false,
                error: result.error
            };
        }
        if (result.access_token) {
            localStorage.setItem(TOKEN_KEY, result.access_token);
            // Fetch user or use email - backend login doesn't return user; we store email
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                username: email.split("@")[0],
                email
            }));
        }
        return {
            success: true
        };
    } catch  {
        const users = getStoredUsers();
        const user = users.find((u)=>u.email.toLowerCase() === email.toLowerCase());
        if (!user || user.password !== password) {
            return {
                success: false,
                error: "Invalid email or password"
            };
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            username: user.username,
            email: user.email
        }));
        return {
            success: true
        };
    }
}
function signOut() {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function getCurrentUser() {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
}
function updateUser(updates) {
    const user = getCurrentUser();
    if (!user) return;
    const updated = {
        ...user,
        ...updates
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    const users = getStoredUsers();
    const idx = users.findIndex((u)=>u.email === user.email);
    if (idx >= 0) {
        users[idx] = {
            ...users[idx],
            ...updates
        };
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
}
function updatePassword(currentPassword, newPassword) {
    const user = getCurrentUser();
    if (!user) return {
        success: false,
        error: "Not logged in"
    };
    const users = getStoredUsers();
    const idx = users.findIndex((u)=>u.email === user.email);
    if (idx < 0 || users[idx].password !== currentPassword) {
        return {
            success: false,
            error: "Current password is incorrect"
        };
    }
    users[idx].password = newPassword;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return {
        success: true
    };
}
}),
"[project]/frontend/src/contexts/AuthContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/auth.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setUser((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentUser"])());
        setIsLoading(false);
    }, []);
    const signIn = async (email, password)=>{
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signIn"])(email, password);
        if (result.success) setUser((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentUser"])());
        return result;
    };
    const signUp = async (username, email, password)=>{
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signUp"])(username, email, password);
        if (result.success) setUser((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentUser"])());
        return result;
    };
    const signOut = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signOut"])();
        setUser(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            isLoading,
            signIn,
            signUp,
            signOut
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend/src/contexts/AuthContext.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
function useAuth() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
}),
"[project]/frontend/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/frontend/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bbedbbf0._.js.map