'use strict'

import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { parse } from 'query-string'

import HomeVideoAdInsertion from './homeVideoAdInsertion'
import AllVideos from './allVideos'
import NewVideo from './newVideo'
import AllAds from './allAds'
import NewAd from './newAd'

class InterfaceRoot extends React.Component {
    render() {
        return (
            <Router>
                <Route component={Interface}/>
            </Router>
        );
    }
}

class Interface extends React.Component {
    render() {
        return (
            <div>
                { parse(location.search).page === 'mpat-ad-insertion' ? <HomeVideoAdInsertion/> : null }
                { parse(location.search).page === 'mpat-ad-insertion-all-ad-inserted-videos' ? <AllVideos/> : null }
                { parse(location.search).page === 'mpat-ad-insertion-new-video' ? <NewVideo/> : null }
                { parse(location.search).page === 'mpat-ad-insertion-all-ads' ? <AllAds/> : null }
                { parse(location.search).page === 'mpat-ad-insertion-new-ad' ? <NewAd/> : null }
            </div>
        );
    }
}

export { Interface, InterfaceRoot }