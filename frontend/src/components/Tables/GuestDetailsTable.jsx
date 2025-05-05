import { useState, useRef } from 'react';
import DataController from "../../additional/DataController.jsx";

import Button from '../Buttons/Button';
import Input from '../Inputs/Input';
import Loading from "../../additional/Loading.jsx";
import Switcher from '../Form/Switcher';

function GuestDetailTable({action = () => {}, setSource = () => {}, styles = ''}) {
    const [guestUrl] = useState(import.meta.env.VITE_GUESTS_URL);

    const [loading, setLoading] = useState(false);

    const [guestType, setGuestType] = useState('db');
    const [passportId, setPassportId] = useState();
    const [guest, setGuest] = useState({});
    const newUser = useRef({});

    const handleAddProperty = (key, value) => {
        newUser.current = {
            ...newUser.current,
            [key]: value
        }
        action(newUser.current)
    }

    const buttons = [
        { id: 'db', value: 'из базы' },
        { id: 'new', value: 'новый' },
    ];

    const columns = [
        {id: 'secondName', value: 'Фамилия'},
        {id: 'firstName', value: 'Имя'},
        {id: 'patronymic', value: 'Отчество'},
        {id: 'phoneNumber', value: 'Телефон'},
        {id: 'passportNum', value: 'Идентиф. номер'},
    ]

    const findGuest = () => {
        setLoading(true);
        DataController.fetchData(`${guestUrl}/passport/${passportId}`)
            .then((response) => {
                setGuest(response)
                action(response);
            })
            .catch((response) => console.log(error))
            .finally(() => setLoading(false));
    }

    const handleSelect = (id) => {
        setGuestType(id);
        setSource(id)
    }

    return (
        <>
            {loading && <Loading />}
            <div className={`rounded-big bg-white min-w-[548px] row-span-2 max-h-min! ${styles}`}>
                <div className='flex items-center justify-between border-b-1 border-mid-gray p-4'>
                    <div className="font-bold text-base">
                        Гость
                    </div>
                    <Switcher
                        buttons={buttons}
                        selectedButton={guestType}
                        action={handleSelect}
                        styles='max-h-min'
                        buttonStyle='max-h-min'
                    />
                </div>
                <div className="flex flex-col">
                    {guestType == 'db'
                    ?
                    <>
                        <div className='flex items-center gap-2.5 px-4'>
                            <Input
                                type='text'
                                placeholder='Идентификационный номер паспорта'
                                action={(value) => setPassportId(value)}
                                styles='placeholder:normal-case! uppercase!'
                            />
                            <Button
                                type='submit'
                                text='Подтвердить'
                                actionOnClick={findGuest}
                            />
                        </div>
                        {columns.map((column, index) => (
                            <div key={index} className='grid grid-cols-2 gap-2.5 items-center hover:bg-mid-gray/25'>
                                <div className="py-2.5 pl-4">{column.value}</div>
                                <div>{guest[column.id] || '-'}</div>
                            </div>
                        ))}
                    </>
                    :
                    <>
                        {columns.map((column, index) => (
                            <div key={index} className='py-2.5 px-4'>
                                <Input placeholder={column.value} id={column.id} action={(value) => handleAddProperty(column.id, value)} styles='my-0!'/>
                            </div>
                        ))}
                    </>}

                </div>
            </div>
        </>
    )
}

export default GuestDetailTable