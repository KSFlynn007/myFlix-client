import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {Card, Button} from 'react-bootstrap';

import './movie-view.scss';
import axios from 'axios';
import Config from '../../config'

export class MovieView extends React.Component {

    constructor () {
        super();

        this.state = {};
    };

    addFavorite = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        axios.post(`${Config.API_URL}/users/${user}/FavoriteMovies/${this.props.movie._id}`, {}, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            alert(`${this.props.movie.Title} added to Favorites List`)
        })
        .catch (function (error) {
            console.log(error);
        });
    };

    render (){
        const { movie } = this.props;

        if (!movie) return null;

        return(
            <div className='movie-view'>
                <Card className='movie-view-card' border='info'>
                    <Card.Img className='movie-poster' variant='top' src={movie.ImageURL} />
                    <Card.Title className='label-title'>{movie.Title}</Card.Title>
                    <Card.Body>
                        <Card.Text className='label-body'>{movie.Description}</Card.Text>
                        <Card.Text className='label-body'>Director: {movie.Director.Name}</Card.Text>
                        <Card.Text className='label-body'>Genre: {movie.Genre.Name}</Card.Text>
                    </Card.Body>
                </Card>
                <Card.Footer>
                    <Link to={`/directors/${movie.Director.Name}`}>
                        <Button className='directorButton' variant='info'>{movie.Director.Name} Info</Button>
                    </Link>
                    <Link to={`/genres/${movie.Genre.Name}`}>
                        <Button className='genreButton' variant='info'>{movie.Genre.Name} Genre Info</Button>
                    </Link>
                    <Link to={``}>
                        <Button className='addFavButton' variant='success' onClick={this.addFavorite}> Add Movie to Favorites</Button>
                    </Link>
                    <Link to={`/`}>
                        <Button className='returnButton' variant='dark'>Return to Movie List</Button>
                    </Link>
                </Card.Footer>
            </div>
        );
    }
}

MovieView.propTypes = {
    // shape({...}) means it expects an object
    movie: propTypes.shape({
        // movie prop may contain Title, and IF it does, it must be a string
        Title: propTypes.string.isRequired,
        Description: propTypes.string,
        Year: propTypes.number,
        ImageURL: propTypes.string.isRequired,
        Genre: propTypes.shape({
            Name: propTypes.string,
           Biography: propTypes.string 
        }),
        Director: propTypes.shape({
            Name: propTypes.string,
            Bio: propTypes.string,
            Birthday: propTypes.instanceOf(Date),
        }),
        Featured: propTypes.bool
    }),
    user: propTypes.shape({
        Username: propTypes.string
    })
};