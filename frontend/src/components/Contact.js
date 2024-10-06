import React, { useState } from "react";
import '../styles/Contact.css';
function Contact(){
    const [reportId,setreportId]=useState('');
    const [issue,setIssue]=useState('');
   



return(
    <body>
    <div className="container">
        <h2>Contact Us</h2>
        <label>
        Username
                <input 
                type="text"
                value={reportId}
                placeholder="Enter Id that you want to report"
                onChange={(e)=>setreportId(e.target.value)}
                required
                />
        
        </label><br/>


        <label>
            Write down your Queries<br/>
                <textarea 
                type="text"
                value={issue}
                placeholder="Enter your Queries"
                onChange={(e)=>setIssue(e.target.value)}
                row={10}
                col={100}
                required
                />
        </label><br/>

        <button value="Submit">Submit</button>
        

    </div>
    </body>

)}
export default Contact;