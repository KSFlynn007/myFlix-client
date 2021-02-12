import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Navigation from '../navigation/navigation';
import { ProfileView } from '../profile-view/profile-view';
import { RegisterView } from '../registration-view/registration-view';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import Config from '../../config';

import './main-view.scss'

import {
    Navbar,
    Nav, 
    Row,
    Form
} from 'react-bootstrap';


class MainView extends React.Component {
    constructor() {
        super();
//initial state is set to null
        this.state = {
            user: null
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
        console.log(data.user);
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
            let movies = response.data.map(movie => {
                let tempObject = Object.assign(movie)
                tempObject.Director.Birthday = new Date(movie.Director.Birthday)
                return tempObject
            });
            // edited response.data above with .map method, returning movies now:
            this.props.setMovies(movies);
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    
    render() {
        let {movies, visibilityFilter} = this.props;
        let {user} = this.state;
        
        return(
        <div>
        <Router>
            <ScrollToTop />
            <div className='main-view'>
                {/* Future use of Navigation component, need to pass {users} and {onLoggedOut} functions, and need to render with only some Routes below? */}
                {/* <Navigation /> */}
                <Navbar bg="dark" variant="dark" expand="md" sticky='top'>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Item>
                            <Nav.Link className='navLinkHome' as={Link} to={`/`} target='_self'>myFlix Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className='navLink' as={Link} to={`/users/${user}`} target='_self'>Profile</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className='navLink' as={Link} to={`/login`} target='_self' onClick={this.onLoggedOut}>Log Out</Nav.Link>
                        </Nav.Item>
                    </Nav>
                <Form inline>
                    <VisibilityFilterInput variant="outline-light" visibilityFilter={visibilityFilter} />
                </Form>
                </Navbar.Collapse>
            </Navbar>
            <Switch>
                <Route exact path={['/', '/login']}
                render={() => {
                    if (!user) return (<LoginView onLoggedIn={(data) => this.onLoggedIn(data)}/>);
                    // return <Row className='movieCard-row'>{movies.map((m) => <MovieCard key={m._id} movie={m} />)}</Row>
                    return <Row className='movieCard-row'><MoviesList movies={movies}/></Row>
                }}
                />

                <Route exact path='/nav'
                render={() => {return <Navigation />}}/>
                
                <Route path='/register'
                render={() => { return <RegisterView />}} />

                <Route path='/movies/:movieId' 
                render={({match}) => { return <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}}/>

                <Route path='/directors/:name' 
                render={({match}) => {
                    if(!movies.length) return <div className='main-view'/>;
                    return <DirectorView director={movies.find((m) => m.Director.Name === match.params.name)} movies={movies} />
                }}/>

                <Route path='/genres/:name' 
                render={({match}) => {
                    if(!movies.length) return <div className='main-view'/>;
                    return <GenreView genre={movies.find((m) => m.Genre.Name === match.params.name)} movies={movies}/>
                }}/>

                <Route exact path='/users/:username'
                render={() => {
                    if (!user) return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />;
                    if (movies.length === 0) return;
                    return <ProfileView movies={movies}/>}}/>
                
            </Switch>
            </div>
        </Router>
        </div>    
        );
    }
}

let mapStateToProps = state => {
    return { movies: state.movies }
}

export default connect(mapStateToProps, {setMovies} )(MainView);
