import React from 'react';
import Socket from 'socket.io-client';
import SocketList from './components/SocketList';
import Search from './components/Search';
import Player from './components/Player';
import './App.css';

const SocketClient = Socket();

class App extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      socketOrigin: SocketClient,
      socketTarget: SocketClient
    };
  }

  getSocket = (socket) =>
  {
    this.setState({
      socketTarget: socket
    }, () => {
      console.log(this.state);
    });
  }

  render()
  {
    return (
      <div className="App">
        <Search 
          target = {this.state.socketTarget}
          socket = {SocketClient}/>
        <SocketList 
          getSocket = {this.getSocket}
          socket = {SocketClient}
        />
        <Player 
          target = {this.state.socketTarget}
          socket = {SocketClient}
          song = {{}}
        />
      </div>
    );
  }
}

export default App;
