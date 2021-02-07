import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    Container,
    Card,
    Button
} from 'react-bootstrap';

import './genre-view.scss';

export class GenreView extends React.Component {
    constructor(){
        super();

        this.state = {};
    }

    render() {
        const { genre, movie } = this.props;

        if (!genre) return null;

        return(
            <div className='genre-view'>
                <Container>
                    <Card className='genre-card'>
                        <Card.Body>
                            <Card.Title>{movie.Genre.Name}</Card.Title>
                            <Card.Text>{movie.Genre.Description}</Card.Text>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )        
    }
}

GenreView.propTypes = {
    Movie: propTypes.shape({
        Genre: {
            Name: propTypes.string.isRequired,
            Description: propTypes.string.isRequired,
        }
    }).isRequired
}