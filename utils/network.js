export const checkConnectionAndNotify = (notify) => {
  if (!navigator.onLine) {
    notify({ message: 'Please check your connection', isError: true });
    return false;
  }
  return true;
};
