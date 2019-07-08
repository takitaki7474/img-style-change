import React from 'react';

class StyleChangeBtn extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    console.log(this.props.styleURL);
    console.log(this.props.uploadedURL);
    return(
      <div>
        <h1>aaaaaa</h1>
      </div>
    );
  }
}

export default StyleChangeBtn;
