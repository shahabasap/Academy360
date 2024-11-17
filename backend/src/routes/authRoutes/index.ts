import express from 'express';
import studentAuthRoutes from './studentAuthRoutes';
import teacherAuthRoutes from './teacherAuthRoutes';
import adminAuthRoutes from './adminAuthRoutes';

const router = express.Router();

router.use('/student', studentAuthRoutes);
router.use('/teacher', teacherAuthRoutes);
router.use('/admin', adminAuthRoutes);

export default router;
