import {useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

import {carValidator} from "../../validator/car.validator";
import {carActions} from "../../redux";

const CarForm = () => {
    // console.log('===CarForm===');

    const dispatch = useDispatch();

    const {carForUpdate} = useSelector(state => state.carReducer);

    const {register, handleSubmit, reset, setValue, formState: {errors, isValid}} = useForm({
        mode: 'all',
        resolver: joiResolver(carValidator),
    });

    useEffect(() => {
        if (carForUpdate) {
            setValue('brand', carForUpdate.brand, {shouldValidate: true});
            setValue('price', carForUpdate.price, {shouldValidate: true});
            setValue('year', carForUpdate.year, {shouldValidate: true});
        }
    }, [carForUpdate, dispatch]);

    const submitHandler = (car) => {
        if (carForUpdate) {
            dispatch(carActions.updateCarById({id: carForUpdate.id, car}));
            dispatch(carActions.setCarForUpdate(null));
        } else {
            dispatch(carActions.createCar({car}));
        }
        reset();
    };

    return (
        <div>
            <form onSubmit={handleSubmit(submitHandler)}>
                <input type='text' placeholder={'brand'} {...register('brand')}/>
                {errors.brand && <span>{errors.brand.message}</span>}
                <input type='text' placeholder={'price'} {...register('price', {valueAsNumber: true})}/>
                {errors.price && <span>{errors.price.message}</span>}
                <input type='text' placeholder={'year'} {...register('year', {valueAsNumber: true})}/>
                {errors.year && <span>{errors.year.message}</span>}
                <button disabled={!isValid} type={'submit'}>{carForUpdate ? 'update' : 'save'}</button>
            </form>
        </div>
    );
};

export {CarForm}