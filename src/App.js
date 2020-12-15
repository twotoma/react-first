import React, { Component } from 'react'
import './App.css';
import TOC from './components/TOC'
import Control from './components/Control'
import Subject from './components/Subject'
import ReadContent from './components/ReadContent'
import CreateContent from './components/CreateContent'
import UpdateContent from './components/UpdateContent'

class App extends Component {
    constructor(props) { // 초기화 담당
        // 정적으로 선언하고, 그 이후에 동적으로 설정하려고 하면
        // 반드시 setState({ state_name:'state_value' }) 로 해야 함
        // setState 다음에 연동되는 내용들을 수행할 수 있도록 함
        super(props)
        this.maxContentId = 3 // push할 때, id를 뭐로 할 것인지 사용할 뿐
        // ui 와 하등 상관없기 때문에, 불필요한 랜더링을 빼기 위해 이렇게 제외함
        this.state = {
            mode:'create',
            //mode:'read',
            selectedContentId:2,
            subject:{title:'WEB', sub:'World Wide Web!'},
            welcome:{title:'welcome', desc:'Hello, React!!'},
            contents:[
                {id:1, title:'HTML', desc:'HTML is for information'},
                {id:2, title:'CSS', desc:'CSS is for design'},
                {id:3, title:'JavaScript', desc:'JavaScript is for interactive'},
            ]
        } // state 값 초기화
    }
    getReadContent() {
        for (let i in this.state.contents)
            if (this.state.contents[i].id === this.state.selectedContentId)
                return this.state.contents[i]
    }
    getContent() {
        let _title, _desc = null
        let _article = null
        if (this.state.mode === 'welcome') {
            _title = this.state.welcome.title
            _desc = this.state.welcome.desc
            _article = <ReadContent title={_title} desc={_desc} />
        } else if ( this.state.mode === 'read') {
            const _content = this.getReadContent()
            _article = <ReadContent title={_content.title} desc={_content.desc} />
        } else if ( this.state.mode === 'create' ) {
            _article = <CreateContent onSubmit={function(_title, _desc){
                /* this.setState({

                }) */
                this.maxContentId++
                // 좋은 방법이 아님
                // push와 concat 두개. push는 원본을 바꾼 것임.
                // push와 같이 오리지널 데이터를 변경하는 건 사용하지 말고,
                // concat과 같이 새로운 데이터를 생성하는 것을 사용하세요.
                /*
                this.state.contents.push({id:this.maxContentId, title:_title, desc:_desc})
                this.setState({
                    contents:this.state.contents
                })
                */
                let _contents = Array.from(this.state.contents)
                _contents.push({id:this.maxContentId, title:_title, desc:_desc})
                // 객체 복사는 Object.assign({} -빈객체, a} 이런식으로 가능
                // 배열 복사는 Array.from(a) 이런식으로 가능
                // const _contents = this.state.contents.concat({id:this.maxContentId, title:_title, desc:_desc})
                this.setState({
                    contents:_contents,
                    mode:'read',
                    selectedContentId:this.maxContentId
                })
            }.bind(this)}/>
        } else if ( this.state.mode === 'update' ) {
            _article = <UpdateContent
                data={this.getReadContent()}
                onSubmit={function(_title, _desc, _id) {
                    let _contents = Array.from(this.state.contents)
                    for (let i in _contents) {
                        if (_contents[i].id === _id) {
                            _contents[i] = {id: _id, title: _title, desc: _desc}
                            break
                        }
                    }
                    this.setState({
                        contents:_contents,
                        mode:'read'
                    })
                }.bind(this)} />
        }
        return _article
    }
    render() {

        return (
            <div className="App">
                <Subject
                    title={this.state.subject.title}
                    sub={this.state.subject.sub}
                    name="YoungSung Shin"
                    onChangePage={function() {
                        // alert('hihihi')
                        this.setState({
                            mode:'welcome'
                        })
                    }.bind(this)}/>
                <TOC
                    data={this.state.contents}
                    onChangePage={function(sCID){
                        // alert('sss')
                        this.setState({
                            mode:'read',
                            selectedContentId:Number(sCID)
                        })
                    }.bind(this)}/>
                <Control onChangeMode={function(_mode){
                    if (_mode === 'delete') {
                        if(window.confirm('Really Delete?')) {
                            let _contents = Array.from(this.state.contents)
                            const targetID = this.state.selectedContentId
                            for (let i = 0; i < _contents.length; i++) {
                                if (_contents[i].id === this.state.selectedContentId) {
                                    _contents.splice(i, 1)
                                    break
                                }
                            }
                            this.setState({
                                contents:_contents,
                                mode:'welcome'
                            })
                            alert('deleted!')
                        }
                    } else {
                        this.setState({
                            mode:_mode
                        })
                    }
                }.bind(this)}/>
                {this.getContent()}
            </div>
        );
    }
}

// 유사 자바스크립트임. 자바스크립트가 아님.
// JSX 임 그리고 이게 react app이 자동으로 convert를 해줌.

// 장점이라 하면, 유지보수성, 관리성, 추적이 용이함.
// 그러나 이해도가 낮을 때는 좀 난해할 수 있고
// 값을 컴포넌트 간 전달을 하기 위해서는 당황할 수 있음.
// 특히, bind! 이거 당황스러움.
// data- set로 묶이는 것도 어려움
// props는 readonly, state는 비동기적으로 변경시킬 수 있음

// REDUX..
// 바로 위 아래로만 주고 받을 수 있는 것. 역시.. 그걸 Store에 저장하겠다 하는 것이 REDUX..
// 단점이라 생각했던 것들이 여기에서 나오네. interesting 하군요.

export default App;
