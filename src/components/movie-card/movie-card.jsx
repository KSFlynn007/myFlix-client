import React from 'react';
import propTypes from 'prop-types';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Col>
            <Card className='movie-card' border='info' style={{ width: '18rem' }}>
                <Card.Img className='movie-img' variant='top' src={ movie.ImageURL } />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Subtitle className='text-muted'>{movie.Year}</Card.Subtitle>
                    <Link to={`/movies/${movie._id}`}>
                        <Button variant='info' className='more-button'>See Details</Button>
                    </Link>
                </Card.Body>
            </Card>
            </Col>

        );
    }
}

MovieCard.propTypes = {
    // shape({...}) means it expects an object
    movie: propTypes.shape({
        // movie prop may contain Title, and IF it does, it must be a string
        Title: propTypes.string.isRequired,
        Description: propTypes.string,
        Year: propTypes.number.isRequired,
        ImageURL: propTypes.string.isRequired,
        Genre: propTypes.shape({
            Name: propTypes.string,
           Biography: propTypes.string 
        }),
        Director: propTypes.shape({
            Name: propTypes.string,
            Bio: propTypes.string,
            Birthdate: propTypes.string
        }),
        Featured: propTypes.bool
    }).isRequired
};