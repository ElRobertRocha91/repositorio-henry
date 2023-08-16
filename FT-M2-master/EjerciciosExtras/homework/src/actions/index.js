export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_ALL_USERS_POST = 'GET_ALL_USERS_POST';
export const GET_ALL_COMMENTS_POST = 'GET_ALL_COMMENTS_POST';
//Para familiarizarnos con las buenas practicas guardamos nuestras actions en variables, para evitar errores de sintaxis

/*
Ahora tenemos a nuestras 4 action:
GET_ALL_USERS ==> preguntara a la API Y nos traera de la API a todos nuestros usuarios.
GET_ALL_USERS_POST ==> nos traera un post de un usuario especifico.
GET_ALL_COMMENTS_POST ==> nos traera para ver los comentarios de un post especifico.
GET_ALL_POSTS ==> nos devolvera una acción que nos permitira ver los post del blog.
*/

//Ahora creamos la acción y los exportamos:

export function getAllUsers(){
    return function(dispatch){
        return fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(json => dispatch({type: GET_ALL_USERS, payload: json}))
    };
}

export function getAllUserPosts(id){
    return function(dispatch){
        return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        .then((response) => response.json())
        .then(json => dispatch({type: GET_ALL_USERS_POST, payload: json}))
    };
}

export function getAllCommentsPost(postId){
    return function(dispatch){
        return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(response => response.json())
        .then(json => dispatch({type: GET_ALL_COMMENTS_POST, payload: json}))
    };
}

export function getAllPosts(){
    return function(dispatch){
        return fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(json => dispatch({type: GET_ALL_POSTS, payload: json}))
    };
}

