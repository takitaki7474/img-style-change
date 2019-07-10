import React from 'react';

class StyleChangeBtn extends React.Component {
  constructor(props){
    super(props);
    this.styleChange = this.styleChange.bind(this);
  }

  styleChange() {
    if (this.props.styleURL == '') {
      window.alert("スタイルを選択してください!!");
    } else if (this.props.uploadedURL == '') {
      window.alert("画像をアップロードしてください!!");
    } else {
      
    }
  }

  render(){
    console.log(this.props.styleURL);
    console.log(this.props.uploadedURL);
    return(
      <div className="button-item" onClick={this.styleChange}>
        <p>スタイル変換</p>
      </div>
    );
  }
}

export default StyleChangeBtn;
