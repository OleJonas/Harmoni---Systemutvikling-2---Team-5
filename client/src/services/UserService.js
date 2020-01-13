import Axios from "axios";
//Axios.interceptors.response.use(response => response.data);

export class User {
    name;
    email;
    phone;
    password;
    approved;
    roleid;

    constructor(name, email, phone, password, approved, roleId) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.approved = approved;
        this.roleid = roleId;
    }


}

let parseJwt =  (token) => {
    if(token !== null && typeof token !== "undefined"){
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } else{
        return null;
    }
};

let authenticationHeader = function authenticationHeader() {
    let token = window.localStorage.getItem("token");

    if (token) {
        return {Authorization : "Bearer " + token}
    } else return {}
};

export const auth = {
    authenticated: false,
    role: "",
    authenticate(){
        let response = parseJwt(localStorage.getItem("token"));
        console.log(response);
        if(response !== null){
            this.authenticated = true;
            this.role = response.role;
            console.log(this.role);
        } else{
            console.log("bruh");
            this.authenticated = false;
            this.role = "";
        }
    }
};

export let authenticate = auth.authenticate.bind(auth);
export class UserService {
    registerUser(user) {
        return Axios.post("http://localhost:8080/user", user);
    }

    validate(email, pw){
        return Axios.post("http://localhost:8080/validate", {"email":  email, "password" : pw});
    }

    getHash(email) {
        return Axios.get("http://localhost:8080/validate/" + email);
    }
}


export default UserService;