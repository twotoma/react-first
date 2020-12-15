import React, {Component} from "react";

class UpdateContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title:this.props.data.title,
            desc:this.props.data.desc,
            id:this.props.data.id
        }
        this.inputFormHandler = this.inputFormHandler.bind(this)
    }
    inputFormHandler(e) {
        this.setState({[e.target.name]:e.target.value})
    }
    render() {
        return (
            <article>
                <h2>Update</h2>
                <form action="/updateProcess" method="post"
                      onSubmit={function(e){
                          e.preventDefault()
                          // alert('Submit!!')
                          const _title = this.state.title
                          const _desc = this.state.desc
                          const _id = this.state.id
                          this.props.onSubmit(_title, _desc, _id)
                      }.bind(this)}>
                    <p><input
                        type="text"
                        name="title"
                        placeholder="title"
                        value={this.state.title}
                        onChange={this.inputFormHandler}/></p>
                    <p><textarea
                        name="desc"
                        placeholder="description"
                        value={this.state.desc}
                        onChange={this.inputFormHandler}/></p>
                    <p><input type="submit"/></p>
                    <input type="hidden" name="id" value={this.state.id}/>
                </form>
            </article>
        )
    }
}

export default UpdateContent