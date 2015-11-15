import React  from 'react';
import styles from './VideoWrapper.scss';

export default class VideoWrapper extends React.Component {
  render() {
    return (
      <div className={ styles.videoWrapper }>
        <video id="homepage-video" preload="auto" poster="http://weareduo.co.uk/img/video-img.jpg" autoPlay
               loop webkit-playsinline muted>
          <source src="http://weareduo.co.uk/video/homepage-loop.mp4" type="video/mp4"/>
          <source src="http://weareduo.co.uk/video/homepage-loop.webm" type="video/webm"/>
          <source src="http://weareduo.co.uk/video/homepage-loop.ogg" type="video/ogg"/>
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
};