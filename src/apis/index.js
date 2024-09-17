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

export const apiDeletePost = async (id) => {
    return await $http.request({
        method: 'DELETE',
        url: `/posts/${id}`
    })
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

export const apiCreateUser = async (data) => {
    const response = await $http.request({
        method: 'POST',
        url: `/users`,
        data
    })

    return response.data
}


//#endregion


