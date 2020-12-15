import React, {Component} from "react";

class Subject extends Component {
    render() {
        return (
            <header>
                <h1><a href="/" onClick={function(e) {
                    e.preventDefault()
                    this.props.onChangePage()
                }.bind(this)}>{this.props.title}</a></h1>
                {this.props.sub}<br />{this.props.name}
            </header>
        )
    }
}

export default Subject