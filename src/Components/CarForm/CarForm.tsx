import React from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseName, chooseModel, chooseCar, choosePrice, chooseDescription, chooseYear } from '../../Redux/Slices/RootSlice';
import { Input } from '../SharedComponents/Input';
import { Button } from '@material-ui/core';
import { server_calls } from '../../Api';

interface CarFormProps {
    id?:string;
    data?:{}
}

interface CarState {
    name: string;
    model: string;
    car_quality: string;
    price: string;
    year: string;
    description: string
}



export const CarForm = (props:CarFormProps) => {

  const dispatch = useDispatch();
  const store = useStore();
  const name = useSelector<CarState>(state => state.name);
  const { register, handleSubmit } = useForm({ });

  const onSubmit = (data:any, event:any) => {
    console.log(props.id)
    if(props.id!){
      server_calls.update(props.id!, data)
      console.log(`Updated: ${data} ${props.id}`);
      console.log(data);
      setTimeout( () => {window.location.reload()}, 1000);
      event.target.reset();
    } else {
      dispatch(chooseName(data.name));
      dispatch(chooseModel(data.model));
      dispatch(chooseYear(data.year));
      dispatch(chooseCar(data.car_quality));
      dispatch(choosePrice(data.price));
      dispatch(chooseDescription(data.description));
      server_calls.create(store.getState());
      setTimeout( () => {window.location.reload()}, 1000)
    }
  }

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
              <label htmlFor="name">Car Name</label>
              <Input {...register("name")} name="name" placeholder='Name' />
          </div>
          <div>
              <label htmlFor="model">Model</label>
              <Input {...register("model")} name="model" placeholder='Model' />
          </div>
          <div>
              <label htmlFor="year">Year</label>
              <Input {...register("year")} name="year" placeholder='Year' />
          </div>
          <div>
              <label htmlFor="car_quality">Car Quality</label>
              <Input {...register("car_quality")} name="car_quality" placeholder='Car Quality' />
          </div>
          <div>
              <label htmlFor="price">Price</label>
              <Input {...register("price")} name="price" placeholder='Price' />
          </div>
          <div>
              <label htmlFor="description">Description</label>
              <Input {...register("description")} name="description" placeholder='Description' />
          </div>
          <Button type="submit">Submit</Button>
        </form>
    </div>
  )
}