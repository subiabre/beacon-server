import React from 'react';
import SearchResult from './SearchResult';

class SearchList extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            results: props.results
        };
    }

    componentDidUpdate(prevProps)
    {
        if (prevProps.results.length !== this.props.results.length){
            this.setState({
                results: this.props.results
            });
        }
    }

    render()
    {
        return (
            <ul className = 'SearchResults'>
                <h2>{this.state.results.length} Results</h2>
                {this.state.results.map((result) => (
                    <SearchResult 
                        getSong = {this.props.getSong}
                        song = {result}
                    />
                ))}
            </ul>
        )
    }
}

export default SearchList;
