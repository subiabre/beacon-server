import React from 'react';
import '../assets/css/Player.css';

class Player extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            song: props.song
        }
    }

    componentDidMount()
    {
        this.props.socket.on('play:song', (song) => {
            this.setState({
                song: song
            }, () => {
                this.refs.audio.pause();
                this.refs.audio.load();
                this.refs.audio.muted = true;
                this.refs.audio.play();
                this.refs.audio.muted = false;

                if (this.props.target.id !== this.props.socket.id) {
                    this.props.socket.emit('play:atSocket', {
                        socketId: this.props.target.id,
                        song: song
                    });
                }
            });
        });

        this.props.socket.on('play:time', (time) => {
            this.refs.audio.currentTime = time;
            this.refs.audio.play();
        });

        this.props.socket.on('pause', () => {
            this.refs.audio.pause();
        });

        this.props.socket.on('volume', (volume) => {
            this.refs.audio.volume = volume.value;
            this.refs.audio.muted = volume.muted;
        });
    }

    handlePlay = (event) =>
    {
        const time = event.target.currentTime;

        this.props.socket.emit('play:atSocket:time', {
            socketId: this.props.target.id,
            time: time
        });
    }

    handlePause = () =>
    {
        this.props.socket.emit('pause:atSocket', {
            socketId: this.props.target.id,
            song: this.state.song
        });
    }

    handleVolume = (event) => {
        const volume = {
            value: event.target.volume,
            muted: event.target.muted
        }

        this.props.socket.emit('volume:atSocket', {
            socketId: this.props.target.id,
            volume: volume
        });
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
            <React.Fragment>
                <div className="Player">
                    <p className="Playing">Now playing:</p>
                    <p>{this.state.song.name}</p>
                    <p>from {this.state.song.release} </p>
                    <p>by {this.state.song.artist} </p>

                    <audio
                        ref = "audio"
                        onPlay = {this.handlePlay}
                        onPause = {this.handlePause}
                        onVolumeChange = {this.handleVolume}
                        className = "PlayerAudio"
                        controls
                    >
                        <source
                            src = {'/song/' + song.id + '/stream'}
                            type = {song.mime}
                        >
                        </source>
                    </audio>
                </div>
            </React.Fragment>
        );
    }
}

export default Player;
