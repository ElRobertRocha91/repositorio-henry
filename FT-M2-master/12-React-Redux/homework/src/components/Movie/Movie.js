import React from 'react';
import { connect } from 'react-redux';
//import { useParams } from 'react-router-dom';
import { getDetail } from '../../actions/index';

import './Movie.css';

class Movie extends React.Component {

    //this.props.match.params.id
    //componentDidMount() => nos permite realizar acciones en el componente en su ciclo de vida
    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.getMovieDetail(id);
    }

    render() {
        return (
            <div className="movie-detail">
                Detalle de la pelicula  
                <h2>{`Title ${this.props.movies.Title}`}</h2>
                <img src={this.props.movies.Poster} alt="img not found"/>
                <h4>{`Year ${this.props.movies.Year}`}</h4>
                <h4>{`Type ${this.props.movies.Type}`}</h4>
                <h4>{`Awards ${this.props.movies.Awards}`}</h4>
            </div>
        );
    }
}

//Ciclo de vida:                                                     true => renderizo
// constructor => render => componentDidMount                      /
//                            props/state => shouldComponentUpdate() => render() => componentDidUpdate
//                                                                 \
//                                                                  X 

// componentWillUnmount => se va del DOM                                                                 

//Componente funcinal
// function movie(props){
//     let id = props.params.id;
//     let {id} = useParams();
// }

//Ahora debemos mostrarlo cuando se los solicite:
function mapStateToProps(state) {
    return {
      movies: state.movieDetail
    }
}

function mapDispatchToProps(dispatch) {
    return {
      getMovieDetail: id => dispatch(getDetail(id))
    }
}

//Y aquí lo  conectamos:
export default connect(
      mapStateToProps, 
      mapDispatchToProps
    ) (Movie);