import '../App.css';
import Tables from '../components/Tables';
import { Grid } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@material-ui/core';

function Dashboard() {
  return (
    <div className='Dashboard'>
      <Grid container spacing={0} id='entire-table'>
        <Grid item xs={2} id='panel' className="whiteText">
          <h2>Dashboard</h2>
          <br/>
          <p>Create a bug by pressing Add Bug + </p>
          <p>Edit or Delete your bug by pressing Edit</p>
        </Grid>
        <Grid item xs={10} id='data-tbl'>
          <Tables />
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
