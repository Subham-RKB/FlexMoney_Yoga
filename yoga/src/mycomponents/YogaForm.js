import React, { useState, useEffect } from "react";
import './form.css'
import { Link } from "react-router-dom";
import Alert from "./Alert";
import {AiOutlineArrowRight} from "react-icons/ai";
import axios from "axios";
const YogaForm = () => {
    const [show, setShow] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [records, setRecord] = useState([]);
    const [userRegistration, setuserRegistration] = useState({
        username: "",
        email: "",
        age: "",
        joiningDate: "",
        batch: ""
    });
    const [isSubmit, setIsSubmit] = useState(false);
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log("");
        }
    }, [formErrors, isSubmit]);
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value);
        setuserRegistration({ ...userRegistration, [name]: value });
    }
    const makePayment =()=>{
        alert("Pay Rs.500 for registration.\nPhone pay: 9894401705@ybl");
        return true;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecord = { ...userRegistration, id: new Date().getDate().toString() };
        setFormErrors(validate(userRegistration));
        setIsSubmit(true);
        setRecord([...records, newRecord]);
        const paid = makePayment();
        if (Object.keys(formErrors).length === 0 && paid) {
            axios({
                method: 'post',
                url: '/api/store',
                data: newRecord
            }).then(function (response) {
                console.log(response);
                alert("Remember Your Pass Key for Login : "+(response.data.data));
                setuserRegistration({ username: "", email: "", age: "", joiningDate: "", batch: "" })
                setShow(true);
                setTimeout(function(){
                    setShow(false);
                },2000);
            });
        }
    };
    const validate = (values) => {
        const errors = {};
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
        if (!values.username) {
            errors.username = "Username is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.age) {
            errors.age = "Age is required!";
        }
        let age = parseInt(values.age);
        if (age < 18 || age > 65) {
            errors.age = "Age must be in between 18 and 65 only!";
        }
        if (!values.joiningDate) {
            errors.joiningDate = "Date is required!";
        }
        return errors;
    };
    return (
        <>
            <Alert msg="Successfully Registerd!!!" show = {show} />
            <div className="container">
                <img src="./yogagirl.jpg" className="image"/>
                <div className="formContainer">

                <h1 align="center">Flex Yoga Center</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input type="text" id="username" className="input" name="username" value={userRegistration.username} onChange={handleInput} />
                    </div>
                    <span>{formErrors.username}</span>
                    <div><label htmlFor="email">Email: </label>
                        <input type="text" id="email" className="input" name="email" value={userRegistration.email} onChange={handleInput} />
                    </div>
                    <span>{formErrors.email}</span>
                    <div>
                        <label htmlFor="age">Age: </label>
                        <input type="number" id="age" name="age" className="input" value={userRegistration.age} onChange={handleInput} />
                    </div>
                    <span>{formErrors.age}</span>
                    <div>
                        <label htmlFor="joiningDate">Expected Joining Date: </label>
                        <input type="date" className="joiningDate" name="joiningDate" id="joiningDate" onChange={handleInput} value={userRegistration.joiningDate} />
                    </div>
                    <span>{formErrors.date}</span>
                    <div>
                        <label htmlFor="batch">Batch: </label>
                        <div className="batches" name="batches">
                            <label><input type="radio" value={"6-7 AM"} name="batch" onChange={handleInput} checked={userRegistration.batch==="6-7 AM"} /> 6-7 AM</label>
                            <label><input type="radio" value={"7-8 AM"} name="batch" onChange={handleInput} checked={userRegistration.batch==="7-8 AM"}/> 7-8 AM</label>
                            <label><input type="radio" value={"8-9 AM"} name="batch" onChange={handleInput} checked={userRegistration.batch==="8-9 AM"}/> 8-9 AM</label>
                            <label><input type="radio" value={"5-6 PM"} name="batch" onChange={handleInput} checked={userRegistration.batch==="5-6 PM"}/> 5-6 PM</label>
                        </div>
                    </div>
                    <span></span>
                    <input type="submit" value="Submit" className="submit" />
                </form>
                </div>
                <Link className="login" to="/login">Login <AiOutlineArrowRight size={20}/></Link>
            </div>
        </>
    )
}

export default YogaForm
