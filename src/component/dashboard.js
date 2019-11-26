import React, { Component } from "react";
import './style.css';
import socketIOClient from "socket.io-client";

export default class dashboard extends Component {

  constructor(props){
      super(props)
      this.state={
          send_msg:'',
          recieve_msg:'',
          endpoint: "localhost:5000",
      }
  }

  sendMessageHandler = (e)=>{
    this.setState({send_msg:e.target.value});
  }
  recieveMessageHandler = (e)=>{
    this.setState({recieve_msg:e.target.value});
  }
  send = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('send msg', this.state.send_msg);
  }
  recieve = ()=>{
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('resend msg', this.state.recieve_msg);
  }
  componentDidMount(){
    const socket = socketIOClient(this.state.endpoint);
    socket.on('resend msg', (data) => {
        console.log('something',data);
        this.setState({recieve_msg:data.data})
    })
    socket.on('send msg',(data)=>{
      console.log(data);
      this.setState({send_msg:data.data})
    })
  }
  
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="clo-md-6">
              <div className="card">
                <div className="card-body">
                  <form>
                    <textarea
                      className="form-group"
                      type="text"
                      value={this.state.send_msg}
                      onChange={this.sendMessageHandler}
                    ></textarea>
                  </form>
                </div>
                <div className="card-footer">
                  <button className="btn btn-outline-success" onClick={this.send}>SEND</button>
                </div>
              </div>
            </div>
            <div className="clo-md-6">
              <div className="card">
                <div className="card-body">
                  <form>
                  <textarea
                      className="form-group"
                      type="text"
                      value={this.state.recieve_msg}
                      onChange={this.recieveMessageHandler}
                    ></textarea>
                  </form>
                </div>
                <div className="card-footer">
                  <button className="btn btn-outline-success" onClick={this.recieve}>SEND</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
