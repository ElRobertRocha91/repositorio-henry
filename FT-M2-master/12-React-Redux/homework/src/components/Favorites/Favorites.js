import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { removeMovieFavorite } from "../../actions";
import './Favorites.css';

export class ConnectedList extends Component {

  render() {
    return (
      <div>
        <h2>Películas Favoritas</h2>
        <ul>
          {/* Aqui deberias poner tu lista de peliculas! */}
          {
            this.props.favorites && this.props.favorites.map(movie =>
              <div key={movie.id}>
                <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                <button onClick={() => this.props.removeMovieFavorite(movie.id)}>REMOVE FROM FAVORITES</button>
                {/* <button onClick={() => this.props.dispatch({type: REMOVE_FAVORITE, id: movie.id})}>REMOVE FROM FAVORITES</button> */}
              </div>
              )
          }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    favorites: state.moviesFavourites
  }
}


export default connect(mapStateToProps, {removeMovieFavorite}) (ConnectedList);
