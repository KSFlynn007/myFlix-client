import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view'


export class MainView extends React.Component {
    constructor() {
        super();
//initial state is set to null
        this.state = {
            movies: null,
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount() {
        axios.get('https://m-y-f-l-i-x.herokuapp.com/movies')
            .then (response => {
                // never directly mutate state once defined, otherwise component won't update
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

// when movie is clicked, this function is invoked and updates the state of the 'selectedovie' property to that movie
    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }
// when clicked, this function sets selectedMovie state back to null, rendering the main-view page on the DOM
    onButtonClick() {
        this.setState({
            selectedMovie: null
        })
    }
// when user successsfully logs in, this function updates the 'user' property in thstate to that particular user
    onLoggedIn(user) {
        this.setState({
            user: user
        });
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

// if no user, LoginView is rendered. If there is a logged in user, the user details are passed as a prop to the Login View
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>

        if (!movies) return <div className="main-view"></div>;

        return (
        <div className="main-view">
{/* If state of selectedMovie is not null, that selected movie will be return, otherwise all movies will be returned */}
        {selectedMovie
        // assign the key onClick to the function defined above, onButtonClick, so it can be passed as a prop to Movie-Card
            ? <MovieView movie={selectedMovie} onClick={() => this.onButtonClick()}/>
            : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
            ))
        }
        </div>
        );
    }
}