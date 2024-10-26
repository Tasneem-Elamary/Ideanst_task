import express from 'express';
import {
    createOrganization,
    getOrganization,
    getAllOrganizations,
    updateOrganization,
    deleteOrganization,
    inviteUserToOrganization
} from '../controller/organization.controller';
import { isAuth } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/organization',isAuth, createOrganization);
router.get('/organization/:organization_id',isAuth, getOrganization);
router.get('/organization',isAuth, getAllOrganizations);
router.put('/organization/:organization_id',isAuth, updateOrganization);
router.delete('/organization/:organization_id',isAuth, deleteOrganization);
router.post('/organization/:organization_id/invite',isAuth, inviteUserToOrganization);

export default router;
