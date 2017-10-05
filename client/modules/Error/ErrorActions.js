
import Alert from 'react-s-alert';

export function displayErrors(type, message) {
    switch(type) {
        case 'error':
            Alert.error(message);
            break;

        case 'warning':
            Alert.warning(message);
            break;

        case 'info':
            Alert.info(message);
            break;

        case 'success':
            Alert.success(message);
            break;


        default:
            alert(type + ' : ' + message);
    }
}
