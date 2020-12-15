import React, {Component} from "react";

class TOC extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.data !== this.props.data
        // 아, state 에 있는 값을 바꾸면 이게 바로 매칭이 안되는구나.
        // 원본은 항상 유지하면서 테스팅을 하는 게 맞겠구나.
        // 원본 불변성 immutable

        // Array.from을 사용하면 push나 등등 사용해도 상관없음
    }

    render() {
        const data = this.props.data
        let lists = []
        for (let i = 0; i < data.length; i++) {
            lists.push(<li key={data[i].id}>
                <a
                    href={`/content/${data[i].id}`}
                    // first type : data-id={data[i].id}
                    onClick={function(id, e) {
                        e.preventDefault()
                        // second type this.props.onChangePage(data[i].id)
                        // this.props.onChangePage(e.target.dataset.id)
                        this.props.onChangePage(id)
                    // }.bind(this)}
                    }.bind(this, data[i].id)}
                >
                {data[i].title}</a>
                </li>)
        }
        return (
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        )
    }
}

export default TOC