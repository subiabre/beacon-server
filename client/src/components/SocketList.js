import React from 'react';
import Socket from './Socket';
import '../assets/css/SocketList.css';

class SocketList extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            sockets: [],
            origin: {}
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

        this.socket.on('socket:origin', (origin) => {
            this.setState({
                origin: origin
            });
        });
    }

    render()
    {
        let sockets = this.state.sockets.map((socket) => {
            if (socket.id == this.socket.id) {
                return (
                    <Socket
                        io = {this.socket}
                        socket = {socket}
                        title = "This is you"
                        className = "Socket Current"
                        getSocket = {this.props.getSocket}
                    />
                )
            }

            if (socket.id == this.state.origin.id) {
                return (
                    <Socket
                        io = {this.socket}
                        socket = {socket}
                        title = "This socket is emitting to you"
                        className = "Socket Origin"
                        getSocket = {this.props.getSocket}
                    />
                )
            }

            return (
                <Socket
                    io = {this.socket}
                    socket = {socket}
                    title = "Play in this socket"
                    className = "Socket"
                    getSocket = {this.props.getSocket}
                />
            )
        });

        return (
            <ul className = "SocketList">
                {sockets}
            </ul>
        );
    }
}

export default SocketList;
