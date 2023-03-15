import {useForm} from 'react-hook-form';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useState} from 'react';

import {authService} from "../../service";

const LoginForm = () => {
    const [apiError, setApiError] = useState(null);
    const [query, ] = useSearchParams();

    const {register, handleSubmit, reset} = useForm();
    const navigate = useNavigate();

    const submitHandler = async (user) => {
        try {
            const {data} = await authService.login(user);
            authService.setAccessTokens(data);
            navigate('/cars');
        } catch (e) {
            reset();
            setApiError(e.response.data?.detail);
            console.log(e);
        }
    };

    return (
        <div>
            {query.has('expSession') && <h3 style={{color: 'red'}}>Session has expired!!!</h3>}

            <form onSubmit={handleSubmit(submitHandler)}>
                <input type='text' placeholder={'username'} {...register('username')}/>
                <input type='text' placeholder={'password'} {...register('password')}/>
                <button type={'submit'}>login</button>
            </form>

            {apiError &&
                <div>
                    <h3 style={{color: 'red'}}>{apiError}</h3>
                </div>
            }
        </div>
    );
};

export {LoginForm}