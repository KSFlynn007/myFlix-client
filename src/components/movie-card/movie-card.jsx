import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Card className='movie-card' border='info'>
                <Card.Img className='movie-img' variant='top' src={ movie.ImageURL } />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Subtitle className='text-muted'>{movie.Year}</Card.Subtitle>
                    <Link to={`/movies/${movie._id}`}>
                        <Button variant='info' className='more-button'>See Details</Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    // shape({...}) means it expects an object
    movie: PropTypes.shape({
        // movie prop may contain Title, and IF it does, it must be a string
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string,
        Year: PropTypes.number.isRequired,
        ImageURL: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string,
           Biography: PropTypes.string 
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string,
            Bio: PropTypes.string,
            Birthdate: PropTypes.string
        }),
        Featured: PropTypes.bool
    }).isRequired,
    // props object must contain onClick and it MUST be a function
    onClick: PropTypes.func.isRequired
};