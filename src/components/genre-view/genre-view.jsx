import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    Container,
    Col,
    Card,
    Row,
    Button
} from 'react-bootstrap';

import './genre-view.scss';

export class GenreView extends React.Component {
    constructor(){
        super();

        this.state = {};
    }

    render() {
        if (!genre) return null;

        return(
            <Container className='wrapper container-fluid'>
                <Row>
                    <Col className='col-3'/>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>{genre.Genre.Name}</Card.Title>
                                <Card.Text>{genre.Genre.Description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )

        
    }
}

GenreView.propTypes = {
    Movie: PropTypes.shape({
        Genre: {
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
        }
    })
}