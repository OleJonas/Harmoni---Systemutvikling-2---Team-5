import React, {Component} from 'react';
import "../../../css/AddEvent.css"
import {eventService} from "../../../service/EventService";

import {toast} from 'react-toastify';
import Calendar from 'react-calendar-mobile'
import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'

class EditEvent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(), dateChosenHour: null, dateChosenMin: null,
            Name: "", Description: "", Place: "", Artists: "",
            ContactName: "", ContactPhone: "", ContactEmail: "",
            Tech: "", Hospitality: "", Personnel: "", Contract: "",
            Picture: "", Category: 1,
            GratisTicketBox: false, GratisTicketAmount: null,
            StandardTicketBox: false, StandardTicketAmount: null,
            VIPTicketBox: false, VIPTicketAmount: null,
            EarlyBirdTicketBox: false, EarlyBirdTicketAmount: null,
            GoldenCircleTicketBox: false, GoldenCircleTicketAmount: null,
            Categories: [], Tickets: [],
            DateHour: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
            DateMin: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
        };
        this.changeBox = this.changeBox.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.updateEventInfo = this.updateEventInfo.bind(this);
        this.updateTicketInfo = this.updateTicketInfo.bind(this);
        this.updateContactInfo = this.updateContactInfo.bind(this);
        this.registerEvent = this.registerEvent.bind(this);
    }

    changeValue(event){
        this.setState({[event.target.id]: event.target.value})
    }

    changeBox(event){
        this.setState({[event.target.id]: event.target.checked});
        if(this.state[event.target.id]) this.setState({[event.target.name]: 0});
    }

    changeDate(event) {
        this.setState({date: event})
    }

    formValidation(){
        return !(this.state.Name === "" || this.state.Description === "" || this.state.Place === ""
            || this.state.Artists === "" || this.state.ContactName === "" || this.state.ContactEmail === "" || this.state.ContactPhone === "" || !this.ticketCheck());
    }

    ticketCheck(){
        let status = false;
        this.state.Tickets.map(ticket =>{
            if(this.state[ticket.name + "TicketBox"] = true && (this.state[ticket.name + "TicketAmount"] != null && this.state[ticket.name + "TicketAmount"] > 0)){
                status = true;
            }
        });
        return status;
    }

    componentDidMount() {
        eventService
            .getEventById(this.props.match.params.id)
            .then(data => this.updateEventInfo(data))
            .catch(Error => console.log(Error));

        eventService
            .getTicket()
            .then(data => this.setState({Tickets: data}))
            .catch(Error => console.log(Error));

        eventService
            .getCategories()
            .then(categories => this.setState({Categories: categories}))
            .catch(Error => console.log(Error));

        eventService
            .getContactinfoForEvent(this.props.match.params.id)
            .then(data => this.updateContactInfo(data))
            .catch(Error => console.log(Error));

        eventService
            .getTicketFromEvent(this.props.match.params.id)
            .then(data => this.updateTicketInfo(data))
            .catch(Error => console.log(Error));
    }

    notifySuccess = () => {
        toast("Registrering av arrangement vellykket", {type: toast.TYPE.SUCCESS, position: toast.POSITION.BOTTOM_LEFT});
    };

    notifyFailure = () => toast("Noe gikk galt", {type: toast.TYPE.ERROR, position: toast.POSITION.BOTTOM_LEFT});

    updateEventInfo(data){
        let date = data[0].date.split("T");
        let time = date[1].split(":");
        let hour = Number(time[0])+1;
        if(hour<10) hour = "0"+hour;
        let min = Number(time[1]);
        if(min<10) min = "0"+min;

        this.setState({dateChosenHour: hour});
        this.setState({dateChosenMin: min});
        this.setState({date: new Date(date[0])});
        this.setState({Name: data[0].name});
        this.setState({Description: data[0].description});
        this.setState({Place: data[0].place});
        this.setState({Artists: data[0].artists});
        this.setState({Category: data[0].category_id});
        this.setState({Tech: data[0].tech_rider});
        this.setState({Hospitality: data[0].hospitality_rider});
        this.setState({Personnel: data[0].personnel});
        this.setState({Picture: data[0].img_url});
        this.setState({Contract: data[0].contract})
    }

    updateTicketInfo(data) {
        data.map(ticket => {
            eventService
                .getTicketById(ticket.ticket_category_id)
                .then(name => this.updateTicketAmount(name.name, ticket.number))
                .catch(Error => console.log(Error))
        })
    }

    updateTicketAmount(name, amount){
        this.setState({[name + "TicketBox"]: true});
        this.setState({[name + "TicketAmount"]: amount})
    }

    updateContactInfo(data){
        this.setState({ContactName: data.name});
        this.setState({ContactPhone: data.phone});
        this.setState({ContactEmail: data.email});
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div id="EventInputContainer">
                    <h2 id ="EventInputHeader">Redigere arrangement</h2>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Navn på arrangementet:</p>
                        <input type="text"
                               className = "form-control"
                               id = "Name"
                               value={this.state.Name}
                               onChange={this.changeValue}
                        />
                    </div>

                    <div id ="EventInputFields">
                        <p id="EventInputLabels">Dato for arrangementet:</p>
                        <div id="EventInputCalendar">
                            <Calendar
                                onSelectDate = {this.changeDate}
                                startOnMonday = {true}
                            />
                        </div>
                    </div>

                    <div id = "EventInputFields">
                        <p id="EventInputLabels">Tidspunkt for arrangementet:</p>
                        <div id="EventDateInput">
                            <select className="form-control"
                                    id ="dateHourInput"
                                    value={this.state.dateChosenHour}
                            >
                                {this.state.DateHour.map(hour =>
                                    <option
                                        key={hour}
                                        value ={hour}
                                        defaultValue={hour}
                                    >
                                        {hour}
                                    </option>
                                )}
                            </select>
                            <select className="form-control"
                                    id ="dateMinInput"
                                    value={this.state.dateChosenMin}
                            >
                                {this.state.DateMin.map(min =>
                                    <option
                                        key={min}
                                        value ={min}
                                        defaultValue={min}
                                    >
                                        {min}
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Beskrivelse for arrangementet:</p>
                        <input type="text"
                               className="form-control"
                               id="Description"
                               value ={this.state.Description}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Sted for arrangementet:</p>
                        <input type="text"
                               className="form-control"
                               id="Place"
                               value ={this.state.Place}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Artister:</p>
                        <input type="text"
                               className = "form-control"
                               id = "Artists"
                               value ={this.state.Artists}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Kontaktinformasjon - navn:</p>
                        <input type="text"
                               className="form-control"
                               id="ContactName"
                               value ={this.state.ContactName}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Kontaktinformasjon - telefonnummer:</p>
                        <input type="text"
                               className="form-control"
                               id="ContactPhone"
                               value ={this.state.ContactPhone}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Kontaktinformasjon - email:</p>
                        <input type="text"
                               className="form-control"
                               id="ContactEmail"
                               value ={this.state.ContactEmail}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Tech Riders:</p>
                        <input type="text"
                               className = "form-control"
                               id = "Tech"
                               value ={this.state.Tech}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id="EventInputFields">
                        <p id="EventInputLabels">Hospitality Riders:</p>
                        <input type="text"
                               className="form-control"
                               id="Hospitality"
                               value ={this.state.Hospitality}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Nødvendig personell:</p>
                        <input type="text"
                               className = "form-control"
                               id = "Personnel"
                               value ={this.state.Personnel}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Bilde:</p>
                        <input type="text"
                               className = "form-control"
                               id = "Picture"
                               value={this.state.Picture}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id = "EventInputFields">
                        <p id = "EventInputLabels">Kontrakt:</p>
                        <input type="text"
                               className = "form-control"
                               id = "Contract"
                               value ={this.state.Contract}
                               onChange={this.changeValue}
                        />
                    </div>
                    <div id ="EventInputFields">
                        <p id = "EventInputLabels">Kategori for arrangementet:</p>
                        <select className ="form-control"
                                id ="Category"
                                value ={this.state.Category}
                                onChange={this.changeValue}
                        >
                            {this.state.Categories.map(category =>
                                <option
                                    value ={category.category_id}
                                    defaultValue={category.category_id}
                                >
                                    {category.name}
                                </option>
                            )};
                        </select>
                    </div>
                    <p id = "EventInputTitle">Billettyper:</p>
                    <div id ="EventInputTicketContainer">
                        {this.state.Tickets.map(tickets =>
                            <div id = "EventInputTicketBoxes">
                                <div id="EventInputCheckboxes">
                                    <div id ="EventTicketInnerLabel">
                                        <label id="EventTicketLabels">{tickets.name + " billetter"}</label>
                                    </div>
                                    <div id ="EventTicketInnerCheckbox">
                                        <input type ="checkbox"
                                               id ={tickets.name + "TicketBox"}
                                               name ={tickets.name + "TicketAmount"}
                                               checked={this.state[tickets.name +"TicketBox"]}
                                               onChange={this.changeBox}
                                        />
                                    </div>
                                </div>
                                <div id ="EventTicketAmount">
                                    <input type = "number"
                                           id={tickets.name +"TicketAmount"}
                                           className ="form-control"
                                           placeholder={"Antall " + tickets.name + " billetter"}
                                           value = {this.state[tickets.name + "TicketAmount"]}
                                           disabled = {!this.state[tickets.name + "TicketBox"]}
                                           onChange={this.changeValue}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div id = "EventInputButton">
                        <button type="button"
                                className="btn btn-outline-primary btn-lg"
                                onClick={this.registerEvent}
                        >
                            Registrer arrangement
                        </button>
                    </div>
                    <Footer/>
                </div>
            </div>
        );
    }

    registerEvent(){
        if(this.formValidation()){
            let altPicture = "https://cdn.xl.thumbs.canstockphoto.com/music-learning-center-letter-h-eps-vector_csp56970748.jpg";
            if (this.state.Picture === "") this.setState({Picture: altPicture});

            let day = this.state.date.getDate();
            let month = this.state.date.getMonth() + 1;
            let year = this.state.date.getFullYear();
            let hour = this.state.dateChosenHour;
            let min = this.state.dateChosenMin;
            if (day < 10) {
                day = "0" + day
            }
            if (month < 10) {
                month = "0" + month
            }
            let date = year + "-" + month + "-" + day + " " + hour + ":" + min + ":00";

            eventService
                .updateEvent(this.props.match.params.id, this.state.Name, date, this.state.Description, this.state.Place, this.state.Category, this.state.Artists, this.state.Tech, this.state.Hospitality, this.state.Personnel, this.state.Picture, this.state.Contract)
                .then(() => this.updateById(this.props.match.params.id))
                .catch(Error => console.log(Error));

            this.notifySuccess();
        }
        else{
            this.notifyFailure();
        }
    }
    updateById(eventID){
        eventService
            .deleteTicketsForEvent(eventID)
            .catch(Error => console.log(Error));

        this.state.Tickets.map(ticket =>{
            if(this.state[ticket.name + "TicketBox"]){
                if(this.state[ticket.name + "TicketAmount"] != null && this.state[ticket.name + "TicketAmount"] > 0){
                    eventService
                        .addTicket(ticket.ticket_category_id, eventID, this.state[ticket.name + "TicketAmount"])
                        .catch(Error => console.log(Error))
                }
            }
        });

        eventService
            .updateContactInfo(this.state.ContactName, this.state.ContactPhone, this.state.ContactEmail, eventID)
            .catch(Error => console.log(Error))
    }
}

export default EditEvent;