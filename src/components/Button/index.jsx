import './styles.css';

import { Component } from "react"

export class Button extends Component {
    render() {
       const {text, loadMorePosts, disabled} = this.props
        return (
            <button
                disabled={disabled}
                className='button'
                onClick={loadMorePosts}
            > 
                {text}
                </button>
       )
    }
}