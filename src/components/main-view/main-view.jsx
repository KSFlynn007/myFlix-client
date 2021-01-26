import React from 'react';
import axios from 'axios';

// class MainView extends React.Component{
//     constructor(){
//         super();
//         // initalize empty object state to be destructured later
//         // so it can be accessed later by const { something } = this.state
//         this.state = {};
//     }

//     render() {
//         return(
//             <div className="main-view"></div>
//         );
//     }
// }

export class MainView extends React.Component {
    componentDidMount() {
        axios.get('https://m-y-f-l-i-x.herokuapp.com/movies')
            .then (response => {
                // never directly mutate state once defined, otherwise component won't update
                this.setState({
                    movies: response.data
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        const {movies} = this.state;

        if(!movies) return <div className="main-view"></div>;

        return (
            <div className="main-view">
                { movies.map(movie => (
                    <div className="movie-card" key={movie.id}>
                        {movie.Title}
                    </div> 
                ))}
            </div>
        );
    }
}