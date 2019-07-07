import React from 'react';
import UploadBtn from './UploadBtn';

class SelectStyleBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      style_url: ''
    };
    this.handleClickStyle = this.handleClickStyle.bind(this);
    this.handleClickClose = this.handleClickClose.bind(this);
    this.selectStyle = this.selectStyle.bind(this);
    this.styleList = [];
  }

  handleClickStyle() {
    this.setState({isModalOpen: true});
  }

  handleClickClose() {
    this.setState({isModalOpen: false});
  }

  selectStyle(imgCount) {
    this.setState({style_url: this.styleList[imgCount].img_src});
    this.handleClickClose();
  }

  render() {
    this.styleList = [
      {
        title: "タイトル1",
        img_src: "/src/style/style.png"
      },
      {
        title: "タイトル2",
        img_src: "/src/style/style_2.png"
      },
      {
        title: "タイトル3",
        img_src: "/src/style/style_3.png"
      },
      {
        title: "タイトル4",
        img_src: "/src/style/style_4.png"
      },
      {
        title: "タイトル5",
        img_src: "/src/style/style_5.png"
      }
    ];

    let modal;
    let count = -1;
    if(this.state.isModalOpen) {
      modal = (
        <div className="modal">
          <div className="modal-inner">
            <button className="modal-close-btn" onClick={this.handleClickClose}>とじる</button>
            {this.styleList.map((styleItem)=>{
              count++;
              return (
                <div className="modal-style-box">
                  <div className="modal-style-title">{styleItem.title}</div>
                  <img className="modal-style-img" src={styleItem.img_src} onClick={this.selectStyle.bind(this, count)}/>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return(
      <div>
        <div onClick={this.handleClickStyle}>
          <p>スタイルを選択</p>
        </div>
        <img src={this.state.style_url}/>
        <UploadBtn styleImageURL={this.state.style_url}/>
        {modal}

      </div>
    );
  }
}

export default SelectStyleBtn;
