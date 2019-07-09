import React from 'react';

class StyleChangeBtn extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    console.log(this.props.styleURL);
    console.log(this.props.uploadedURL);
    return(
      <div className="button-item">
        <p>スタイル変換</p>
      </div>
    );
  }
}

export default StyleChangeBtn;
