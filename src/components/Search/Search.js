import React, { Component } from 'react';
import UserCard from '../User/UserCard';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            data: props.data,
            filteredData: [],
            cursor: 0,
            showResults: false

        };
        this.listRef = React.createRef();
    }

    setQuery = query => {
        this.setState({
            query,
            filteredData: this.getSearchResults(query)
        });
    };

    getSearchResults = (query) => {
        const filteredData = [];
        this.state.data.forEach(element => {
            Object.keys(element).forEach(key => {
                if (Array.isArray(element[key]) && element[key].length) {
                    element[key].forEach(item => {
                        if (item.toLowerCase().includes(query.toLowerCase())) {
                            filteredData.push(element);
                        }
                    });
                } else if (element[key].toLowerCase().includes(query.toLowerCase())) {
                    filteredData.push(element);
                }
            });
        });
        return filteredData;
    }

    handleKeyDown = (e) => {
        const { cursor, filteredData } = this.state;
        if (e.keyCode === 38 && cursor > 0) {
            this.setState(prevState => ({
                cursor: prevState.cursor - 1
            }))
        } else if (e.keyCode === 40 && cursor < filteredData.length - 1) {
            this.setState(prevState => ({
                cursor: prevState.cursor + 1
            }))
        }
        if (this.listRef.current) {
            this.listRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    setResultsFlag = (showResults) => {
        this.setState({ showResults });
    }

    cancelSearch = () => {
        this.setState({
            query: "",
            filteredData: []
        });
    }

    render() {
        let resultList = () => {
            if (this.state.query && this.state.filteredData.length) {
                return <ul 
                >
                {this.state.filteredData.map((detail, i) => 
                    <li
                        key={i}
                        className={this.state.cursor === i ? 'active' : null}
                        ref={this.state.cursor === i ? this.listRef : null}
                    >
                        {<UserCard key={detail.id} detail={detail} highlightText={this.state.query}/>}
                    </li>
                )}</ul>
            } else if (this.state.query && !this.state.filteredData.length) {
                return <span>No user found</span>
            }
            return <></>;
        }
        return (
            <div className="search">
                <div className="search-box">
                    <input
                        className="search-input"
                        placeholder="Search users by ID, name, address, items"
                        value={this.state.query}
                        onChange={event => this.setQuery(event.target.value)}
                        onFocus={event => this.setResultsFlag(true)}
                        onBlur={event => this.setResultsFlag(false)}
                        onKeyDown={event =>  this.handleKeyDown(event)}/>
                    <div
                        className='search-cancel'
                        onClick={this.cancelSearch}
                    >{this.state.query ? "\u2573" : ""}</div>
                </div>
                <div
                    className='search-results'
                > { this.state.showResults ? resultList() : ""} </div>
            </div>
        );
    }
}

export default Search;