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
                className = 'Search-Result'
                key = {result.id}
            >
                <p>{result.name}</p>
                <p className='Result-Release'>{result.release}</p>
                <p className='Result-Artist'>{result.artist}</p>
            </li>
        )
    }
}

export default SearchResult;
