"use client";

import { motion } from "framer-motion";
import { Car, Train, Bus } from "lucide-react";

const routeOptions = [
  { id: "1", mode: "Car", icon: Car, time: "25 min", distance: "12 km", cost: "₹180" },
  { id: "2", mode: "Local train", icon: Train, time: "18 min", distance: "10 km", cost: "₹40", fastest: true },
  { id: "3", mode: "Bus", icon: Bus, time: "22 min", distance: "11 km", cost: "₹25" },
];

export function PlannerResults() {
  return (
    <div className="space-y-6">
      {/* Route options */}
      <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-[#111111] mb-4">Route options</h2>
        <div className="space-y-3">
          {routeOptions.map((route) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center gap-4 rounded-lg border p-4 transition-colors ${
                route.fastest
                  ? "border-[#22C55E] bg-[#22C55E]/5"
                  : "border-[#E5E5E5] bg-[#FAFAFA] hover:border-[#E5E5E5]"
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  route.fastest ? "bg-[#22C55E]/20 text-[#22C55E]" : "bg-[#E5E5E5] text-[#6B6B6B]"
                }`}
              >
                <route.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#111111]">
                    Route {route.id}
                  </span>
                  {route.fastest && (
                    <span className="rounded-full bg-[#22C55E] px-2 py-0.5 text-xs font-medium text-white">
                      Fastest
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#6B6B6B]">
                  {route.mode} • {route.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Route comparison */}
      <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm overflow-hidden">
        <h2 className="font-semibold text-[#111111] mb-4">Route comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[400px] text-sm">
            <thead>
              <tr className="border-b border-[#E5E5E5]">
                <th className="text-left py-3 font-medium text-[#111111]">Route</th>
                <th className="text-left py-3 font-medium text-[#111111]">Travel time</th>
                <th className="text-left py-3 font-medium text-[#111111]">Distance</th>
                <th className="text-left py-3 font-medium text-[#111111]">Estimated cost</th>
              </tr>
            </thead>
            <tbody>
              {routeOptions.map((route) => (
                <tr
                  key={route.id}
                  className="border-b border-[#E5E5E5] last:border-0"
                >
                  <td className="py-3">
                    <span className="font-medium text-[#111111]">
                      Route {route.id} ({route.mode})
                    </span>
                  </td>
                  <td className="py-3 text-[#6B6B6B]">{route.time}</td>
                  <td className="py-3 text-[#6B6B6B]">{route.distance}</td>
                  <td className="py-3 text-[#6B6B6B]">{route.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
