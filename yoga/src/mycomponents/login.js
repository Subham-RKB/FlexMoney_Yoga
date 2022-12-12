import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
const Login = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [email, setEmail] = useState({
    email: "",
  });
  const [batch,setBatch] = useState({
    batch:"",
  });
  const [userData, setUserData] = useState({});
  const newRecord = { ...email, id: new Date().getDate().toString() };
  //const newBatch = { ...batch, id: new Date().getDate().toString() };
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEmail({ ...email, [name]: value });
  };
  
  const handleBatch = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setBatch({ ...batch, [name]: value });
  }
  const handleBatchSubmit = async(e) =>{
    e.preventDefault();
    axios({
      method: "put",
      url:'/api/changeBatch',
      data: {email:newRecord.email,batch:batch.batch}, 
    }).then(function(response){
      if(response.data.batch){
        var {batch,...newUserData} = userData;
        newUserData.batch = response.data.batch;
        setUserData(newUserData);
      }        
    })
  }
  const handleDelete = async(e) =>{
    axios({
      method: "delete",
      url: "/api/delete",
      data: newRecord
    }).then(function(response){
      navigate("/");
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "/api/profile",
      data: newRecord,
    }).then(function (response) {
      console.log(response.data.result[0]);
      if (response.data.result.length != 0) {
        setUserData(response.data.result[0]);
        setBatch(response.data.result[0].batch);
        setIsSubmit(true);
      }
    });
  };
  return (
    <>
      {!isSubmit && (
        <div className="container">
          <div className="formContainer">
            <h1> Login</h1>
            <form onSubmit={handleSubmit}>
              <label>Enter Your Email: </label>
              <input
                type="text"
                id="email"
                className="input"
                name="email"
                value={email.email}
                onChange={handleInput}
              />
              <input type="submit" value="Submit" className="submit" />
            </form>
          </div>
          <img src="./yogagirl2.jpg" className="image" />
        </div>
      )}
      {isSubmit && (
        <div className="profile">
          <img src="./yogagreen.jpg" />
          <div>
            <h1>Hi, {userData.name} 👋 </h1>
            <p>Joined on : {userData.joiningdate}</p>
          </div>
          <div>
            <h3>Batch : {userData.batch}</h3>
            <form onSubmit={handleBatchSubmit}>
              <div className="batches" name="batches">
                <label>
                  <input
                    type="radio"
                    value={"6-7 AM"}
                    name="batch"
                    onChange={handleBatch}
                    checked={batch.batch==="6-7 AM"}
                  />{" "}
                  6-7 AM
                </label>
                <label>
                  <input
                    type="radio"
                    value={"7-8 AM"}
                    name="batch"
                    onChange={handleBatch}
                    checked={batch.batch==="7-8 AM"}
                  />{" "}
                  7-8 AM
                </label>
                <label>
                  <input
                    type="radio"
                    value={"8-9 AM"}
                    name="batch"
                    onChange={handleBatch}
                    checked={batch.batch==="8-9 AM"}
                  />{" "}
                  8-9 AM
                </label>
                <label>
                  <input
                    type="radio"
                    value={"5-6 PM"}
                    name="batch"
                    onChange={handleBatch}
                    checked={batch.batch==="5-6 PM"}
                  />{" "}
                  5-6 PM
                </label>
              </div>
              <input type="submit" value="Change Batch" className="submit" />
            </form>
          </div>
          <div className="buttondiv">
            <button className="longbtn">Pay Fee</button>
            <button className="longbtn danger" onClick={handleDelete}>Delete Account</button>
          </div>
        </div>
      )}
    </>
  );
};
export default Login;
