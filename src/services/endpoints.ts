const baseUsersUrl = 'https://gorest.co.in/public/v2/users'
export const getPaginatedUsersEndpoint = (page: number, name = '') => `${baseUsersUrl}?page=${page}&name=${name}`
export const getUsersPosts = (id: number, page?: number) => `${baseUsersUrl}/${id}/posts?page=${page}`
