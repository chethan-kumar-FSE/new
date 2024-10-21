class ApiClient {
  //handle for post request
  //headers and url for , if changes done in API in future
  async post({
    url,
    action,
    requestBody,
    headers = {},
    params,
    isComment,
    isLike,
    directFormData,
  }) {
    console.log(action, requestBody);
    console.log('action', action);
    const formData = new FormData();
    if (action) {
      formData.append('action', action);
    }
    if (requestBody && directFormData) {
      for (let key in requestBody) {
        formData.append(key, requestBody[key]);
      }
    } else {
      formData.append('data', JSON.stringify(requestBody));
    }

    const requestObject = {
      method: 'POST',
      body: formData,
      next: {
        tags: ['yes'],
      },
    };

    const response = await fetch(url, requestObject);
    if (!response.ok) {
      console.log();
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
      throw new Error('Something went wrong');
    }
    // console.log('respnose', response.json());

    const data = await response.json();
    console.log('responsedaa', data);
    return data;
  }
}
const apiClient = new ApiClient();

export { apiClient };
