import React, { Component } from 'react';

import Announcemnt from './Announcement/Announcement';

import './home.css'

export default class Home extends Component {

    render() {
        return (
            <>
                <main className='home-container'>
                    <Announcemnt />
                </main>

                <div className='latest'>
                </div>
            </>
        );
    }
}