import React, {Component} from 'react';
import '../../css/Navbar.css';
import $ from 'jquery'; 


class Navbar extends Component{
    
    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark" id="navbar">
                    <a class="navbar-brand" href="#/overview"><h1>Harmoni</h1></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="nav-link" onClick={()=> window.location.href="#/overview"} data-toggle="collapse" data-target="#navbarSupportedContent">Oversikt</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Arrangementer
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown" id="navbarDropdown">
                                <a class="dropdown-item" onClick={()=> window.location.href="#/event"} data-toggle="collapse" data-target="#navbarSupportedContent">Alle arrangementer</a>
                                <a class="dropdown-item" onClick={()=> window.location.href="#/overview/addEvent"} data-toggle="collapse" data-target="#navbarSupportedContent">Legg til arrangement</a>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" onClick={()=> window.location.href="#/"} data-toggle="collapse" data-target="#navbarSupportedContent">Logg ut</a>
                        </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;