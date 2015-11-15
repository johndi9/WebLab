import React        from 'react';
import ReactDOM     from 'react-dom';
import styles       from './main.scss';
import VideoWrapper from './components/VideoWrapper/VideoWrapper.jsx';
import VideoText    from './components/VideoText/VideoText.jsx';

class Main extends React.Component {
  render() {
    return (
      <div>
        <VideoWrapper/>
        <VideoText/>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));
