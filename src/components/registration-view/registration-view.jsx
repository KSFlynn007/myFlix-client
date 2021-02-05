import React, {useState} from 'react';
import PropTypes from 'prop-types';
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
        window.open('/login', '_self')
    }
  
    const handleSubmit = (e) => {
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
          props.onRegister(data);
        })
        .catch(function (error) {
            console.log(error);
        });
    };
  

    return(
        <React.Fragment>
            <Form className='register-form'>
                <h1 className='register-header'>Registration Welcome!</h1>
                <Form.Group controlId='formBasicText'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                    type='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Enter username'
                    />
                </Form.Group>
                <Form.Group controlId='formBasicEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter email'
                    />
                </Form.Group>
                <Form.Group controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter new password'
                    />
                </Form.Group>
                <Form.Group controlId='formBirthday'>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                    type='date'
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    />
                </Form.Group>
                <Button type='button' variant='dark' onClick={handleSubmit}>Submit</Button>
                <Button className='swap-button' type='button' variant='info' onClick={swapView}>Already registered?</Button>
            </Form>
        </React.Fragment>
    );
}

RegisterView.propTypes = {
    register: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        birthday: PropTypes.string.isRequired
    }),
    onRegister: PropTypes.func,
};