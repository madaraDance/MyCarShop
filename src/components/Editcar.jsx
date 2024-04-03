/* eslint-disable react/prop-types */
import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function Editcar(props) {

    const [open, setOpen] = React.useState(false);

    const [car, setCar] = React.useState({
        brand: '', model: '', color: '', fuel: '', modelYear: '', price: ''
    })

    const handleClickOpen = () => {
        console.log(props.link)
        setCar({
            brand: props.car.brand, 
            model: props.car.model, 
            color: props.car.color, 
            fuel: props.car.fuel, 
            modelYear: props.car.modelYear, 
            price: props.car.price
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCar({...car, [event.target.name]: event.target.value})
    }

    const handleSubmit = () => {
        props.editCar(car, props.link);
        setOpen(false);
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit car</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To Edit a car please change the information below.
                    </DialogContentText>
                        <TextField
                            required
                            margin="dense"
                            value={car.brand}
                            onChange={event => handleInputChange(event)}
                            label="Car Brand"
                            name="brand"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            value={car.model}
                            onChange={event => handleInputChange(event)}
                            name="model"
                            label="Car Model"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            value={car.color}
                            onChange={event => handleInputChange(event)}
                            label="Car Color"
                            name="color"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            value={car.fuel}
                            onChange={event => handleInputChange(event)}
                            label="Car Fuel"
                            name="fuel"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            value={car.modelYear}
                            onChange={event => handleInputChange(event)}
                            label="Model Year"
                            name="modelYear"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            value={car.price}
                            onChange={event => handleInputChange(event)}
                            label="Car Price"
                            name="price"
                            fullWidth
                            variant="standard"
                        />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}