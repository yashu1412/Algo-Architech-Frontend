import DashboardHeader from "@/components/layout/DashboardHeader";
import CommodityChart from "@/components/chart/CommodityChart";
import UsersTable from "@/components/table/UsersTable";

export default function Home() {
  return (
    <main className="dashboard-container">
      <DashboardHeader />
      <CommodityChart />
      <UsersTable />
    </main>
  );
}
