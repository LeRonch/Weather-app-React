import React from 'react';
import img1 from '../logo/logo_transparent.png'

function Header(){

    return(
    
        <header className="App-header">
            <img src={img1} className="App-logo" alt="logo" />
        </header>

    )
}

export default Header;