import { createLodable } from './router.utils';

export const AuthRouter = createLodable(() => import('./auth/router'));