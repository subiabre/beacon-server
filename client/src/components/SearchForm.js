import React from 'react';

class SearchForm extends React.Component
{
    render()
    {
        return (
            <form
                className = 'SearchBar'
                onSubmit = {this.props.handleSubmit}
            >
                <input
                    type = 'text'
                    placeholder = 'Search here'
                    value = {this.props.query}
                    onChange = {this.props.handleChange}
                >
                </input>
                <input type='submit' value='Search'></input>
            </form>
        )
    }
}

export default SearchForm;
