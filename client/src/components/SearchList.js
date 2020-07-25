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

    componentDidUpdate(prevProps){
        if(prevProps.results !== this.props.results){
            this.setState({          
                results: this.props.results
            });
        }
    }

    render()
    {
        const results = this.state.results;

        return (
            <ul className = 'SearchResults'>
                {results.map((result) => (
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
