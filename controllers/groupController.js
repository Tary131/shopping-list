import Group from '../models/Group.js';

export const createGroup = async (req, res) => {
    const { groupName, description } = req.body;

    try {
        const group = new Group({ groupName, description });
        await group.save();
        res.status(201).json(group);
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const addUserToGroup = async (req, res) => {
    const { groupId, userId } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        group.members.push(userId);
        await group.save();
        res.status(200).json(group);
    } catch (error) {
        console.error('Error adding user to group:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteGroup = async (req, res) => {
    const { groupId } = req.params;

    try {
        const group = await Group.findByIdAndDelete(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        res.status(200).json({ message: 'Group deleted successfully' });
    } catch (error) {
        console.error('Error deleting group:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const removeUserFromGroup = async (req, res) => {
    const { groupId, userId } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        group.members = group.members.filter(member => member.toString() !== userId);
        await group.save();
        res.status(200).json(group);
    } catch (error) {
        console.error('Error removing user from group:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateGroup = async (req, res) => {
    const { groupId } = req.params;
    const { groupName, description } = req.body;

    try {
        const updatedGroup = await Group.findByIdAndUpdate(groupId, {
            groupName,
            description
        }, { new: true });

        if (!updatedGroup) {
            return res.status(404).json({ error: 'Group not found' });
        }

        res.status(200).json(updatedGroup);
    } catch (error) {
        console.error('Error updating group:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
