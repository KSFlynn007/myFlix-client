import React from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../registration-view/registration-view'
import Config from '../../config';

import './main-view.scss'

import {
    Navbar,
    Nav
} from 'react-bootstrap';


export class MainView extends React.Component {
    constructor() {
        super();
//initial state is set to null
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            genre: [],
            director: []
        };
        this.onLoggedOut = this.onLoggedOut.bind(this);
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

// when user successsfully logs in, this function updates the 'user' property in the state to that particular user
    onLoggedIn(data) {
        console.log(data.user.Username);
        this.setState({
            user: data.user.Username
        });

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.user.Username);
        this.getMovies(data.token);
    }

    onLoggedOut() {
        this.setState(state => ({
            user: null
        }));

        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    getMovies(token) {
        axios.get(`${Config.API_URL}/movies`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            // Assigning result to state
            this.setState({
                movies: response.data
            });
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    render() {
        const { movies, user } = this.state;
        
        return(
        <div>
        <Router>
            <div className='main-view'>
                    <Navbar expand onToggle='sm' bg='dark' variant='dark' sticky='top'>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link className='navLinkHome' as={Link} to={`/`} target='_self'>myFlix Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className='navLink' as={Link} to={`/directors`} target='_self'>Directors</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className='navLink' as={Link} to={`/genres`} target='_self'>Genres</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className='navLink' as={Link} to={`/login`} target='_self' onClick={this.onLoggedOut}>Log Out</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className='navLink' as={Link} to={`/users/${user}`} target='_self'>Profile</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar>


                <Route exact path='/' 
                render={() => {
                    if (!user) return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)}/>;
                    return movies.map(m => <MovieCard key={m._id} movie={m}/>)
                }}/>

                <Route path='/login'
                render={() => {
                    if (!user) return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)}/>;
                    return movies.map(m => <MovieCard key={m._id} movie={m}/>)
                }}/>

                <Route path='/register'
                render={() => { return <RegisterView />}} />

                <Route path='/movies/:movieId' 
                render={({match}) => { return <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}}/>

                <Route path='/directors/:name' 
                render={({match}) => {
                    if(!movies) return <div className='main-view'/>;
                    return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
                }}/>

                <Route path='/directors'
                render={() => {return <DirectorView />}}/>

                <Route path='/genres/:name' 
                render={({match}) => {
                    if(!movies) return <div className='main-view'/>;
                    return <GenreView genre={movies.find((m) => m.Genre.Name === match.params.name).Genre}/>
                }}/>

                <Route path='/genres'
                render={() => {return <GenreView />}}/>

                <Route path='users/:username'
                render={() => {return <ProfileView />}}/>

            </div>
        </Router>
        </div>    
        )

        
    }
}

MainView.propTypes = {
  movie: propTypes.shape({
    _id: propTypes.string.isRequired,
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    Year: propTypes.number.isRequired,
    ImageUrl: propTypes.string.isRequired,
    Genre: propTypes.shape({
      Name: propTypes.string.isRequired,
      Description: propTypes.string.isRequired,
    }),
    Director: propTypes.shape({
      Name: propTypes.string.isRequired,
      Bio: propTypes.string.isRequired,
      Birthday: propTypes.instanceOf(Date)
    }),
    Featured: propTypes.bool,
  }),
  user: propTypes.string
}