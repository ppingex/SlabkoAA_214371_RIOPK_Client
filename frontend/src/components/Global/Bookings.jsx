import { useEffect, useState } from 'react';

import Button from "../Buttons/Button";
import Header from "../Headers/Header";
import Loading from "../../additional/Loading.jsx";
import PeriodDropdown from "../Inputs/PeriodDropdown";
import Table from "../Tables/Table";
import DataController from "../../additional/DataController.jsx";
import {useNavigate} from "react-router";
import DeletePopup from "../Popups/DeletePopup.jsx";

function Bookings({ setActiveNavId }) {
    const [period, setPeriod] = useState('all');

    const navigate = useNavigate();

    const [url, setUrl] = useState(import.meta.env.VITE_BOOKINGS_URL);

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setActiveNavId();

        setLoading(true);

        DataController.fetchData(url)
            .then((response) => {
                if (Array.isArray(response) && response.length > 0) {
                    setData(response)
                }
            })
            .catch((error) => console.log(error.status))

        setLoading(false);
    }, [refresh])

    const getCellStyle = (value) => {
        switch (value) {
            case 'PAST':
                return {
                    name: 'Прошедшее',
                    style: 'text-gray'};
            case 'CANCELLED':
                return {
                    name: 'Отменено',
                    style:'text-red'};
            case 'CURRENT':
                return {
                    name: 'Текущее',
                    style: 'text-green'};
            case 'PENDING':
                return {
                    name: 'Предстоящее',
                    style: 'text-blue'
                }
            default:
                return '';
        }
    }

    const getValue = (value) => {
        switch (value) {
            case 'LUX':
                return 'Люкс';
            case 'STANDARD':
                return 'Стандарт';
            case 'ECONOMY':
                return 'Эконом'
        }
    }

    const [addWindow, setAddWindow] = useState(false);
    const [editWindow, setEditWindow] = useState(false)
    const [deleteWindow, setDeleteWindow] = useState(false);

    const [booking, setBooking] = useState({})

    const handleChangePeriod = (value) => {
        setPeriod(value);
        setLoading(true);
        if (value == 'all')
        {
            DataController.fetchData(`${url}`)
                .then((response) => setData(response))
                .catch((error) => console.log(error.status))
                .finally(() => setLoading(false))
        }
        else if (value == 'month') {
            DataController.fetchData(`${url}/current-month`)
                .then((response) => setData(response))
                .catch((error) => console.log(error.status))
                .finally(() => setLoading(false))
        }
    }

    const handleDelete = () => {
        setLoading(true);
        setDeleteWindow(false);
        DataController.handleDelete(`${url}/${booking.id}`)
            .catch((error) => console.log(error.status))
            .finally(() => {
                setRefresh((prev) => !prev);
                setLoading(false);
            })
        navigate('/admin/bookings');
    }

    return (
        <>
            {loading && <Loading />}
            <div className='flex justify-between h-min mb-6'>
                <Header text='Бронирования'/>
                <div className="flex items-center gap-4">
                    <PeriodDropdown
                        action={(value) => handleChangePeriod(value)}
                    />
                    <Button
                        text='Добавить бронь'
                        type='button'
                        styles='max-h-11!'
                        actionOnClick={() => navigate('/admin/checkin')}
                    />
                </div>
            </div>
            <Table
                title={period == 'all' ? 'Бронирования' : period == 'month' ? 'Бронирования на текущий месяц' : ''}
                size="big"
                cell="status"
                columns = {[
                    {id: 'clientLastName', value: 'Фамилия'},
                    {id: 'clientFirstName', value: 'Имя'},
                    {id: 'clientPatronymic', value: 'Отчество'},
                    {id: 'clientPhone', value: 'Телефон'},
                    {id: 'roomNumber', value: 'Номер'},
                    {id: 'roomType', value: 'Тип'},
                    {id: 'checkInDate', value: 'Заезд'},
                    {id: 'checkOutDate', value: 'Выезд'},
                    {id: 'status', value: 'Статус'},
                ]}
                data = {data}
                actions = {[
                    { item: 'info', callback: (item) => navigate(`/admin/bookings/${item.id}`) },
                    { item: 'delete', callback: (item) => { setDeleteWindow(true); setBooking(item) }}
                ]}
                getCellStyle={(value) => getCellStyle(value)}
                getValue={(value) => getValue(value)}
            />
            {
                deleteWindow &&
                <DeletePopup
                    text='удалить бронирование'
                    actionOnCancel={() => {
                        setDeleteWindow(false);
                    }}
                    actionOnApprove={() => handleDelete()}
                />
            }
        </>
    )
}

export default Bookings