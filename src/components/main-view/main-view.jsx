import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../registration-view/registration-view'
import { Link } from 'react-router-dom';
import Config from '../../config';

import './main-view.scss'

import {
    Navbar,
    Nav,
    Container,
    Row,
    Col,
    Button

} from 'react-bootstrap';


export class MainView extends React.Component {
    constructor() {
        super();
//initial state is set to null
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
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

        <div>
        <Router>
            <div className='main-view'>
                    <Navbar bg='dark' variant='dark'>
                        <Nav className='justify-content-center'>
                            <Nav.Item>
                                <Nav.Link target='_blank' href='#Home'>Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link target='_blank' href='#Directors'>Directors</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link target='_blank' href='#Genres'>Genres</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className='logout-button' target='_blank' onClick={this.onLoggedOut}>Logout</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar>
                <Route exact path='/' 
                render={() => {
                    if (!user) return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)}/>;
                    return movies.map(m => <MovieCard key={m._id} movie={m}/>)
                }}/>

                <Route path='/register' 
                render={() => <RegistrationView />}/>

                <Route path='/movies/:movieId' 
                render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>

                <Route exact path='/genres/:name' 
                render={({match}) => {
                    if(!movies) return <div className='main-view'/>;
                    return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}/>
                }}/>

                <Route exact path='/directors/:name' 
                render={({match}) => {
                    if(!movies) return <div className='main-view'/>;
                    return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
                }}/>
            </div>
        </Router>
        </div>
    }
}

// PARTS OF OLD RETURN STATEMENT BELOW:

        // if (!register) return <RegisterView onRegister={(register) => this.onRegister(register)}/>


        // return (
        //     <React.Fragment>
        //         <div className='main-view'>
        //             <header>
        //                 <Navbar bg='dark' variant='dark'>
        //                     <Nav className='justify-content-center'>
        //                         <Nav.Item>
        //                             <Nav.Link target='_blank' href='#Home'>Home</Nav.Link>
        //                         </Nav.Item>
        //                         <Nav.Item>
        //                             <Nav.Link target='_blank' href='#Directors'>Directors</Nav.Link>
        //                         </Nav.Item>
        //                         <Nav.Item>
        //                             <Nav.Link target='_blank' href='#Genres'>Genres</Nav.Link>
        //                         </Nav.Item>
        //                         <Nav.Item>
        //                             <Nav.Link className='logout-button' target='_blank' onClick={this.onLoggedOut}>Logout</Nav.Link>
        //                         </Nav.Item>
        //                     </Nav>
        //                 </Navbar>
        //             </header>
        //         <div className='main-body text-center'>
        //             {selectedMovie ? (
        //             <MovieView
        //                 movie={selectedMovie}
        //                 onClick={() => this.onBackButtonClick()}
        //             />
        //             ) : (
        //             <Container>
        //                 <Row>
        //                 {movies.map((movie) => (
        //                     <Col xs={12} sm={6} md={4} key={movie._id}>
        //                     <MovieCard
        //                         key={movie._id}
        //                         movie={movie}
        //                         onClick={(movie) => this.onMovieClick(movie)}
        //                     />
        //                     </Col>
        //                 ))}
        //                 </Row>
        //             </Container>
        //             )}
        //         </div>
        //         <div className='test'></div>
        //         </div>
        //     </React.Fragment>
        //     );