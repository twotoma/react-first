import React, { Component } from 'react'
import './App.css';
import TOC from './components/TOC'
import Content from './components/Content'
import Subject from './components/Subject'

class App extends Component {
    constructor(props) { // 초기화 담당
        super(props)
        this.state = {
            subject:{title:'WEB', sub:'World Wide Web!'},
            contents:[
                {id:1, title:'HTML', desc:'HTML is for information'},
                {id:2, title:'CSS', desc:'CSS is for design'},
                {id:3, title:'JavaScript', desc:'JavaScript is for interactive'},
            ]
        } // state 값 초기화
    }

    render() {
        return (
            <div className="App">
                <Subject
                    title={this.state.subject.title}
                    sub={this.state.subject.sub}
                    name="YoungSung Shin"/>
                <TOC
                    data={this.state.contents}/>
                <Content title="HTML" desc="HTML is HyperText Markup Language." />
            </div>
        );
    }
}

// 유사 자바스크립트임. 자바스크립트가 아님.
// JSX 임 그리고 이게 react app이 자동으로 convert를 해줌.

export default App;
