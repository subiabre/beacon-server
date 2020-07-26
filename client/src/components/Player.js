import React from 'react';

class Player extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            song: props.song
        }
    }

    bySocket = {
        play: false,
        pause: false,
        volume: false
    };

    componentDidMount()
    {
        this.props.socket.on('play:song', (song) => {
            this.bySocket.play = true;

            this.setState({
                song: song
            }, () => {
                this.refs.audio.pause();
                this.refs.audio.load();
                this.refs.audio.play();
            });
        });

        this.props.socket.on('play:time', (time) => {
            this.bySocket.play = true;

            this.refs.audio.currentTime = time;
            this.refs.audio.play();
        });

        this.props.socket.on('pause', () => {
            this.bySocket.pause = true;

            this.refs.audio.pause();
        });

        this.props.socket.on('volume', (volume) => {
            this.bySocket.volume = true;

            this.refs.audio.volume = volume.value;
            this.refs.audio.muted = volume.muted;
        });
    }

    handlePlay = (event) =>
    {
        const time = event.target.currentTime;

        if (!this.bySocket.play) {
            this.props.socket.emit('play:allSockets:time', time);
        }

        this.bySocket.play = false;
    }

    handlePause = () =>
    {
        if (!this.bySocket.pause) {
            this.props.socket.emit('pause:allSockets');
        }

        this.bySocket.pause = false;
    }

    handleVolume = (event) => {
        const volume = {
            value: event.target.volume,
            muted: event.target.muted
        }

        if (!this.bySocket.volume) {
            this.props.socket.emit('volume:allSockets', volume)
        }

        this.bySocket.volume = false;
    }

    render()
    {
        let song = this.state.song;

        if (typeof song.id == 'undefined') {
            song = {
                id: 1,
                mime: 'audio/mpeg'
            }
        }

        return (
            <audio
                ref = "audio"
                onPlay = {this.handlePlay}
                onPause = {this.handlePause}
                onVolumeChange = {this.handleVolume}
                controls
            >
                <source
                    src = {'/song/' + song.id + '/stream'}
                    type = {song.mime}
                >
                </source>
            </audio>
        );
    }
}

export default Player;
