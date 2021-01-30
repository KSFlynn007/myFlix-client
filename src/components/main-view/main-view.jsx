import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view'

import './main-view.scss'

import {
    Navbar,
    Nav,
    Form,
    FormControl,
    InputGroup,
    Container,
    Row,
    Col,
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

// when clicked, this function sets selectedMovie state back to null, rendering the main-view page on the DOM
    onButtonClick() {
        this.setState({
            selectedMovie: null
        });
    }

    render() {
        const { movies, selectedMovie, user, register } = this.state;

// if no user, LoginView is rendered. If there is a logged in user, the user details are passed as a prop to the Login View
        if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)}/>

        if (!register) return <RegistrationView onRegister={(register) => this.onRegister(register)}/>

        if (!movies) return <div className="main-view"></div>;

        return (
            <React.Fragment>
                <div className='main-view'>
                <header>
                    <Navbar
                    collapseOnSelect
                    expand='lg'
                    bg='dark'
                    variant='dark'
                    fixed='top'
                    >
                    <Navbar.Brand href='#home'>
                        <img
                        src={logo}
                        className='d-inline-block align-top'
                        alt='React Bootstrap logo'
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav className='mr-auto'>
                        <Nav.Link href='#movies'>Movies</Nav.Link>
                        <Nav.Link href='#genre'>Genre</Nav.Link>
                        <Nav.Link href='#director'>Director</Nav.Link>
                        <Nav.Link href='#login'>Logout</Nav.Link>
                        </Nav>
                        <Form inline>
                        <InputGroup>
                            <FormControl
                            placeholder='Enter keyword here'
                            aria-label='Enter keyword here'
                            aria-describedby='basic-addon2'
                            />
                            <InputGroup.Append>
                            <InputGroup.Text id='basic-addon2'>
                                <FaSearch />
                            </InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                        </Form>
                    </Navbar.Collapse>
                    </Navbar>
                </header>
                <div className='main-body text-center'>
                    {selectedMovie ? (
                    <MovieView
                        movie={selectedMovie}
                        onClick={() => this.setInititalState()}
                    />
                    ) : (
                    <Container className='p-5'>
                        <Row>
                        {movies.map((movie) => (
                            <Col xs={12} md={3} key={movie._id} className='p-2'>
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