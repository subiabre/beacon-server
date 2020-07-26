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
            <React.Fragment>
                <h2>{this.state.results.length} Results</h2>
                <hr/>
                <ul className = 'SearchResults'>
                    {this.state.results.map((result) => (
                        <SearchResult 
                            getSong = {this.props.getSong}
                            song = {result}
                        />
                    ))}
                </ul>
            </React.Fragment>
        )
    }
}

export default SearchList;
