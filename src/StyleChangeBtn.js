import React from 'react';
import axios from 'axios';

class StyleChangeBtn extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false
    };
    this.styleChange = this.styleChange.bind(this);
  }

  styleChange() {
    if (this.props.styleURL == '') {
      window.alert("スタイルを選択してください!!");
    } else if (this.props.uploadedURL == '') {
      window.alert("画像をアップロードしてください!!");
    } else {
      this.setState({isLoading: true});

      axios.get(
        'http://localhost:5000/change_style',{
        params:{
          style_url: this.props.styleURL,
          uploaded_url: this.props.uploadedURL
        }
      }).then(result =>{
        this.setState({isLoading: false},()=>{
          this.props.changedURL(result.data.changed_file_path);
        });
      }).catch(error => {
        this.setState({isLoading: false});
      })
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
