import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/Auth.routes';
import rolesRoutes from './modules/roles/Roles.routes';
import employeesRoutes from './modules/employees/Employees.routes';
import agentsRoutes from './modules/agents/Agents.routes';
import locationsRoutes from './modules/locations/Locations.routes';
import fleetsRoutes from './modules/fleets/Fleets.routes';
import schedulesRoutes from './modules/schedules/Schedules.routes';
import tripsRoutes from './modules/trips/Trips.routes';
import ticketsRoutes from './modules/tickets/Tickets.routes';
import couponsRoutes from './modules/coupons/Coupons.routes';
import taxesRoutes from './modules/taxes/Taxes.routes';
import paymethodsRoutes from './modules/paymethods/Paymethods.routes';
import accountsRoutes from './modules/accounts/Accounts.routes';
import reportsRoutes from './modules/reports/Reports.routes';
import pagesRoutes from './modules/pages/Pages.routes';
import blogsRoutes from './modules/blogs/Blogs.routes';
import ratingsRoutes from './modules/ratings/Ratings.routes';
import inquiriesRoutes from './modules/inquiries/Inquiries.routes';
import vehiclesRoutes from './modules/vehicles/Vehicles.routes';
import passangersRoutes from './modules/passangers/Passangers.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Base Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Bus API is running' });
});

// Modules
app.use('/api/auth', authRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/employees', employeesRoutes);
app.use('/api/agents', agentsRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api/fleets', fleetsRoutes);
app.use('/api/schedules', schedulesRoutes);
app.use('/api/trips', tripsRoutes);
app.use('/api/tickets', ticketsRoutes);
app.use('/api/coupons', couponsRoutes);
app.use('/api/taxes', taxesRoutes);
app.use('/api/paymethods', paymethodsRoutes);
app.use('/api/accounts', accountsRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/pages', pagesRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/ratings', ratingsRoutes);
app.use('/api/inquiries', inquiriesRoutes);
app.use('/api/vehicles', vehiclesRoutes);
app.use('/api/passangers', passangersRoutes);



export default app;
