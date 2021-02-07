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
        const {director} = this.props;

        if (!director) return null;

        return (
            <div className='director-view'>
                <Container>
                    <Card className='director-card'>
                        <Card.Body>
                            <Card.Title>{director.Name}</Card.Title>
                            <Card.Text>{director.Bio}</Card.Text>
                            <Card.Text>{director.Birthday}</Card.Text>
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
    }).isRequired,
}
