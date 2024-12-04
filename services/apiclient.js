class ApiClient {
  //handle for post request
  //headers and url for , if changes done in API in future
  async post({ url, action, requestBody, page, directFormData }) {
    const formData = new FormData();
    if (action) {
      formData.append('action', action);
    }

    //page used only for sending mail
    if (page) {
      formData.append('page', page);
    }

    //some request send request body as an inidvidual formdata
    //directformdata is the key passed to check if should send with data key or as an individual fromdata key value pairs

    if (requestBody && directFormData) {
      for (let key in requestBody) {
        formData.append(key, requestBody[key]);
      }
    }

    if (requestBody) {
      formData.append('data', JSON.stringify(requestBody));
    }
    //if directformData is not present send with 'data' key

    //request object to be used with fetch
    const requestObject = {
      method: 'POST',
      body: formData,
      //cache: 'no-store',
      next: {
        tags: ['yes'],
      },
    };

    //requesting data using fetch , ( <URL> , <REQUESTOBJECT> )
    const response = await fetch(url, requestObject);
    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const result = await response.json();

    return result;
  }

  async get({ url }) {
    //code here if changed to get request
    /* const formData = new FormData();
    if(action){
        formData.append('action',action);
    } */
    const response = await fetch(url);
    if (!response.ok) {
      console.log('errr');
      throw new Error('Something went wrong !');
    }
    // console.log('respnose', response.json());

    const data = await response.json();

    return data;
  }
}
const apiClient = new ApiClient();

export { apiClient };
