export const GET_MOVIES = "GET_MOVIES";
export const GET_DETAIL = "GET_DETAIL";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";

const API = "http://www.omdbapi.com/?i=tt3896198&apikey=cf2f0a4d"
const API_ID = "http://www.omdbapi.com/?apikey=cf2f0a4d"

export function getMovies(name){
    return async function(dispatch){
        return await fetch(`${API}&s=${name}`)
        .then(response => response.json())
        .then(json => {
            return dispatch({type: GET_MOVIES, payload: json});
        });
    }
}

export function getDetail(id){
    return async function(dispatch){
        return await fetch(`${API_ID}&i=${id}`)
        .then(response => response.json())
        .then(json => {
            dispatch({type: GET_DETAIL, payload: json})
        });
    }
}

export function addMovieFavorite(payload){
    return {
        type: ADD_FAVORITE,
        payload
    }
}

export function removeMovieFavorite(payload){
    return {
        type: REMOVE_FAVORITE,
        payload
    }
}
