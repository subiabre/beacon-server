import React from 'react';

class SearchResult extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            song: props.song
        }
    }

    componentDidUpdate(prevProps)
    {
        if (prevProps.song.id !== this.props.song.id) {
            this.setState({
                song: this.props.song
            });
        }
    }

    handleClick = () => {
        this.props.getSong(this.state.song);
    }

    render()
    {
        const result = this.state.song;

        return (
            <li
                className = 'SearchResult'
                key = {result.id}
            >
                <img 
                    alt = {result.release + 'album cover'}
                    title = {result.release} 
                    src = {'/image/' + result.id}
                    onClick = {this.handleClick}
                ></img>
                <p title={result.name}>{result.name}</p>
                <p title={result.release} className='Result-Release'>in {result.release}</p>
                <p title={result.artist} className='Result-Artist'>by {result.artist}</p>
            </li>
        )
    }
}

export default SearchResult;
