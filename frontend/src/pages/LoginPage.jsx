import { useState } from 'react';
import axios from 'axios';

import Button from '../components/Buttons/Button';
import Switcher from '../components/Form/Switcher';
import Input from '../components/Inputs/Input';
import Loading from "../additional/Loading.jsx";

import DataController from "../additional/DataController.jsx";
import {useNavigate} from "react-router";

function LoginPage() {
    const [tableData, setTableData] = useState([]);

    const navigate = useNavigate();

    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const [selectedRole, setSelectedRole] = useState('admin');
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();

    const buttons = [
        { id: 'guest', value: 'Гость' },
        { id: 'admin', value: 'Администратор' },
    ];

    const handleSelect = (id) => {
        setSelectedRole(id);
      };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        setLoading(true)

        const data = {
            "username": login,
            "password": password
        }

        DataController.handlePost(`${import.meta.env.VITE_AUTH_URL}/login`, data)
            .then((response) => {
                setError();
                if (response.status == 200)
                {
                    const date = new Date();
                    date.setTime(date.getTime() + (3 * 60 * 60 * 1000)); // Устанавливаем срок действия
                    const expires = `expires=${date.toUTCString()}`;
                    document.cookie = `auth=true; path=/`;
                    localStorage.setItem('username', login)
                    navigate('/admin');
                }
                else if (response.status == 400 || response.status == 500 )
                {
                    setError('Упс! Проверьте данные');
                }
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))


    }

    return (
        <div className='flex justify-center items-center w-full h-full'>
            {loading && <Loading />}
            <div className='flex flex-col items-center bg-white w-[30rem] min-h-[372px] rounded-big py-4'>
                <img src='../LogoSmall.png' width='32' height='32' alt='' className='my-2.5'/>
                <div className='w-full flex flex-col items-center'>
                    <div className='my-4 flex justify-center items-center flex-col gap-4'>
                        <p className='font-bold text-base'>Войти в систему</p>
                        <Switcher
                            buttons={buttons}
                            selectedButton={selectedRole}
                            action={handleSelect}
                        />
                    </div>
                    <div className='w-full px-4'>
                        <Input
                            id='login'
                            type='text'
                            placeholder='Логин'
                            required={true}
                            action={(value) => setLogin(value)}/>
                        <Input
                            id='password'
                            type='password'
                            placeholder='Пароль'
                            required={true}
                            action={(value) => setPassword(value)}
                        />
                    </div>
                    {error && <p className='text-red text-sm my-2'>Упс! Проверьте данные!</p>}
                    <Button
                        text='Войти'
                        type='button'
                        actionOnClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    )
}

export default LoginPage;