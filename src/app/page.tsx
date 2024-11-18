"use client";

import DashboardCard from "@/components/DashboardCard/DashboardCard";
import PageLayout from "@/components/pageLayout/pageLayout";
import PieChartComponent from "@/components/PieChart/PieChart";

export default function Home() {
  return (
    <PageLayout title="Contacts">
      <div className="pb-20">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <DashboardCard
              title="Total Contacts"
              value={1249}
              percentage={10}
            />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <DashboardCard title="Sales" value={10249} percentage={110} />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <DashboardCard title="Tasks" value={149} percentage={0.5} />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 mt-10">
          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <PieChartComponent />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
