import React  from 'react';
import styles from './Logo.scss';

export default class Logo extends React.Component {
  render() {
    return (<div className={ styles.logo }>
      <p className={ styles.text }>Scoped Selectors</p>
    </div>);
  }
};