import { FC } from 'react';
import { validateServerProtectedRoute } from '../_lib/check-auth';

interface DashboardProps {};

const Dashboard: FC<DashboardProps> = async ({}) => {
  const {user} = await validateServerProtectedRoute()
  return <div> Hello, {user?.firstName}</div>;
};

export default Dashboard;