import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';

import {authService} from "../../service";

const RegisterForm = () => {
    const {register, handleSubmit, reset} = useForm();

    const [apiError, setApiError] = useState(null);

    const navigate = useNavigate();

    const submitHandler = async (user) => {
        try {
            await authService.register(user);
            navigate('/login');
        } catch (e) {
            reset();
            setApiError(e.response.data?.username);
            console.log(e);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(submitHandler)}>
                <input type='text' placeholder={'username'} {...register('username')}/>
                <input type='text' placeholder={'password'} {...register('password')}/>
                <button type={'submit'}>register</button>
            </form>
            {apiError &&
                <div>
                    <h3 style={{color: 'red'}}>{apiError}</h3>
                </div>
            }
        </div>
    );
};

export {RegisterForm}