import {useDispatch} from 'react-redux';

import {Car} from '../car/Car';
import {CarForm} from "../carForm/CarForm";
import {carActions} from "../../redux";

const CarList = (props) => {
    // console.log('===CarList===');
    const {cars} = props;

    const dispatch = useDispatch();

    const updateHandler = (id) => {
        const car = cars.find(car => car.id === id);
        dispatch(carActions.setCarForUpdate(car));
    };

    const deleteHandler = (id) => {
        dispatch(carActions.deleteCarById({id}));
    }

    return (
        <div>
            <CarForm/>
            {cars?.map(car => <Car car={car} key={car.id} updateHandler={updateHandler} deleteHandler={deleteHandler}/>)}
        </div>
    );
};

export {CarList}