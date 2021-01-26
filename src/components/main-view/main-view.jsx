import React from 'react';
import axios from 'axios';

class MainView extends React.Component{
    constructor(){
        super();
        // initalize empty object state to be destructured later
        // so it can be accessed later by const { something } = this.state
        this.state = {};
    }

    render() {
        return(
            <div className="main-view"></div>
        );
    }
}