import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useSearchParams} from 'react-router-dom';

import {CarList} from "../../component/carList/CarList";
import {carActions} from "../../redux";

const CarPage = () => {
    // console.log('====CarPage====');
    const dispatch = useDispatch();

    const {cars, loading, error} = useSelector(state => state.carReducer);
    console.log('Cars:', cars);
    const [query, setQuery] = useSearchParams({page: '1'});

    useEffect(() => {
        // console.log('++++++UseEffect CarPage+++++++');
        dispatch(carActions.getAllCars({page: query.get('page')}));
    }, [query]);

    const prevPageHandler = () => {
        setQuery(query => ({page: +query.get('page') - 1}));
    };
    const nextPageHandler = () => {
        setQuery(query => ({page: +query.get('page') + 1}));
    };

    return (
        <div>
            {loading && <h3 style={{color: 'green'}}>Loading....................</h3>}
            {error && <h1>{error}</h1>}
            <CarList cars={cars.items}/>
            <button disabled={!cars.prev} onClick={prevPageHandler}>prev</button>
            <button disabled={!cars.next} onClick={nextPageHandler}>next</button>
        </div>
    );
};

export {CarPage}