import {Toast} from 'react-native-toast-notifications';

const ShowToast = (type: string, message: string) => {
  Toast.show(message, {
    type: type,
    placement: 'top',
    duration: 5000,
    animationType: 'slide-in',
  });
};

export default ShowToast;
