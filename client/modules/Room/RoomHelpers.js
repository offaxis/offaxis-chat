import _ from 'lodash';

export function isUserParticipating(room, user) {
    return _.includes(room.participants, user.cuid);
}
