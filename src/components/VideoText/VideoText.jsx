import React    from 'react';
import styles   from './VideoText.scss';
import Markup   from '../Common/Markup.jsx';
import IconFont from '../Common/IconFont.jsx';

export default class VideoText extends React.Component {
  render() {
    return (
      <div className={styles.videoTextContainer}>
        <div className={styles.content}>
          <IconFont icon={'area-chart'} />
          <Markup class={styles.videoText} markupText={'Hello, I\'m Juan Diego'} />
        </div>
      </div>
    );
  }
};