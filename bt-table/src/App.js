
import './App.css';
import Navbar from "./Components/Navbar/Navbar";


import Homepage from "./homepage.js"
import Signin from "./signin.js";
import Signup from "./signup.js";

import {Routes, Route} from 'react-router-dom';

function App() {
  return (

    <div className='App'>

  <Navbar />



<Routes>
<Route path="/" exact  element={<Homepage />} />
<Route path="/signin" element={<Signin/>}/>
<Route path="/signup" element={<Signup/>}/>
</Routes >

    </div>

  );
}


export default App;
