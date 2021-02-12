import React from 'react';
import { connect } from 'react-redux';
import {MovieCard} from '../movie-card/movie-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import { Col, Row } from 'react-bootstrap';
import './movies-list.scss';

const mapStateToProps = state => {
    const {visibilityFilter} = state;
    return {visibilityFilter};
};

function MoviesList(props) {
    const {movies, visibilityFilter} = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter((m) => m.Title.toLocaleLowerCase().includes(visibilityFilter.toLocaleLowerCase()));
    }

    if (!movies) return <div className='main-view' />;

      return (
            <Row className="movieCard-row">
                {filteredMovies.map((m, index) => (
                <Col key={index} className="movieCard-col" md="4" sm="6" xs="12">
                    <MovieCard key={m._id} movie={m} />
                </Col>
                ))}
            </Row>
  );
    
}

export default connect(mapStateToProps)(MoviesList);
