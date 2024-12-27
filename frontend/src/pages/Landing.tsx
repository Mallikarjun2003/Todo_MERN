import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <h1>Welcome to the Landing Page</h1>
      <p>This is the landing page for</p>
      <p>the task manager application</p>
      <Link to="/dashboard">
        <Button>Go to Dashboard</Button>
      </Link>
      <Link to="/signin">
        <Button>signin</Button>
      </Link>
      <Link to="/signup">
        <Button>signup</Button>
      </Link>
    </div>
  );
};

export default Landing;
