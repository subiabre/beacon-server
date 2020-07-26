import React from 'react';
import SearchForm from './SearchForm';
import SearchList from './SearchList';
import '../assets/css/Search.css';

class Search extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            query: '',
            results: [],
            song: {}
        };
    }

    handleChange = (event) =>
    {
        this.setState({
            query: event.target.value
        });

        fetch(event.target.value)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    results: res
                });
            });
    }

    handleSubmit = (event) =>
    {
        event.preventDefault();
    }

    getSong = (song) =>
    {
        this.props.socket.emit('play:atSocket', {
            socketId: this.props.target.id,
            song: song
        });

        this.props.socket.emit('play:atSocket', {
            socketId: this.props.socket.id,
            song: song
        });
    }

    render()
    {
        return (
            <React.Fragment>
                <SearchForm
                    query = {this.state.query}
                    handleChange = {this.handleChange}
                    handleSubmit = {this.handleSubmit}
                />

                <SearchList 
                    getSong = {this.getSong}
                    results = {this.state.results}
                />
            </React.Fragment>
        )
    }
}

export default Search;
