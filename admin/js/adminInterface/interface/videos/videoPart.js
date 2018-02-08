'use strict'

import React from 'react'
import {changeFormat} from '../../helper/format'
import AdBlock from './adBlock'


class VideoPart extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handelClickOnAddAdBlock = this.handelClickOnAddAdBlock.bind(this)
    }

    handleChange(event) {
        this.props.onChange(this.props.part.part_nr, event.target.id, event.target.value, event.target.checkValidity())
    }

    handelDelete() {
        this.props.onDelete(this.props.part.part_nr)
    }

    handelClickUp() {
        this.props.onClickUp(this.props.part.part_nr)
    }

    handelClickDown() {
        this.props.onClickDown(this.props.part.part_nr)
    }

    handelClickOnAddAdBlock() {
        this.props.onClickAddAdBlock(this.props.part.part_nr)
    }

    handelClickOnCreateAdBlock(event) {
        const input = event.target.parentElement.parentElement.querySelector('#adBlockStart')
        if (input.checkValidity() && input.value !== '') {
            this.props.onClickCreateAdBlock(this.props.part.part_nr, input.value)
        } else {
            if (!input.classList.contains('wrong-input')) {
                input.classList.add('wrong-input')
            }
        }
    }

    handleChangeOnAddAdBlock(event) {
        if (!event.target.checkValidity()) {
            event.target.classList.add('wrong-input')
        } else {
            event.target.classList.remove('wrong-input')
        }
    }

    handelCLickOnDeleteAdBlockButton() {

    }

    render() {

        const adBlocks = this.props.part.ad_blocks.map((adBlock,index) => {
            return (
                <AdBlock
                    key={'ad-block-' + index}
                    adBlockNumber={index+1}
                    startTime={this.props.part.ad_blocks[index].sec_in_part}
                    onClickDeleteAdBlock={this.props.onClickDeleteAdBlock}/>
            )
        })

        return (
            <div className={this.props.isOnlyPart ? 'ad-inserter-video-part is-only-part' : 'ad-inserter-video-part'}>
                <div className='ad-inserter-video-part-head'>
                    <div>
                        <div className='ad-inserter-up-down-keys'>
                            <i className="material-icons up-button"
                               onClick={this.handelClickUp.bind(this)}>
                                keyboard_arrow_up
                            </i>
                            <i className="material-icons down-button"
                               onClick={this.handelClickDown.bind(this)}>
                                keyboard_arrow_down
                            </i>
                        </div>
                        <p className='ad-inserter-h3-bold'>{(this.props.part.part_nr + 1) + '. video part'}<span className='ad-inserter-h3'>{this.props.part.name}</span></p>
                    </div>
                    <i className="material-icons delete"
                       onClick={this.handelDelete.bind(this)}>
                        delete
                    </i>
                </div>
                <div className='ad-inserter-video-part-subheader'>
                    <div>
                        <p className='ad-inserter-h3'>start<span>{changeFormat(this.props.part.start)}</span></p>
                        <p className='ad-inserter-h3'>end<span>{changeFormat(this.props.part.end)}</span></p>
                    </div>
                    <div>
                        <p className='ad-inserter-h3'>video duration<span>{changeFormat(this.props.part.duration)}</span></p>
                    </div>
                </div>
                <div className='ad-inserter-video-part-content'>
                    <div className='ad-inserter-lable-input-row'>
                        <label className='ad-inserter-input-label'
                               htmlFor='videoPartName'>part name</label>
                        <input className='ad-inserter-input'
                               id='videoPartName'
                               placeholder='name'
                               title='Insert a name for this video part.'
                               type='text'
                               maxLength='2000'
                               required
                               value={this.props.part.name}
                               onChange={this.handleChange}/>
                    </div>
                    <div className='ad-inserter-lable-input-row'>
                        <label className='ad-inserter-input-label'
                               htmlFor='videoPartDash'>dash url</label>
                        <input className='ad-inserter-input'
                               id='videoPartDash'
                               placeholder='url (.mpd)'
                               title='Insert url which links to a DASH file (.mpd).'
                               type='url'
                               pattern='.*\.mpd$'
                               required
                               value={this.props.part.dash_url}
                               onChange={this.handleChange}/>
                    </div>
                    <div className={this.props.part.ad_blocks.length === 0 ? 'ad-inserter-lable-input-row' : 'ad-inserter-lable-input-row border-active'}>
                        <label className='ad-inserter-input-label'
                               htmlFor='videoPartHls'>hls url</label>
                        <input className='ad-inserter-input'
                               id='videoPartHls'
                               placeholder='url (.m3u8)'
                               title='Insert url which links to a HLS file (.m3u8).'
                               type='url'
                               pattern='.*\.m3u8$'
                               value={this.props.part.hls_url}
                               onChange={this.handleChange}/>
                    </div>
                </div>
                { adBlocks }
                {
                    this.props.part.addAdBlock ?
                    <div className={this.props.part.ad_blocks.length === 0 ? 'ad-inserter-video-part-new-ad-block' : 'ad-inserter-video-part-new-ad-block no-border'}>
                        <p className='ad-inserter-h3-bold'>create new ad block</p>
                        <div className='ad-inserter-lable-input-row'>
                            <label className='ad-inserter-input-label'
                                   htmlFor='adBlockStart'>ad block start time</label>
                            <input className='ad-inserter-input'
                                   id='adBlockStart'
                                   placeholder={'start time (0-' + this.props.part.duration + 'ms)'}
                                   title={'Insert start time in video part. Time should be between 0 and ' + this.props.part.duration + 'ms.'}
                                   type='number'
                                   min='0'
                                   max={this.props.part.duration}
                                    onChange={this.handleChangeOnAddAdBlock.bind(this)}/>
                        </div>
                        <div className='ad-inserter-right-button-group'>
                            <button type='button'
                                    className='ad-inserter-button-white-blue'
                                    onClick={this.handelClickOnAddAdBlock}>
                                <i className="material-icons">clear</i>cancel
                            </button>
                            <button type='button'
                                    className='ad-inserter-button-green-white'
                                    onClick={this.handelClickOnCreateAdBlock.bind(this)}>
                                <i className="material-icons">add</i>create ad block
                            </button>
                        </div>
                    </div>
                        :
                    <div className={ this.props.part.ad_blocks.length === 0 ? 'ad-inserter-video-right-button' : 'ad-inserter-video-right-button active-padding-top'}>
                        <button type='button'
                                className='ad-inserter-button-white-blue'
                                onClick={this.handelClickOnAddAdBlock}>
                            <i className="material-icons">add</i>ad block
                        </button>
                    </div>
                }
            </div>
        )
    }
}

export default VideoPart