import { usersRoutes } from './routes/userRoutes.js';

import { app } from "../../app.js";

await app.register(usersRoutes, {
  prefix: '/api',
});
