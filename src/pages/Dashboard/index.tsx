import DataTable from "./DataTable";
import React from "react";
import { useSession } from "../../contexts/SessionContext";

const Dashboard: React.FC = () => {
  const { logout, user } = useSession();

  return (
    <div>
      <h2>Welcome, {user?.email ?? "User"}</h2>
      <button onClick={logout}>Logout</button>
      <DataTable />
    </div>
  );
};

export default Dashboard;
