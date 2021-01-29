import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
    render() {
        const { movie, onClick } = this.props;

        return (
            <div onClick={() => onClick(movie)} className="movie-card">{movie.Title}</div>
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