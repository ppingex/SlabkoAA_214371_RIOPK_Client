import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import DataController from "../additional/DataController.jsx";

import ArrowButtonLeft from "../components/Buttons/ArrowButtonLeft";
import CancelButton from "../components/Buttons/CancelButton";
import Header from "../components/Headers/Header";
import DetailTable from "../components/Tables/DetailTables";
import DeletePopup from '../components/Popups/DeletePopup';

function BookingDetails({ setActiveNavId }) {
    const { bookingId } = useParams();

    const navigate = useNavigate();

    const [booking, setBooking] = useState({});
    const [room, setRoom] = useState({});
    const [guest, setGuest] = useState({});

    const [checkIn, setCheckIn] = useState();
    const [checkOut, setCheckOut] = useState();

    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    
    const [bookingUrl] = useState(import.meta.env.VITE_BOOKINGS_URL);
    const [roomUrl] = useState(import.meta.env.VITE_ROOMS_URL);
    const [guestUrl] = useState(import.meta.env.VITE_GUESTS_URL);

    const [difDays, setDifDays] = useState(0);
    const [price, setPrice] = useState(0);

    const getDaysBetweenDate = (dateStr1, dateStr2) => {
        const date1 = new Date(dateStr1);
        const date2 = new Date(dateStr2);

        const diffInMs = Math.abs(date2 - date1);

        return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    }

    function getHumanDate(strDate) {
        return strDate.split('-').reverse().join('.')
    }

    useEffect(() => {
        setActiveNavId();

        setLoading(true);

        DataController.fetchData(`${bookingUrl}/${bookingId}`)
            .then((response) => setBooking(response))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
    }, [refresh])

    useEffect(() => {
        if (Object.keys(booking).length === 0) return;

        setLoading(true);

        setCheckIn(getHumanDate(booking.checkInDate));
        setCheckOut(getHumanDate(booking.checkOutDate))

        setDifDays(getDaysBetweenDate(booking.checkInDate, booking.checkOutDate));
        Promise.all([
            DataController.fetchData(`${roomUrl}/${booking.roomId}`),
            DataController.fetchData(`${guestUrl}/${booking.clientId}`)
        ])
            .then(([roomData, guestData]) => {
                setRoom(roomData);
                setGuest(guestData);

                setPrice(difDays * room.price);
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
    }, [booking])

    useEffect(() => {
        setPrice(difDays * room.price);
    }, [room])

    const [deleteWindow, setDeleteWindow] = useState(false);
    const [item, setItem] = useState();

    const getParagrpahStyle = (value) => {
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

    const handleCancel = () => {
        setLoading(true);

        DataController.handlePatch(`${bookingUrl}/${bookingId}/cancel`)
            .then(() => setRefresh((prev) => !prev))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
    }
    return (
        <>
            <div className="flex flex-col gap-6">
                <ArrowButtonLeft
                    action={() => navigate(-1)}
                />
                <Header
                    text='Детали бронирования'
                    status={getParagrpahStyle(booking.status).name}
                    style={getParagrpahStyle(booking.status).style}
                />
            </div>
            <div className={`grid grid-cols-2 gap-6 my-6 ${booking.status === 'CANCELED' && 'pb-6 border-b-1 border-mid-gray'}`}>
                <DetailTable
                    title="Даты"
                    columns={[
                        {id: 'checkInDate', value: 'Заезд'},
                        {id: 'checkOutDate', value: 'Выезд'},
                        {id: 'days', value: 'Суток'}
                    ]}
                    entity={{
                        checkInDate: checkIn,
                        checkOutDate: checkOut,
                        days: difDays,
                    }}
                />
                <DetailTable
                    title="Гость"
                    columns = {[
                        {id: 'secondName', value: 'Фамилия'},
                        {id: 'firstName', value: 'Имя'},
                        {id: 'patronymic', value: 'Отчество'},
                        {id: 'phoneNumber', value: 'Телефон'},
                        {id: 'passportNum', value: 'Идентиф. номер'},
                    ]}
                    entity= {guest}
                    styles="row-span-2 max-h-min!"
                />
                <DetailTable
                    title='Номер'
                    columns = {[
                        {id: 'number', value: 'Номер'},
                        {id: 'roomType', value: 'Тип'},
                        {id: 'numberOfBeds', value: 'Количество спальных мест'},
                        {id: 'area', value: 'Площадь'},
                        {id: 'additionalParameters', value: 'Доп. параметры'},
                        {id: 'price', value: 'Стоимость, BYN/сутки'},
                    ]}
                    cell={'roomType'}
                    getValue={(value) => getValue(value)}
                    entity={room}
                    summary={{
                        text: 'Итоговая стоимость, BYN',
                        value: price || 0
                    }}
                />
            </div>
            {booking.status === 'CANCELLED' ? null : <CancelButton
            action={() => setDeleteWindow(true)}
            text="Отменить бронь"/>}
            {
                deleteWindow &&
                <DeletePopup
                    text='отменить бронирование'
                    actionOnCancel={() => {
                        setDeleteWindow(false);
                    }}
                    actionOnApprove={() => {
                        handleCancel()
                        setDeleteWindow(false);
                    }}
                />
            }
            
        </>
    )
}

export default BookingDetails