// import config from './config';

export default class Data {
  // api helper method makes a call to the courses REST API returned the values
  // returned from the fetch method. The method arguments that specify
  // the type of HTTP verb, body request object, when basicAuth is requires,
  // and the users credentials if the page requires basicAuth
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = 'http://localhost:5000' + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };
    // If body is not null, set the value of the options object's body property
    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // Check if auth is required
    if (requiresAuth) {    
      // If authentication is required, pass the authentication information to the server 
      // in an Authorization header using base-64 encoding
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      // Add Authorization property to options.headers
      // Set the Authorization type to Basic, followed by the encoded credentials, 
      // stored in the variable encodedCredentials:
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  // pass the api() method inside getUser() values 
  // for the requiresAuth and credentials arguments.
  async getUser(emailAddress, password) {
    const response = await this.api(`/api/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  // createUser() is an asynchronous operation that returns a promise. 
  // The resolved value of the promise is either an array of errors 
  // (sent from the API if the response is 400), 
  // or an empty array (if the response is 201).
  // Since this function returns a promise, we use the async keyword
  // in front of the function
  async createUser(user) {
    // await the results returned from the api method 
    const response = await this.api('/api/users', 'POST', user);
    // If user is created and a 201 status is set, return empty array
    if (response.status === 201) {
      return [];
    }
    // If there is a problem creating the user, return the data
    // Which will be the error data
    else if (response.status === 400) {
      return response.json().then(data => data);
    }
    else {
      throw new Error();
    }
  }
}