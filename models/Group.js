// models/Group.js
import mongoose from 'mongoose';
import {Schema, model} from "mongoose";

const GroupSchema = new Schema({
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Group = model('Group', GroupSchema);
export default Group
