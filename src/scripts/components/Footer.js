import React from 'react';
import {
    EmailShareButton,
    FacebookShareButton,
    RedditShareButton,
    TwitterShareButton,
    WhatsappShareButton
} from 'react-share';

import {
    EmailIcon,
    FacebookIcon,
    RedditIcon,
    TwitterIcon,
    WhatsappIcon
} from 'react-share';

const Footer = () => {
    const shareUrl = 'http://www.merzadyan.com';
    const title = 'Overreach';
    const size = 64;
    const round = true;
    const footerMessage = 'Author: F.Merzadyan. License: MIT.';
    const githubDescription='Link to GitHub repository';
    const githubUrl = 'https://github.com/fmerzadyan/overreach-app';
    // <h4>{footerMessage} <a href={githubUrl}>{githubDescription}</a></h4>

    return (
        <div className='container'>
            <div className='social__buttons'>
                <FacebookShareButton
                    className='social__button'
                    url={shareUrl}
                    quote={title}
                >
                    <FacebookIcon
                        size={size}
                        round={round}
                    />
                </FacebookShareButton>
                <RedditShareButton
                    className='social__button'
                    url={shareUrl}
                >
                    <RedditIcon 
                        size={size}
                        round={round}
                    />
                </RedditShareButton>
                <TwitterShareButton
                    className='social__button'
                    url={shareUrl}
                    title={title}
                >
                    <TwitterIcon
                        size={size}
                        round={round}
                    />
                </TwitterShareButton>
                <WhatsappShareButton
                    className='social__button'
                    url={shareUrl}
                >
                    <WhatsappIcon
                        size={size}
                        round={round}
                    />
                </WhatsappShareButton>
                <EmailShareButton
                    className='social__button'
                    subject={title}
                    body={shareUrl}
                >
                    <EmailIcon
                        size={size}
                        round={round}
                    />
                </EmailShareButton>
            </div>
            <div className='footer__message'>
            </div>
        </div>
    );
};

export default Footer;
