import React from "react";
import { withAuth } from '../../components/withAuth';

const HomePage = () => {
  return <div>Home Page</div>;
};

export default withAuth(HomePage);