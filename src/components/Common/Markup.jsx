import React  from 'react';

export default class Markup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className={this.props.class} dangerouslySetInnerHTML={{__html: this.props.markupText}}/>
    );
  }
};

Markup.propTypes = {
  markupText: React.PropTypes.string,
  class: React.PropTypes.string
};