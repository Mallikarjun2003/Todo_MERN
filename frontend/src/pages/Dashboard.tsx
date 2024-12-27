import { useGlobalContext } from "@/contexts/ContextProvider";

const Dashboard = () => {
  const { setUser, user } = useGlobalContext();
  console.log(user);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.username}</p>
    </div>
  );
};

export default Dashboard;
