import React from 'react';

class Introduction extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    let displayStyleImg;
    let displayUploadedImg;

    console.log('イントロスタイル' + this.props.styleURL);
    console.log('イントロアップロード' + this.props.uploadedURL);
    console.log(this.props.isStyle);
    console.log(this.props.isUploaded);

    return(
      <div>
        <div>aaa</div>
      </div>
    );
  }
}

export default Introduction;
