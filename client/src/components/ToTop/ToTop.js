import React, {Component} from 'react';
import '../../css/toTop.css';
import $ from 'jquery';

class ToTop extends Component{
    componentDidMount(){
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <div id="toTopButton">
                <button type="button" class="btn btn-outline-dark btn-light" onClick={() => {$('html, body').animate({scrollTop: '0'}, 2000);}}>➔</button>
            </div>
        );
    }
}

export default ToTop;