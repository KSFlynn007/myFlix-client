import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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
        if (!director) return null;

        return (
            <Container>
                <Row>
                    <Col className='col-3'>
                        ...
                    </Col>
                </Row>
            </Container>
        )
    }
}

DirectorView.propTypes = {
    Movie: PropTypes.shape({
        Director: {
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.instanceOf(date)
        }
    })
}