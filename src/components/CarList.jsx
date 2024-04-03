import React, {useState, useEffect, useRef, useMemo} from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar";
import Addcar from "./Addcar";
import Editcar from "./Editcar";

export default function CarList() {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = React.useState(true)

    const [columns] = useState([
        {field: 'brand'},
        {field: 'model'},
        {field: 'color'},
        {field: 'fuel'},
        {field: 'modelYear'},
        {field: 'price'},
        {
            headerName: "",
            sortable: false,
            filterable: false,
            cellRenderer:  row => <Editcar editCar={editCar} car={row.data} link={row.data._links.car.href}/>
        },
        {field: '_links.self.href',
            headerName: "",
            sortable: false,
            filterable: false,
            width: 150,
            cellRenderer:  row => <Button color="error" onClick={() => deleteCar(row.value)}>Delete</Button>
        }
    ])

    const gridRef = useRef();

    useEffect(() => fetchCarData(), []);

    const containerStyle = useMemo(() => ({width: "100%", height: "100%"}), []);
    
    const fetchCarData = () => {

        fetch('https://carrestservice-carshop.rahtiapp.fi/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
    }

    const deleteCar = (link) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            fetch(link, {method: 'delete'})
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error in deletion: " + response.statusText);
                }
                return response.json();
            })
            .then(() => {
                fetchCarData();
                showAlert();
            })
            .catch(err => console.log(err, link))    
        }

    }

    const addNewCar = (car) => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in deletion: " + response.statusText);
            }
            return response.json();
        })
        .then( () => {
            fetchCarData();
            showAlert();
        })

    }

    const editCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error in editing " + response.statusText);
            }
            return response.json();
        })
        .then( () => {
            fetchCarData();
            showAlert();
        })
    }

    const showAlert = () => {
        setOpen(false);
      }

    const closeAlert = () => {
        setOpen(true);
    }

    return (
        <div style={{width: "100%", height: 700, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <Addcar addNewCar={addNewCar}/>
            <div className="ag-theme-material" style={containerStyle}>
                <AgGridReact ref={gridRef} rowData={cars}
                    columnDefs={columns} rowSelection="single" 
                    onGridReady={ params => gridRef.current = params.api }/>
                    <Snackbar autoHideDuration={2000} open = {!open} onClose={closeAlert}>
                        <Alert severity="success">
                            Here is a confirmation that your action was successful.
                        </Alert>
                    </Snackbar>
                    
            </div>
            
        </div>
        
    );
}