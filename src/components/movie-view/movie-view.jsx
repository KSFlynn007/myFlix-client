import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {Card, Button} from 'react-bootstrap';

import './movie-view.scss';

export class MovieView extends React.Component {

    constructor () {
        super();

        this.state = {};
    }

    render (){
        const { movie } = this.props;

        if (!movie) return null;

        return(
            <div className='movie-view'>
                <Card>
                    <Card.Img className='movie-poster' variant="top" src={movie.ImageURL} />
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
    {/* NEED TO FLESH OUT FAVORITE BUTTON BELOW, NO LINK YET */}
                    <Link to={`/users/favorites/`}>
                        <Button className='addFavButton' variant='success'> Add Movie to Favorites</Button>
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
            Birthday: propTypes.string
        }),
        Featured: propTypes.bool
    })
};