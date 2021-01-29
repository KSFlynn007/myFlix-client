import React, {useState} from 'react';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassport ] = useState('');

    const handleSubmit = () => {
        e.preventDefault();
        console.log(username, password);
        // send a request to server for authentication, then calls props.onLoggedIn(username)
    };

    return(
        <form>
            <label>
                Username: 
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="button" onClick={handleSubmit}>Submit</button>
        </form>
    );
}