// APIs
import $http from './interceptor'

export const apiPosts = async () => {
    const response = await $http.request({
        method: 'GET',
        url: `/posts`
    })

    console.log({response})

    return response.data
}



