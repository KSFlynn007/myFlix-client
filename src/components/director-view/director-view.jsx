import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Config from '../../config';
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

    formatDate = (date) => {
        return `${Config.MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }

    render() {
        const {director} = this.props;

        if (!director) return null;

        return (
            <div className='director-view'>
                <Container>
                    <Card className='director-card'>
                        <Card.Body>
                            <Card.Title>{director.Name}</Card.Title>
                            <Card.Subtitle className='text-muted'>{this.formatDate(director.Birthday)}</Card.Subtitle>
                            <Card.Text className='director-bio'>{director.Bio}</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card.Footer>
                        <Link to={`/`}>
                            <Button className='returnButton' variant='dark'>Return to Movie List</Button>
                        </Link>
                    </Card.Footer>
                </Container>
            </div>
        )
    }
}

DirectorView.propTypes = {
    director: propTypes.shape({
        Name: propTypes.string.isRequired,
        Bio: propTypes.string.isRequired,
        Birthday: propTypes.instanceOf(Date),
    })
}
