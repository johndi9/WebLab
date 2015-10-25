import React  from 'react';
import styles from './Message.scss';

export default class Message extends React.Component{
  render() {
    return  (<div className={ styles.message }>
              <p className={ styles.text }>Scoped Selectors</p>
            </div>);
  }
};
