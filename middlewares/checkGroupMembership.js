// middlewares/checkGroupMembership.js
import Group from '../models/Group.js'; // Make sure to adjust the import path to your Group model

export const checkGroupMembership = async (req, res, next) => {
    const { groupId } = req.params;
    const userId = req.userId;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        const isMember = group.members.some(memberId => memberId.toString() === userId);
        if (!isMember) {
            return res.status(403).json({ error: 'User is not a member of this group' });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
