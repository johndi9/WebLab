import React       from 'react';
import classNames  from 'classnames';
import fontAwesome from 'font-awesome-webpack';

export default class Markup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const classes = classNames('fa', 'fa-' + this.props.icon);
    return (
      <i className={classes}></i>
    );
  }
};

Markup.propTypes = {
  icon: React.PropTypes.string
};