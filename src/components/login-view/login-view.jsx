import React, {useState} from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import Config from '../../config';
import { useHistory } from 'react-router-dom';

import './login-view.scss';

import { Form, Button, Container} from 'react-bootstrap';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const history = useHistory();

    const swapView = (e) => {
        e.preventDefault();
        history.push(`/register`);
        // using window is breaking virtual DOM
        // window.location.pathname = `/register`
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // sends request to server for authentication
        axios.post(`${Config.API_URL}/login`, {
          Username: username,
          Password: password
        })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

  return (
    <Container className='login-view'>
      <Form className='login-form'>
        <h1 className='login-header'>Login:</h1>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Your Username goes here!'
          />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Your password goes here!'
          />
        </Form.Group>
        <Button onClick={handleSubmit} variant='dark' type='submit'>
          Submit
        </Button>
        <Button className='swap-button' type='button' variant='info' onClick={swapView}>Not Registered?</Button>
      </Form>
    </Container>
  );
}

LoginView.propTypes = {
    user: propTypes.shape({
        username: propTypes.string.isRequired,
        password: propTypes.string.isRequired
    }),
    onLoggedIn: propTypes.func.isRequired,
    onRegister: propTypes.func
};
