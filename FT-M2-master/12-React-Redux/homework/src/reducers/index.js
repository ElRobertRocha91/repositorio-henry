import { GET_MOVIES, GET_DETAIL, ADD_FAVORITE, REMOVE_FAVORITE } from "../actions";

const initialState = {
    moviesFavourites: [],
    moviesLoaded: [],
    movieDetail:{}
};

function rootReducer(state = initialState, action){
    if(action.type === GET_DETAIL){
        return {
            ...state,
            movieDetail: action.payload
        }
    }
    if(action.type === ADD_FAVORITE){
        return {
            ...state,
            moviesFavourites: state.moviesFavourites.concat(action.payload)
        }
    }
    if(action.type === GET_MOVIES){
        return {
            ...state,
            // moviesLoaded: action.payload.Search
            moviesLoaded: [...state.moviesLoaded, ...action.payload.Search]
        }
    }
    if(action.type === REMOVE_FAVORITE){
        return {
            ...state,
            moviesFavourites: state.moviesFavourites.filter((movie) => movie.id !== action.payload)
        }
    }
    return state;
}

export default rootReducer;