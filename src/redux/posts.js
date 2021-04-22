import axios from "axios"





//Constants

const apiURL = 'http://localhost:3000/dev'


const initialData = {
    array: []
}

const GET_POSTS = 'GET_POSTS'

//Reducers
export default function postsReducer (state = initialData, action){
    switch(action.type){
        case GET_POSTS:
            return {...state, array: action.payload}
        default:
            return state
    }
}

//Actions

export const getPostsAction = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(`${apiURL}/posts`)
        dispatch({
            type: GET_POSTS,
            payload: res.data.result
        })
    }catch (error){
        console.log(error)
    }
}