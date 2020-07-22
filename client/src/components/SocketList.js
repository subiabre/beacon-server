import React from 'react';
import '../assets/css/SocketList.css';

class SocketList extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            sockets: []
        };

        this.socket = props.socket;
    }

    componentDidMount()
    {
        this.socket.on('socket:update', (sockets) => {
            this.setState({
                sockets: sockets
            });
        });
    }

    socketLi(li)
    {
        const id = this.socket.id;
        
        if (li.id === id) {
            return (
                <li
                    title = 'Current connection'
                    className = 'Socket Current'
                    key = {li.id}
                >
                    {li.userAgent.name} @ {li.userAgent.os} {li.userAgent.device_type}
                </li>  
            );
        }

        return (
            <li
                title = {li.id}
                className = 'Socket'
                key = {li.id}
            >
                {li.userAgent.name} @ {li.userAgent.os} {li.userAgent.device_type}
            </li>
        );
    }

    render()
    {
        const sockets = this.state.sockets;

        return (
            <ul className = "SocketList">
                {sockets.map((socket) => this.socketLi(socket))}
            </ul>
        );
    }
}

export default SocketList;
