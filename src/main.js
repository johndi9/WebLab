import React    from 'react';
import ReactDOM from 'react-dom';
import styles   from './main.scss';
import Logo     from './components/Logo/Logo.jsx';
import Message  from './components/Message/Message.jsx';

class Main extends React.Component {
  render() {
    return (<div>
              <Logo/>
              <Message/>
            </div>);
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));
