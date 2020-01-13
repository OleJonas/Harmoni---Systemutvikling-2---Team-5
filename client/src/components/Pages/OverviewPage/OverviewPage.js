import React, {Component} from 'react';
import "../../../css/Overview.css"
import { createHashHistory } from 'history';

import Navbar from '../../Navbar/Navbar'
import {profileService} from "../../../service/ProfileService";
import Footer from '../../Footer/Footer'
const history = createHashHistory();

class OverviewPage extends Component{

    constructor(props) {
        super(props);
        this.state = {user_id: 9}

    }

    componentDidMount() {
        let profileService = new ProfileService();
        profileService.getUser(this.state.user_id)
            .then(user => {

                    this.setState({
                        user: user
                    })
                }
            )
            .catch((error) => {
                console.error(error);
            });
        console.log("SE ME " + this.state.user)
    };
    
    render() {

        return (
            <div class="pageSetup">
                <Navbar/>
                <div id="OverviewDiv">
                    <div id="OverviewTitle"><h1>Forside</h1></div>
                    <div id="OverviewButtonDiv">
                        <div id="OverviewButtons">
                            <button type="button" className="btn btn-info btn-lg" onClick={this.addEvent}>Legg til ny event</button>
                        </div>
                        <div id="OverviewButtons">
                            <button type="button" className="btn btn-info btn-lg" onClick={this.seeEvents}>Se alle eventer</button>
                        </div>
                        <div id="OverviewButtons">
                            <button type="button" className="btn btn-info btn-lg" onClick={() => this.seeProfile(this.state.user_id)}>Vis profil</button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    addEvent(){
        history.push("/overview/addEvent")
    }

    seeEvents(){
        history.push("/event")
    }

    seeProfile(id){
        console.log("SE ME ");

        history.push("/profile/" + id)
    }
}

export default OverviewPage;