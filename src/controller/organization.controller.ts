import { Request, Response } from 'express';
import Organization from '../models/organizaton.model';
import User from '../models/user.model';

export const createOrganization = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const organization = new Organization({ name, description });
        await organization.save();
        res.status(201).json({ organization_id: organization._id });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create organization', error });
    }
};

export const getOrganization = async (req: Request, res: Response):Promise<any> => {
    try {
        const { organization_id } = req.params;
        const organization = await Organization.findById(organization_id).populate('members');
        if (!organization) return res.status(404).json({ message: 'Organization not found' });
        res.json(organization);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get organization', error });
    }
};

export const getAllOrganizations = async (req: Request, res: Response) => {
    try {
        const organizations = await Organization.find().populate('members');
        res.json(organizations);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve organizations', error });
    }
};

export const updateOrganization = async (req: Request, res: Response) :Promise<any>=> {
    try {
        const { organization_id } = req.params;
        const { name, description } = req.body;
        const organization = await Organization.findByIdAndUpdate(organization_id, { name, description }, { new: true });
        if (!organization) return res.status(404).json({ message: 'Organization not found' });
        res.json(organization);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update organization', error });
    }
};

export const deleteOrganization = async (req: Request, res: Response) => {
    try {
        const { organization_id } = req.params;
        await Organization.findByIdAndDelete(organization_id);
        res.json({ message: 'Organization deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete organization', error });
    }
};

export const inviteUserToOrganization = async (req: Request, res: Response):Promise<any> => {
    try {
        const { organization_id } = req.params;
        const { user_email } = req.body;

        const user = await User.findOne({ email: user_email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        await Organization.findByIdAndUpdate(organization_id, { $addToSet: { members: user._id } });
        res.json({ message: 'User invited to organization' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to invite user', error });
    }
};
