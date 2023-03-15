import {useDispatch} from 'react-redux';

import {carActions} from "../../redux";

const Car = (props) => {
    const {car: {id, brand, price, year, photo}, updateHandler, deleteHandler} = props;
    const dispatch = useDispatch();

    const addCarPhoto = (event) => {
        console.log(event.target.files[0]);
        const formData = new FormData;
        const file = event.target.files[0];
        formData.append('photo', file);

        dispatch(carActions.addPhotoById({id, formData, file}));
    };

    return (
        <div>
            <p>ID: {id}</p>
            <p>BRAND: {brand}</p>
            <p>PRICE: {price}</p>
            <p>YEAR: {year}</p>
            {photo
                ? <div style={{width: '300px'}}><img style={{width: '100%'}} src={photo} alt={'car'}/></div>
                : <input type={'file'} onChange={addCarPhoto}/>
            }
            <div>
                <button onClick={() => updateHandler(id)}>update</button>
                <button onClick={() => deleteHandler(id)}>delete</button>
            </div>
        </div>
    );
};

export {Car}