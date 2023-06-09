import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { useGetData } from '../../Custom-Hooks';
import { server_calls } from '../../Api';
import { Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle } from '@material-ui/core';
import { CarForm } from '../CarForm';

const columns: GridColDef[] = [
  {field: 'id', headerName: 'ID', width: 90, hide: true },
  {field: 'year', headerName: 'Year', flex: 1},
  {field: 'name', headerName: 'Name', flex: 1},
  {field: 'model', headerName: 'Model', flex: 1},
  {field: 'price', headerName: 'Price', flex:2},
  {field: 'description', headerName: 'Description', flex:2},
  {field: 'car_quality', headerName: 'Car Quality', flex:2},
];

interface gridData {
  data: {
    id?: string
  }
}

export const DataTable = () => {

  let {carData, getData } = useGetData();
  let [ open, setOpen ] = useState(false);
  let [ gridData, setData ] = useState<gridData>({data:{}})
  const [ selectionModel, setSelectionModel ] = useState<any>([]);

  let handleOpen = () => {
    setOpen(true)
  };

  let handleClose = () => {
    setOpen(false)
  };

  let deleteData = () => {
    server_calls.delete(selectionModel);
    getData();
    setTimeout( () => {window.location.reload(); }, 1000)
  };

return (
  <div style={{ height: 400, width: '100%'}}>
    <h2>Our Cars</h2>

  <DataGrid rows={carData} columns={ columns } pageSize={ 5 } checkboxSelection={true}
  onSelectionModelChange={ (item) => {
    setSelectionModel(item)
  }} />

  <Button onClick={handleOpen}>Update</Button>
  <Button variant='contained' color='secondary' onClick={deleteData}>Delete</Button>

  {/* Dialog pop-up */}
  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Update Car {selectionModel}</DialogTitle>
      <DialogContent>
          <DialogContentText>Update Car</DialogContentText>
            <CarForm id={selectionModel!} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button onClick={handleClose} color="primary">Done</Button>
      </DialogActions>
  </Dialog>
  </div>
)
}