// import React from 'react';
// import axios from 'axios';
// import { MovieCard } from '../movie-card/movie-card';
// import { MovieView } from '../movie-view/movie-view';
// import { LoginView } from '../login-view/login-view';
// import { RegisterView } from '../registration-view/registration-view'

// import './main-view.scss'

// import {
//     Navbar,
//     Nav,
//     Container,
//     Row,
//     Col,
//     Button

// } from 'react-bootstrap';


// export class MainView extends React.Component {
//     constructor() {
//         super();
// //initial state is set to null
//         this.state = {
//             movies: null,
//             selectedMovie: null,
//             user: null,
//             register: null
//         };
//         this.onLoggedOut = this.onLoggedOut.bind(this);
//     }

//     componentDidMount() {
//         let accessToken = localStorage.getItem('token');
//         if (accessToken !== null) {
//             this.setState({
//                 user: localStorage.getItem('user')
//             });
//             this.getMovies(accessToken);
//         }
//     }

// // when movie is clicked, this function is invoked and updates the state of the 'selectedovie' property to that movie
//     onMovieClick(movie) {
//         this.setState({
//             selectedMovie: movie
//         });
//     }

//     onRegister(register) {
//         this.setState({
//             register
//         });
//     }

// // when user successsfully logs in, this function updates the 'user' property in thstate to that particular user
//     onLoggedIn(data) {
//         console.log(data);
//         this.setState({
//             user: data.user.Username
//         });

//         localStorage.setItem('token', data.token);
//         localStorage.setItem('user', data.user.Username);
//         this.getMovies(data.token);
//     }

    // onLoggedOut() {
    //     this.setState(state => ({
    //         user: null
    //     }));

    //     localStorage.removeItem('user');
    //     localStorage.removeItem('token');
    // }

//     getMovies(token) {
//         axios.get(`https://m-y-f-l-i-x.herokuapp.com/movies`, {
//             headers: { Authorization: `Bearer ${token}`}
//         })
//         .then(response => {
//             // Assigning result to state
//             this.setState({
//                 movies: response.data
//             });
//         })
//         .catch(function(error) {
//             console.log(error);
//         });
//     }

// // when clicked, this function sets selectedMovie state back to null, rendering the main-view page on the DOM
//     onBackButtonClick() {
//         this.setState({
//             selectedMovie: null
//         });
//     }

//     render() {
//         const { movies, selectedMovie, user, register } = this.state;

//         // if (!register) return <RegisterView onRegister={(register) => this.onRegister(register)}/>

// // if no user, LoginView is rendered. If there is a logged in user, the user details are passed as a prop to the Login View
//         if (!user) return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)}/>

//         if (!movies) return <div className='main-view'></div>;

//         return (
//             <React.Fragment>
//                 <div className='main-view'>
//                     <header>
//                         <Navbar bg='dark' variant='dark'>
//                             <Nav className='justify-content-center'>
//                                 <Nav.Item>
//                                     <Nav.Link target='_blank' href='#Home'>Home</Nav.Link>
//                                 </Nav.Item>
//                                 <Nav.Item>
//                                     <Nav.Link target='_blank' href='#Directors'>Directors</Nav.Link>
//                                 </Nav.Item>
//                                 <Nav.Item>
//                                     <Nav.Link target='_blank' href='#Genres'>Genres</Nav.Link>
//                                 </Nav.Item>
//                                 <Nav.Item>
//                                     <Nav.Link className='logout-button' target='_blank' onClick={this.onLoggedOut}>Logout</Nav.Link>
//                                 </Nav.Item>
//                             </Nav>
//                         </Navbar>
//                     </header>
//                 <div className='main-body text-center'>
//                     {selectedMovie ? (
//                     <MovieView
//                         movie={selectedMovie}
//                         onClick={() => this.onBackButtonClick()}
//                     />
//                     ) : (
//                     <Container>
//                         <Row>
//                         {movies.map((movie) => (
//                             <Col xs={12} sm={6} md={4} key={movie._id}>
//                             <MovieCard
//                                 key={movie._id}
//                                 movie={movie}
//                                 onClick={(movie) => this.onMovieClick(movie)}
//                             />
//                             </Col>
//                         ))}
//                         </Row>
//                     </Container>
//                     )}
//                 </div>
//                 <div className='test'></div>
//                 </div>
//             </React.Fragment>
//             );
//     }
// }


//  R O L L B A C K   V E R S I O N 


import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../registration-view/registration-view'

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
            movies: null,
            selectedMovie: null,
            user: null,
            register: null
        };
        this.onLoggedOut = this.onLoggedOut.bind(this);
    }

    componentDidMount() {
        axios
            .get('https://m-y-f-l-i-x.herokuapp.com/movies')
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

    onRegister(register) {
        this.setState({
            register
        });
    }

// when user successsfully logs in, this function updates the 'user' property in thstate to that particular user
    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    onLoggedOut() {
        this.setState(state => ({
            user: null
        }));

        // localStorage.removeItem('user');
        // localStorage.removeItem('token');
    }

// when clicked, this function sets selectedMovie state back to null, rendering the main-view page on the DOM
    onButtonClick() {
        this.setState({
            selectedMovie: null
        });
    }

    render() {
        const { movies, selectedMovie, user, register } = this.state;

        // if (!register) return <RegisterView onRegister={(register) => this.onRegister(register)}/>

// if no user, LoginView is rendered. If there is a logged in user, the user details are passed as a prop to the Login View
        if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)}/>

        if (!movies) return <div className='main-view'></div>;

        return (
            <React.Fragment>
                <div className='main-view'>
                    <header>
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
                                <Button className='logout-button' variant='light' type='submit' onClick={this.onLoggedOut}>Logout</Button>
                            </Nav>
                        </Navbar>
                    </header>
                <div className='main-body text-center'>
                    {selectedMovie ? (
                    <MovieView
                        movie={selectedMovie}
                        onClick={() => this.onButtonClick()}
                    />
                    ) : (
                    <Container>
                        <Row>
                        {movies.map((movie) => (
                            <Col xs={12} sm={6} md={4} key={movie._id}>
                            <MovieCard
                                key={movie._id}
                                movie={movie}
                                onClick={(movie) => this.onMovieClick(movie)}
                            />
                            </Col>
                        ))}
                        </Row>
                    </Container>
                    )}
                </div>
                <div className='test'></div>
                </div>
            </React.Fragment>
            );
    }
}