import React, {useState} from 'react';
import PropTypes from 'prop-types';

import { Form, Button } from 'react-bootstrap';

import './registration-view.scss';

export function RegisterView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, confirmPassword, email, birthdate);
        props.onRegister(register);
    };

    return(
        <React.Fragment>
            <Form>
                <h1>Registration Welcome!</h1>
                <Form.Group controlId="formBasicText">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Enter Username"
                    />
                </Form.Group>
                <Form.Group controlId='formBasicEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter Email'
                    />
                </Form.Group>
            </Form>
            <Button type="button" onClick={handleSubmit}>Submit</Button>
        </React.Fragment>
        

        // OLD VERSION FOR REFERENCE:
        // <form>
        //     <label>
        //         Username: 
        //         <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        //     </label>
        //     <label>
        //         Email:
        //         <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
        //     </label>
        //     <label>
        //         Password:
        //         <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        //     </label>
        //     <label>
        //         Confirm Password:
        //         <input type="email" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
        //     </label>
        //     <label>
        //         Birthdate:
        //         <input type="birthdate" value={birthdate} onChange={e => setBirthdate(e.target.value)}/>
        //     </label>
        // </form>
    );
}

RegisterView.propTypes = {
    register: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        confirmPassword: PropTypes.string.isRequired,
        Birthdate: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequred
};