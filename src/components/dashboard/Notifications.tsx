"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Route } from "lucide-react";

const notifications = [
  {
    type: "traffic" as const,
    title: "Traffic alert",
    message: "Heavy congestion on Western Express Highway. Consider taking the metro.",
  },
  {
    type: "suggestion" as const,
    title: "Route suggestion",
    message: "A faster route to BKC is available via Metro Line 1.",
  },
];

export function Notifications() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm"
    >
      <h2 className="font-semibold text-[#111111] mb-4">Notifications</h2>
      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.title}
            className="flex gap-3 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-4"
          >
            <div className="shrink-0">
              {notif.type === "traffic" ? (
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              ) : (
                <Route className="h-5 w-5 text-[#22C55E]" />
              )}
            </div>
            <div className="min-w-0">
              <p className="font-medium text-[#111111]">{notif.title}</p>
              <p className="text-sm text-[#6B6B6B] mt-0.5">{notif.message}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
