import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { addMovieFavorite, getMovies } from "../../actions";
import './Buscador.css';

//This.props ? {getMovies, movieLoaded}

export class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }
  handleChange(event) {
    this.setState({ title: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    //Hacer la busqueda a la API por el nombre correspondiente
    this.props.getMovies(this.state.title);
    //Reseteamos el buscador para que vuelva a estar vacio
    this.setState({title: ""});
  }

  render() {
    const { title } = this.state;
    return (
      <div>
        <h2>Buscador</h2>
        <form className="form-container" onSubmit={(e) => this.handleSubmit(e)}>
          <div>
            <label className="label" htmlFor="title">Película: </label>
            <input
              type="text"
              id="title"
              autoComplete="off"
              value={title}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <button type="submit">BUSCAR</button>
        </form>
        <ul>
         {/* Aqui tienes que escribir tu codigo para mostrar la lista de peliculas */}
         {
          this.props.movies && this.props.movies.map(movie => movie && 
            <li key={movie.imdbID}>
              <Link to={`/movie/${movie.imdbID}`}>{movie.Title}</Link>
              <button onClick={() => this.props.addMovieFavorite({title: movie.Title, id: movie.imdbID}) }>ADD TO FAVORITE</button>
            </li>
            )
         }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.moviesLoaded
  }
}

function mapDispatchToProps(dispatch){
  return {
    addMovieFavorite: movie =>
    dispatch(addMovieFavorite(movie)),
    getMovies: title => dispatch(getMovies(title))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (Buscador);
