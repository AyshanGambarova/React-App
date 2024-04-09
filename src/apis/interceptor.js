import axios from 'axios';

const axiosConfig = {
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
}

const instance = axios.create(axiosConfig)

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    return Promise.reject(error);
});

export default instance