// Export Constants
export const INIT_SOCKET = 'INIT_SOCKET';
export const SEND_SOCKET = 'SEND_SOCKET';
export const RECEIVE_SOCKET = 'RECEIVE_SOCKET';

// Export Actions
export function initSocket(socket) {
    return {
        type: INIT_SOCKET,
        socket: socket
    };
}

export function sendSocket(datas) {
    return {
        type: SEND_SOCKET,
        data: datas
    }
}

export function receiveSocket(datas) {
    return {
        type: RECEIVE_SOCKET,
        data: datas
    }
}
