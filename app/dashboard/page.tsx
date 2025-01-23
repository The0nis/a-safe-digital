import dynamic from "next/dynamic";

const DashboardClient = dynamic(
  () => import("@/components/page-component/dashboard-component"),
 
);
const Dashboard = () => {
  return <DashboardClient />;
};

export default Dashboard;
