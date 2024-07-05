import List from '../models/List.js';

export const createList = async (req, res) => {
    const { userId, items, groupId } = req.body;
    try {
        const list = new List({ userId, items, groupId });
        await list.save();
        res.status(201).json(list);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getUserLists = async (req, res) => {
    const { userId } = req.params;
    try {
        const lists = await List.find({ userId });
        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getGroupLists = async (req, res) => {
    const { groupId } = req.params;
    try {
        const lists = await List.find({ groupId });
        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



export const updateList = async (req, res) => {
    const { id } = req.params;
    const { items } = req.body;

    try {
        const updatedList = await List.findByIdAndUpdate(id, { items }, { new: true });

        if (!updatedList) {
            return res.status(404).json({ error: 'List not found' });
        }

        res.status(200).json(updatedList);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const deleteList = async (req, res) => {
    const { id } = req.params;
    try {
        const list = await List.findById(id);
        if (!list) {
            return res.status(404).json({ error: 'List not found' });
        }

        if (list.userId.toString() !== req.userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        await list.remove();
        res.status(200).json({ message: 'List deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
