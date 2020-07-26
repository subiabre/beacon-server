import React from 'react';

class Socket extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            title: props.title,
            className: props.className,
            socket: props.socket
        };
    }

    componentDidUpdate(prevProps){
        if(prevProps.title !== this.props.title){
            this.setState({          
                title: this.props.title,
                className: this.props.className
            });
        }
    }

    handleClick = () => {
        const socket = this.state.socket;

        this.props.io.emit('socket:target', socket);

        this.props.getSocket(socket);
        
        this.setState({
            title: "Emitting to this socket",
            className: "Socket Playing"
        });
    }

    render()
    {
        const socket = this.state.socket;

        return (
            <li
                title = {this.state.title}
                className = {this.state.className}
                onClick = {this.handleClick}
                key = {socket.id}
            >
                {socket.userAgent.name} @ {socket.userAgent.os} {socket.userAgent.device_type}
            </li>
        );
    }
}

export default Socket;
