import logo from './logo.svg';
import './App.css';
import DataTable from './components/DataTable';
import { Grid } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <h3> Logo Placeholder</h3>
      <Grid container spacing={0} id="entire-table" >
        <Grid item xs={2} id="panel" >
          <p>User Info</p>
          <p>Home</p>
          <p>History</p>
          <p>...</p>
          <Button>
            <AddCircleIcon />
          </Button>
          
        </Grid>
        <Grid item xs={10} id="data-tbl">
          <DataTable/>
        </Grid>

      </Grid>
    </div>
  );
}

export default App;
