  
import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import Config from '../../config'
import { Link } from 'react-router-dom'


import './profile-view.scss';
import {
    Form, 
    Button,
    Container,
    Card,
    CardDeck,
    Tab,
    Tabs
} from 'react-bootstrap'

export class ProfileView extends React.Component {
  constructor() {
    super();
    (this.Username = null), (this.Password = null), (this.Email = null), (this.Birthday = null);
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      validated: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }


  getUser(token) {
    const username = localStorage.getItem('user');
    axios
      .get(`${Config.API_URL}/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleRemoveFavorite(e, movie) {
    e.preventDefault();

    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .delete(`${Config.API_URL}/users/${username}/FavoriteMovies/${movie}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('Movie removed from favorites');
        this.componentDidMount();
        // window.open('_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleUpdate(e, newUsername, newPassword, newEmail, newBirthday) {
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios({
      method: 'put',
      url: `${Config.API_URL}/users/${username}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        Username: newUsername ? newUsername : this.state.Username,
        Password: newPassword ? newPassword : this.state.Password,
        Email: newEmail ? newEmail : this.state.Email,
        Birthday: newBirthday ? newBirthday : this.state.Birthday,
      },
    })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        alert('Changes have been saved!');
        localStorage.setItem('user', this.state.Username);
        window.open(`/users/${username}`, '_self');
        // console.log(response.data);

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }

  handleDeregister(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios
      .delete(`${Config.API_URL}/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('Your account has been deleted');
        window.open(`/`, '_self');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { FavoriteMovies, validated } = this.state;
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const { movies } = this.props;

    return (
      <Container className='profile-view'>
        <Tabs defaultActiveKey='profile' transition={false} className='profile-tabs'>


          <Tab className='tab-item' eventKey='profile' title='Profile'>
            <Card className='profile-card' border='info'>
              <Card.Title className='profile-title'>{username}'s Favorite Movies</Card.Title>
              <Card.Body>
                {FavoriteMovies.length === 0 && <div className='card-content'>You don't have any favorite movies yet!</div>}

                <div className='favorites-container'>
                  {FavoriteMovies.length > 0 &&
                    movies.map((movie) => {
                      if (movie._id === FavoriteMovies.find((favMovie) => favMovie === movie._id)) {
                        return (
                          <div key={movie._id}>
                          <CardDeck className='movie-card-deck'>
                            <Card className='favorites-item card-content' style={{ width: '16rem', flex: 1 }}>
                              {/* <Card.Img>{movie.ImageURL}</Card.Img> */}
                              <Card.Body className='movie-card-body'>
                                <Card.Title className='movie-card-title'>{movie.Title}</Card.Title>
                                <Card.Title className='text-muted'>{movie.Year}</Card.Title>
                                <Button size='sm' className='profile-button view-movie' variant='info' as={Link} to={`/movies/${movie._id}`} target='_self'>
                                  View Movie
                                </Button>
                                <Button size='sm' className='profile-button remove-favorite' variant='danger' onClick={(e) => this.handleRemoveFavorite(e, movie._id)}>
                                  Remove
							                	</Button>
                                </Card.Body>
                            </Card>
                          </CardDeck>
                          </div>
                        );
                      }
                    })}
                </div>
              </Card.Body>
            </Card>
          </Tab>


          <Tab className='tab-item' eventKey='update' title='Update'>
            <Card className='update-card' border='info'>
              <Card.Body>
                <Card.Title className='profile-title'>Update Profile</Card.Title>
                <Card.Subtitle>If you are not updating a certain field (ex; email), then leave that field empty.
                  If you are not updating your password, please enter your old password for verification.
                </Card.Subtitle>
                <Form noValidate validated={validated} className='update-form' onSubmit={(e) => this.handleUpdate(e, this.Username, this.Password, this.Email, this.Birthday)}>
                  <Form.Group controlId='formBasicUsername'>
                    <Form.Label className='form-label'>Username</Form.Label>
                    <Form.Control type='text' placeholder='Change Username' onChange={(e) => this.setUsername(e.target.value)} pattern='[a-zA-Z0-9]{5,}'/>
                    <Form.Control.Feedback type='invalid'>Please enter a valid username with at least 6 alphanumeric characters.</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId='formBasicPassword'>
                    <Form.Label className='form-label'>
                      Password <span className='required'>*</span>
                    </Form.Label>
                    <Form.Control type='password' placeholder='Current or New Password' onChange={(e) => this.setPassword(e.target.value)} pattern='.{5,}'/>
                    <Form.Control.Feedback type='invalid'>Please enter a valid password with at least 6 characters.</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId='formBasicEmail'>
                    <Form.Label className='form-label'>Email</Form.Label>
                    <Form.Control type='email' placeholder='Change Email' onChange={(e) => this.setEmail(e.target.value)} />
                    <Form.Control.Feedback type='invalid'>Please enter a valid email address.</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId='formBasicBirthday'>
                    <Form.Label className='form-label'>Birthday</Form.Label>
                    <Form.Control type='date' placeholder='Change Birthday' onChange={(e) => this.setBirthday(e.target.value)} />
                    <Form.Control.Feedback type='invalid'>Please enter a valid birthday.</Form.Control.Feedback>
                  </Form.Group>
                  <Button className='button' type='submit' variant='info'>
                    Update
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Tab>


          <Tab className='tab-item' eventKey='delete' title='Delete Profile'>
            <Card className='update-card' border='danger'>
              <Card.Title className='profile-title'>Delete Your Profile</Card.Title>
              <Card.Subtitle className='text-muted'>If you delete your account, it cannot be recovered.</Card.Subtitle>
              <Card.Body>
                <Button className='button' variant='danger' onClick={(e) => this.handleDeregister(e)}>
                    Click Here If You're Sure!
				</Button>
              </Card.Body>
            </Card>
          </Tab>


        </Tabs>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  user: propTypes.shape({
    FavoriteMovies: propTypes.arrayOf(
      propTypes.shape({
        _id: propTypes.string.isRequired,
        Title: propTypes.string.isRequired,
      })
    ),
    Username: propTypes.string.isRequired,
    Email: propTypes.string.isRequired,
    Birthday: propTypes.instanceOf(Date),
  })  
};