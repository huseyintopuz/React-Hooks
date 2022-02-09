import React, { useState, createContext } from 'react';
import User from './User'
import Login from './Login'

export const AppContext = createContext(null)

const UseContext = () => {
    // çoklu props geçmemek için useContext kullanıyoruz
    const [username, setUsername] = useState("")
    return (
        <AppContext.Provider value={{ username, setUsername }}>
            <Login />
            <User />
        </AppContext.Provider>
    );
};

export default UseContext;
