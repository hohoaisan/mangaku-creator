import { toast } from 'react-toastify';

const toastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  pauseOnFocusLoss: true
};

class ToastService {
  static show(message, options = toastOptions) {
    return toast(message, options);
  }

  static success(message, options = toastOptions) {
    return toast.success(message, options);
  }

  static error(message, options = toastOptions) {
    return toast.error(message, options);
  }

  static warn(message, options = toastOptions) {
    return toast.warn(message, options);
  }

  static destroy(id) {
    toast.dismiss(id);
  }

  static destroyAll() {
    toast.dismiss();
  }
}

export default ToastService;
