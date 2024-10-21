import { toast } from 'react-hot-toast';

export const notify = ({ message = 'success', isError }) => {
  if (isError) {
    return toast.error(message);
  }
  toast.success(message);
};
