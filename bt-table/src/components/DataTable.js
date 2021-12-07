import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { borderRight } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@material-ui/core';

const handleClick = (event, cellValues) => {
    console.log(cellValues.row);
};

const columns = [
    {
        field: 'id',
        headerName: 'ID', 
        width: 90,
        flex: 0.3,
    },
    {
        field: 'bugName',
        headerName: 'Name',
        width: 250,
        flex: 1,
    },
    {
        field: 'date',
        headerName:'Date',
        width: 150,
        flex: 0.5,
        
    },
    {
        field: 'reporter',
        headerName: 'Reporter',
        width:150,
        flex: 0.75,
       
    },
    {
        field: 'assignedTo',
        headerName: 'Assigned To',
        width: 150,
        flex: 0.75,
      
    
    },
    {
    field: "",
    width: 70,
    sortable: false,
    filterable : false,
    disableColumnMenu : true,
    renderCell: (cellValues) => {
        return (
            <Button>
                <DeleteIcon />
            </Button>
         );
        }
    },
    {
    field: " ",
    width: 70,
    sortable: false,
    filterable : false,
    disableColumnMenu : true,
    renderCell: (cellValues) => {
        return (
            <Button> 
                <EditIcon />
            </Button>
         );
        }
    },
];

const rows = [
    {id: 1, bugName: 'Issue in design format', date: '1/25/21',reporter:'Dan Pan', assignedTo:'Sam Lam'},
    {id: 2, bugName: 'File missing', date: '1/26/21',reporter:'Dan Pan', assignedTo:'Carry Zarry'},
    {id: 3, bugName: 'Like option not working ', date: '1/27/21',reporter:'Dan Pan', assignedTo:'Sam Lam'},
    {id: 4, bugName: 'Issue with admin dash', date: '1/28/21',reporter:'Dan Pan', assignedTo:'Carry Zarry'},
    {id: 5, bugName: 'Issue in design format', date: '1/25/21',reporter:'Dan Pan', assignedTo:'Sam Lam'},
    {id: 6, bugName: 'File missing', date: '1/26/21',reporter:'Dan Pan', assignedTo:'Carry Zarry'},
    {id: 7, bugName: 'Like option not working ', date: '1/27/21',reporter:'Dan Pan', assignedTo:'Sam Lam'},
    {id: 8, bugName: 'Issue with admin dash', date: '1/28/21',reporter:'Dan Pan', assignedTo:'Carry Zarry'},

];
const DataTable = () =>{
    return(
        <div style={{ height: '100%', width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            onCellClick={handleClick}

          />
        </div>
    
    );

}
export default DataTable



