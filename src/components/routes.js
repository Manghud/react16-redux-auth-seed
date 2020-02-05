import { createLodable } from './router.utils';

export const AuthRouter = createLodable(() => import('./auth/router'));
export const Dashboard = createLodable(() => import('./dashboard/'));