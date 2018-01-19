'use strict'

import { Link } from 'react-router-dom'

import React from 'react'
import Video from './video'
import { highlightNavigation } from '../helper/wpRouting'

class NewVideo extends React.Component {
    render() {
        return (
            <div>
                <div className='ad-inserter-headline'>
                    <h2 className='ad-inserter-h2'>Create New Video</h2>
                </div>
                <form className='ad-insertion-content-wrapper'>
                    <p>Insert form to create a new video!</p>
                    <div className='ad-inserter-right-button-group'>
                        <Link to={'/wp/wp-admin/admin.php?page=mpat-ad-insertion-all-ad-inserted-videos'}>
                            <button className='white_blue'
                                    onClick={() => highlightNavigation('mpat-ad-insertion-new-video', 'mpat-ad-insertion-all-ad-inserted-videos')}>
                                cancel
                            </button>
                        </Link>
                        <Link to={'/wp/wp-admin/admin.php?page=mpat-ad-insertion-all-ad-inserted-videos'}>
                            <button type='submit'
                                    className='green_white'
                                    onClick={() => highlightNavigation('mpat-ad-insertion-new-video', 'mpat-ad-insertion-all-ad-inserted-videos')}>
                                save
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default NewVideo