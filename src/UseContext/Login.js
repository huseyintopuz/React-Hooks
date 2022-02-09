import React, {useContext} from 'react';
import {AppContext} from './UseContext'
import './login.css'

const Login = () => {
    const {setUsername} = useContext(AppContext)

    return (
        <div className='login'>
            <input type="text" onChange={e => setUsername(e.target.value)} />
        </div>
    );
};

export default Login;
