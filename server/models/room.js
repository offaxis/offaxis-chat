import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import _ from 'lodash';

const roomSchema = new Schema({
    title: { type: 'String', required: true },
    slug: { type: 'String', required: true },
    cuid: { type: 'String', required: true },
    participants: [{ type: 'String', required: false }]
});


// Instance Methods
roomSchema.methods.isUserParticipating = function(cuid) {
    return _.includes(this.participants, cuid);
};

// Static Methods
roomSchema.statics.findBySlug = function(slug, cb) {
  return this.find({ slug: slug }, cb);
};

export default mongoose.model('Room', roomSchema);
