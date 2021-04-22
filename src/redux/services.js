import axios from 'axios'

const apiURL = 'http://localhost:3000/dev'

export const getPosts = async () => {
    
        return await axios.get(`${apiURL}/posts`)
    
}

export const createPost = async (post) => {
    
        return await axios.post(`${apiURL}/post`, post)
    
}

export const updatePost = async (post) => {
    
        return await axios.put(`${apiURL}/post/${post.id}`, post)
    
}

export const deletePost = async (post) => {
    
        return await axios.delete(`${apiURL}/post/${post.id}`)
    
}

export const getPostsById = async (id) => {
    
        return await axios.get(`${apiURL}/post/${id}`)
    
}

export const getPostsByAuthor = async (id) => {
    
        return await axios.get(`${apiURL}/author/posts/${id}`)
    
}

export const getAuthors = async () => {
    
        return await axios.get(`${apiURL}/authors`)
    
}

export const getAuthor = async (author) => {
    
        return await axios.get(`${apiURL}/author/${author}`)
    
}

export const createAuthor = async (author) => {
    
        return await axios.post(`${apiURL}/author`, author)
    
}

export const loginAuthor = async (form) =>{
        return await axios.post(`${apiURL}/login`, form)
}

export const updateAuthor = async (author) => {
    
        return await axios.put(`${apiURL}/author/${author.id}`, author)
    
}

export const deleteAuthor = async (author) => {
    
        return await axios.delete(`${apiURL}/author/${author.id}`)
    
}


