import { RouteSearch } from "@/components/dashboard/RouteSearch";
import { RecentTrips } from "@/components/dashboard/RecentTrips";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { TrafficOverview } from "@/components/dashboard/TrafficOverview";
import { Notifications } from "@/components/dashboard/Notifications";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-sans text-2xl font-normal text-[#111111] mb-8">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Left column - Route search + Recent trips */}
        <div className="space-y-6">
          <RouteSearch />
          <RecentTrips />
        </div>

        {/* Center column - Quick stats + Traffic overview */}
        <div className="space-y-6">
          <QuickStats />
          <TrafficOverview />
        </div>

        {/* Right column - Notifications */}
        <div>
          <Notifications />
        </div>
      </div>
    </div>
  );
}
