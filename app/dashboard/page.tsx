import { FC } from 'react';
import { validateServerProtectedRoute } from '../_lib/check-auth';

interface DashboardProps {};

const Dashboard: FC<DashboardProps> = async ({}) => {
  const {user} = await validateServerProtectedRoute()
  return <div> This is Dashobard {user?.email}</div>;
};

export default Dashboard;