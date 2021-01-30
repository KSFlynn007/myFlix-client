import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movie, onClick } = this.props;

        return (
            <Card style={{ width: '16rem' }}>
                <Card.Img variant="top" src={ movie.ImageURL } />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Button onClick={() => onClick(movie)} variant="link">Open</Button>
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
        Description: PropTypes.string.isRequired,
        Year: PropTypes.string.isRequired,
        ImageURL: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
           Biography: PropTypes.string.isRequired 
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequred,
            Birthdate: PropTypes.instanceOf(Date).isRequired
        }),
        Featured: PropTypes.bool
    }).isRequired,
    // props object must contain onClick and it MUST be a function
    onClick: PropTypes.func.isRequred
};