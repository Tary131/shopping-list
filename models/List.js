// models/List.js
import {Schema, model} from "mongoose";

const ListSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ type: String }],
    groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Pre-save middleware to update the `updatedAt` field
ListSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});
const List = model('List', ListSchema);
export default List
