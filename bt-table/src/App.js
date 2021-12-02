import logo from './logo.svg';
import './App.css';
import Tables from './components/Tables';
import { Grid } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      
      <Grid container spacing={0} id="entire-table" >
        <Grid item xs={2} id="panel" >
          <p>Home</p>
          <p>Name</p>
        
  
          <br/>
          <p>Log Out</p>
          
        </Grid>
        <Grid item xs={10} id="data-tbl">
          <Tables/>
        </Grid>

      </Grid>
    </div>
  );
}

export default App;
