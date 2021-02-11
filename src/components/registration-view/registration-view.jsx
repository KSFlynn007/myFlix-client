import React, {useState} from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import Config from '../../config';

import { Form, Button } from 'react-bootstrap';

import './registration-view.scss';

export function RegisterView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');

    const swapView = (e) => {
        e.preventDefault();
        window.location.pathname = `/login`
    }
  
    const handleRegister = (e) => {
        e.preventDefault();
        // sends request to server for authentication
        // entire URL is in package.json under "proxy" to get past CORS
        axios.post(`${Config.API_URL}/users`, {
          Username: username,
          Email: email,
          Password: password,
          Birthday: birthday
        })
        .then(response => {
          const data = response.data;
          console.log(data);
          window.location.pathname = `/`
        })
        .catch(e => {
            console.log('There was an error registering the user.')
        });
    };
  

    return(
        <div>
            <Form className='register-form'>
                <h1 className='register-header'>Welcome to myFlix Registration!</h1>
                <Form.Group controlId='formBasicText'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                    type='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Enter username'
                    pattern='[a-zA-Z0-9]{5,}'
                    />
                    <Form.Text className='text-muted'>Username must be at least 5 alphanumeric characters.</Form.Text>
                    <Form.Control.Feedback type="invalid">Please enter a valid username with at least 5 alphanumeric characters.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='formBasicEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter email'
                    pattern='.{5,}'
                    />
                    <Form.Text className='text-muted'>Must be a valid email.</Form.Text>
                    <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter new password'
                    />
                    <Form.Control.Feedback type="invalid">Please enter a valid password.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='formBirthday'>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                    type='date'
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">Please enter a valid date.</Form.Control.Feedback>
                </Form.Group>
                <Button type='button' variant='dark' onClick={handleRegister}>Submit</Button>
                <Button className='swap-button' type='button' variant='info' onClick={swapView}>Already registered?</Button>
            </Form>
        </div>
    );
}

RegisterView.propTypes = {
    register: propTypes.shape({
        Username: propTypes.string.isRequired,
        Email: propTypes.string.isRequired,
        Password: propTypes.string.isRequired,
        Birthday: propTypes.instanceOf(Date).isRequired
    }),
    onRegister: propTypes.func,
};