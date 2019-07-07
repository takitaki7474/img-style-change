import React from 'react';

class SelectStyleBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isModalOpen: false};
    this.handleClickStyle = this.handleClickStyle.bind(this);
    this.handleClickClose = this.handleClickClose.bind(this);
  }

  handleClickStyle() {
    this.setState({isModalOpen: true});
  }

  handleClickClose() {
    this.setState({isModalOpen: false});
  }

  render() {
    const styleList = [
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
    if(this.state.isModalOpen) {
      modal = (
        <div className="modal">
          <div className="modal-inner">
            <button className="modal-close-btn" onClick={this.handleClickClose}>とじる</button>
            {styleList.map((styleItem)=>{
              return (
                <div className="modal-style-box">
                  <div className="modal-style-title">{styleItem.title}</div>
                  <img className="modal-style-img" src={styleItem.img_src}/>
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
        {modal}
      </div>
    );
  }
}

export default SelectStyleBtn;
