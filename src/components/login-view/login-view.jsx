import React, {useState} from 'react';
import PropTypes from 'prop-types';

import './login-view.scss';

import { Form, Button} from 'react-bootstrap';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = () => {
        e.preventDefault();
        console.log(username, password);
        // send a request to server for authentication, then calls props.onLoggedIn(username)
        props.onLoggedIn(username);
    };

  return (
    <React.Fragment>
      <Form className='form-login'>
        <h1 className='text-danger'>Welcome to myFlix!</h1>
        <p className='mb-5'>Please login to continue.</p>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter Username'
          />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Enter Password'
          />
        </Form.Group>
        {/*<p>
          Dont have an account?
          <Button onClick={handleRegister} variant='link'>
            Register
          </Button>
        </p>*/}
        <Button onClick={handleSubmit} variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        pasword: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired,
    onRegister: PropTypes.func,
};