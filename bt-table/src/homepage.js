import React from 'react'
import "./Box.css";
import BugTracker from "./Components/video/bugtracker-header.mp4";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';


const Homepage = () => {
  return (
    <div> <Box className="section1">
      <div className="header">

      <div id="content-sec">
      <h1> Ship great software with <br></br> automated bugtracking </h1>
      <p>A simple, fast and scalable bug tracking system that helps you manage <br></br>bugs easily and deliver great products on time. </p>

    <div className="sign-up">

      <Button href="/signup"   variant="contained" color="secondary"  >
      SIGN UP FOR FREE
      </Button>

    </div>

      </div>

          <div id="Body" >
          <video  className="video"
           autoPlay
           loop
           muted
             width={400}
             height={500}



          >
          <source src={BugTracker} type="video/mp4"/>

          </video>
          </div>

        </div>

        <box className="issue-sec">

          <div className="issue-tracker">
            <h2> <span>The issue tracker</span> <br></br> built to deliver<br></br> issue free software!</h2>
          </div>

          <div className="parag">
    <p>Submit, track and fix your bugs faster <br></br> in our free bug tracking tool with <br></br> the help of custom workflows.</p>
          </div>

        </box >

        <box className="section3">

          <div className="issue-management">

            <div className="flex-left">

              <div className="collab">
                <h3>Collaboration</h3>
              </div>
              <div className="interactive">
                <p>Use interactive modules like Forums or Discuss <br></br> to check in with your team and see what <br></br> everyone is working on. Get on a quick <br></br> discussion over comments or schedule <br></br>meetings for a more detailed conversation in <br></br>our bug tracking software.
    </p></div>
            </div>


            <div className="Issuesmanaged">
              <div className="name">
               <h3>Issue Management</h3>
              </div>
      <div className="record">
      <p>Record bugs easily, and track them based on <br></br> desired criteria. Create custom views for your <br></br>issue tracking software to focus on bugs that are <br></br> the most time sensitive. See how many bugs have <br></br> been logged, if they've been resolved, <br></br> and more with reports.</p>

      </div>
            </div>



            <div className="automation">
              <div className="automate">
               <h3>Automation</h3>
              </div>
      <div className="automated">
      <p>Set rules to trigger updates in a bug's fields or <br></br> in third-party applications. Email notifications <br></br>keep you and your team in the loop when bugs<br></br> are created, updated, and more. Automate <br></br>your service level agreements to meet your <br></br> client's targets..</p>

      </div>
            </div>

          </div>



        </box>


    </Box > </div>

  )
}

export default Homepage
