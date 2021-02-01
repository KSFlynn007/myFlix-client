import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movie, onClick } = this.props;

        return (
            <Card style={{ width: '16rem' }}>
                <Card.Img variant='top' src={ movie.ImageURL } />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Button onClick={() => onClick(movie)} variant='link'>Open</Button>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    // shape({...}) means it expects an object
    movie: PropTypes.shape({
        // movie prop may contain Title, and IF it does, it must be a string
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
        imageURL: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
           biography: PropTypes.string.isRequired 
        }),
        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string.isRequred,
            birthdate: PropTypes.instanceOf(Date)
        }),
        Featured: PropTypes.bool
    }).isRequired,
    // props object must contain onClick and it MUST be a function
    onClick: PropTypes.func.isRequired
};