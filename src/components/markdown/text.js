import React from 'react';

export class P extends React.Component {
  render() {
    const style = {
      fontSize: '15px',
    };
    return <p style={style}>{this.props.children}</p>;
  }
}

export class LI extends React.Component {
  render() {
    const style = {
      fontSize: '15px',
    };
    return <li style={style}>{this.props.children}</li>;
  }
}

export class UL extends React.Component {
  render() {
    const style = {
      fontSize: '15px',
    };

    return <ul style={style}>{this.props.children}</ul>;
  }
}

export class A extends React.Component {
  render() {
    const style = {
      color: '#009dcf',
    };

    return <a href={this.props.href} style={style}>{this.props.children}</a>;
  }
}
