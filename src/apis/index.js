// APIs
import $http from './interceptor'

//#region Posts

export const apiPosts = async (params) => {
    const response = await $http.request({
        method: 'GET',
        url: `/posts`,
        params,
    })

    return response.data
}

export const apiPostsDetails = async (id) => {
    const response = await $http.request({
        method: 'GET',
        url: `/posts/${id}`,
    })

    return response.data
}

export const apiCreatePost = async (data) => {
    const response = await $http.request({
        method: 'POST',
        url: `/posts`,
        data
    })

    return response.data
}

//#endregion

//#region Users

export const apiUsers = async (params) => {
    const response = await $http.request({
        method: 'GET',
        url: `/users`,
        params
    })

    return response.data
}

//#endregion


