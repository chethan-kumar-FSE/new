export const tryCatchWrapper = async (fn) => {
  try {
    return await fn();
  } catch (error) {
    console.log('err', error.message);
    throw new Error(error.message); // rethrow the error for further handling if necessary
  }
};
