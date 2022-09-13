import React, { Component } from 'react';

class UserCard extends Component {
    constructor(props) {
        super(props);
    }

    getHighlightedText(text, highlight) {
        if (Array.isArray(text)) {
            let itemFound = false;
            text.forEach(item => {
                if (item.toLowerCase().includes(highlight.toLowerCase())) itemFound = true;
            });
            return itemFound ? <span>{<span className="highlight-text">{'\u2022'}</span>}  {'"'+ highlight + '"' + " found in items"} </span>: "";
        } else {
            const splitText = text.split(new RegExp(`(${highlight})`, 'gi'));
            return <span>{splitText.map(part => part.toLowerCase() === highlight.toLowerCase() ? <span className="highlight-text">{part}</span> : part)}</span>;
        }
    }

    render() {
        let {detail, highlightText} = this.props;
        let className = "user-detail";
        return (
            <div className={className}>
                <span className={className + "-id"}>{highlightText ? this.getHighlightedText(detail.id, highlightText) : detail.id}</span>
                <span className={className + "-name"}>{highlightText ? this.getHighlightedText(detail.name, highlightText) : detail.name}</span>
                <span className={className + "-items"}>{highlightText ? this.getHighlightedText(detail.items, highlightText) : ""}</span>
                <span className={className + "-address"}>{highlightText ? this.getHighlightedText(detail.address, highlightText) : detail.address}</span>
            </div>
        );
    }
}

export default UserCard;