import React, {Component} from "react";

class CreateContent extends Component {
    render() {
        return (
            <article>
                <h2>Create</h2>
                <form action="/createProcess" method="post"
                    onSubmit={function(e){
                        e.preventDefault()
                        // alert('Submit!!')
                        const _title = e.target.title.value
                        const _desc = e.target.desc.value
                        this.props.onSubmit(_title, _desc)
                    }.bind(this)}>
                    <p><input type="text" name="title" placeholder="title"></input></p>
                    <p><textarea name="desc" placeholder="description"></textarea></p>
                    <p><input type="submit"></input></p>
                </form>
            </article>
        )
    }
}

export default CreateContent