import React from 'react';

class SearchResult extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            result: {}
        }
    }

    render()
    {
        const result = this.props.result;

        return (
            <li
                className = 'SearchResult'
                key = {result.id}
            >
                <img title={result.release} src={'/image/' + result.id}></img>
                <p title={result.name}>{result.name}</p>
                <p title={result.release} className='Result-Release'>in {result.release}</p>
                <p title={result.artist} className='Result-Artist'>by {result.artist}</p>
            </li>
        )
    }
}

export default SearchResult;
