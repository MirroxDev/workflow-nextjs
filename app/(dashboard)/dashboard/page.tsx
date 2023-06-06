import { SafeUser } from "@/app/types";
import getCurrentUser from "../../actions/getCurrentUser";
import DUserWidget from "@/app/components/dashboard/widgets/DUserWidget";

interface DashboardProps {
  currentUser?: SafeUser | null;
}

const Dashboard = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div>
      <div>
        <DUserWidget currentUser={currentUser} />
      </div>
      <div>Dashboard!</div>
    </div>
  );
};

export default Dashboard;
