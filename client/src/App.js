import React from 'react';
import Socket from 'socket.io-client';
import SocketList from './components/SocketList';
import Search from './components/Search';
import Player from './components/Player';
import './App.css';

const SocketClient = Socket();

function App() {
  return (
    <div className="App">
      <Search socket = {SocketClient}/>
      <SocketList socket = {SocketClient}/>
      <Player 
        socket = {SocketClient}
        song = {{}}
      />
    </div>
  );
}

export default App;
