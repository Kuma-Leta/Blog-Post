import React from "react";
import { Link } from "react-router-dom";
const SystemOverview: React.FC = () => {
  return (
    <>
      <div>
        <Link to="/login">login</Link>
      </div>
      <div>
        <Link to="/signup">signup</Link>
      </div>
    </>
  );
};
export default SystemOverview;
