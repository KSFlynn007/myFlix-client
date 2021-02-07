import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import {
    Card,
    Button,
    Row,
    Col,
    Container
} from 'react-bootstrap';

import './director-view.scss';

export class DirectorView extends React.Component {
    constructor (){
        super();

        this.state = {};
    }

    render() {
        const {director, movie} = this.props;

        if (!director) return null;

        return (
            <div className='director-view'>
                <Container>
                    <Card className='director-card'>
                        <Card.Body>
                            <Card.Title>{movie.Director.Name}</Card.Title>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )
    }
}

DirectorView.propTypes = {
    Movie: propTypes.shape({
        Director: {
            Name: propTypes.string.isRequired,
            Bio: propTypes.string.isRequired,
            Birth: propTypes.instanceOf(Date)
        }
    })
}