import React from 'react';
import SearchResult from './SearchResult';
import '../assets/css/Search.css';

class SearchBar extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            query: '',
            results: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event)
    {
        this.setState({
            query: event.target.value
        });

        fetch('/' + event.target.value)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    results: res
                });
            });
    }

    handleSubmit(event)
    {
        event.preventDefault();
    }

    render()
    {
        const results = this.state.results;

        return (
            <React.Fragment>
                <form
                    className = 'SearchBar'
                    onSubmit = {this.handleSubmit}
                >
                    <input
                        type = 'text'
                        placeholder = 'Search here'
                        value = {this.state.query}
                        onChange = {this.handleChange}
                    >
                    </input>
                    <input type='submit' value='Search'></input>
                </form>

                <ul className = 'SearchResults'>
                    {results.map((result) => (
                        <SearchResult result = {result} />
                    ))}
                </ul>
            </React.Fragment>
        )
    }
}

export default SearchBar;
