import { API_ROOT } from '~/utils/constants';
import authorizedAxiosInstance from '../utils/authorizedAxios';
//auth api
export const signUpApi = async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/auth/signup`, data);
    return response.data;
}
export const signInApi = async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/auth/signin`, data);
    return response.data;
}
export const googleAuthApi = async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/auth/googleAuth`, data);
    return response.data;
}
export const signOutApi = async () => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/auth/signout`);
    return response.data;
}

//user api
export const getUserApi = async (userId,startIndex) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/user/get-users?userId=${userId}&startIndex=${startIndex}`);
    return response.data;
}

export const getUsersWithLimitApi = async (limit) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/user/get-users?limit=${limit}`);
    return response.data;
}

export const getUserApiById = async (id) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/user/get-user/${id}`);
    return response.data;
}

export const updateUserApi = async (id, data) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/user/update/${id}`, data);
    return response.data;
}

export const deleteUserApi = async (id) => {
    const response = await authorizedAxiosInstance.delete(`${API_ROOT}/user/delete/${id}`);
    return response.data;
}
//Posts api
export const createPostApi = async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/post/create-post`, data);
    return response.data;
}
export const getPostsApi = async (userId,startIndex) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/post/get-posts?userId=${userId}&startIndex=${startIndex}`);
    return response.data;
}

export const getPostsForSearchApi = async (searchQuery) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/post/get-posts?${searchQuery}`);
    return response.data;
}

export const getPostApiById = async (postId) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/post/get-posts?postId=${postId}`);
    return response.data;
}

export const getPostWithLimitApi = async (limit) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/post/get-posts?limit=${limit}`);
    return response.data;
}

export const getPostApiBySlug = async (postSlug) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/post/get-posts?slug=${postSlug}`);
    return response.data;
}

export const getRecentPostsApi = async (limit) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/post/get-posts?limit=${limit}`);
    return response.data;
}

export const updatePostApi = async (postId, userId, data) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/post/update-post/${postId}/${userId}`, data);
    return response.data;
}

export const deletePostApi = async (postId, userId) => {
    const response = await authorizedAxiosInstance.delete(`${API_ROOT}/post/delete-post/${postId}/${userId}`);
    return response.data;
}

// Comments api
export const createCommentApi = async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/comment/create-comment`, data);
    return response.data;
}

export const getCommentsApi = async (postId) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/comment/get-comments/${postId}`);
    return response.data;
}

export const getCommentsWithLimitApi = async (limit) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/comment/get-comments-for-admin?limit=${limit}`);
    return response.data;
}

export const getCommentsForAdminApi = async (userId, startIndex) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/comment/get-comments-for-admin?userId=${userId}&startIndex=${startIndex}`);
    return response.data;
}

export const editCommentApi = async (commentId, data) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/comment/edit-comment/${commentId}`, data);
    return response.data;
}

export const deleteCommentApi = async (commentId, userId) => {
    const response = await authorizedAxiosInstance.delete(`${API_ROOT}/comment/delete-comment/${commentId}/${userId}`);
    return response.data;
}

// export const deletePostApi = async (postId, userId) => {
//     const response = await authorizedAxiosInstance.delete(`${API_ROOT}/post/delete-post/${postId}/${userId}`);
//     return response.data;
// }

export const likeCommentApi = async (commentId) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/comment/like-comment/${commentId}`);
    return response.data;
}