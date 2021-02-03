import React, {useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './login-view.scss';

import { Form, Button} from 'react-bootstrap';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const swapView = (e) => {
        e.preventDefault();
        window.open('/register', '_self')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // sends request to server for authentication
        // entire URL is in package.json under "proxy" to get past CORS
        axios.post(`https://m-y-f-l-i-x.herokuapp.com/login`, {
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
    <React.Fragment>
      <Form className='login-form'>
        <h1 className='login-header'>Login Here:</h1>
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
    </React.Fragment>
  );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        pasword: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired,
    onRegister: PropTypes.func
};

//  R O L L B A C K   V E R S I O N 

// import React, {useState} from 'react';
// import PropTypes from 'prop-types';

// import './login-view.scss';

// import { Form, Button} from 'react-bootstrap';

// export function LoginView(props) {
//     const [ username, setUsername ] = useState('');
//     const [ password, setPassword ] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(username, password);
//         // send a request to server for authentication, then calls props.onLoggedIn(username)
//         props.onLoggedIn(username);
//     };

//   return (
//     <React.Fragment>
//       <Form className='login-form'>
//         <h1 className='login-header'>Login Here:</h1>
//         <Form.Group controlId='formBasicEmail'>
//           <Form.Label>Username</Form.Label>
//           <Form.Control
//             type='text'
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder='Your Username goes here!'
//           />
//         </Form.Group>
//         <Form.Group controlId='formBasicPassword'>
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type='password'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             type='password'
//             placeholder='Your password goes here!'
//           />
//         </Form.Group>
//         <Button onClick={handleSubmit} variant='dark' type='submit'>
//           Submit
//         </Button>
//       </Form>
//     </React.Fragment>
//   );
// }

// LoginView.propTypes = {
//     user: PropTypes.shape({
//         username: PropTypes.string.isRequired,
//         pasword: PropTypes.string.isRequired
//     }),
//     onLoggedIn: PropTypes.func.isRequired,
//     onRegister: PropTypes.func
// };