export const tryCatchWrapper = async (fn) => {
  try {
    return await fn();
  } catch (error) {
    console.error('Error:', error);
    //throw new Error(error.message); // rethrow the error for further handling if necessary
  }
};
