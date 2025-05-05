import {useEffect, useState} from "react";

import ArrowButtonLeft from "../components/Buttons/ArrowButtonLeft";
import DetailTable from "../components/Tables/DetailTables";
import GuestDetailTable from "../components/Tables/GuestDetailsTable";
import Header from "../components/Headers/Header";
import Button from "../components/Buttons/Button";
import {useLocation, useNavigate, useParams} from "react-router";
import DataController from "../additional/DataController.jsx";

function CheckinDetails({setActiveNavId}) {
    const { checkinId } = useParams();

    const location = useLocation();
    const navigate = useNavigate();

    const [bookingUrl] = useState(import.meta.env.VITE_BOOKINGS_URL);
    const [guestsUrl] = useState(import.meta.env.VITE_GUESTS_URL);

    const [booking, setBooking] = useState({});
    const [room, setRoom] = useState({});
    const [guest, setGuest] = useState({});
    const [source, setSource] = useState('db')

    const { dates, data } = location.state || {};

    const [checkIn, setCheckIn] = useState();
    const [checkOut, setCheckOut] = useState();

    const [loading, setLoading] = useState(false);

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
        setActiveNavId()
        setLoading(true)

        setCheckIn(getHumanDate(dates.checkIn));
        setCheckOut(getHumanDate(dates.checkOut))
        const days = getDaysBetweenDate(dates.checkIn, dates.checkOut);
        setDifDays(days)
        setPrice(days * data.price);
        setLoading(false)
    },[])

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

    const handleSubmit = () => {
        console.log()
        setLoading(true);
        if (source == 'db') {
            DataController.handlePost(bookingUrl, {
                clientPassportNum: guest.passportNum,
                roomNumber: data.number,
                checkInDate: dates.checkIn,
                checkOutDate: dates.checkOut,
            })
                .catch((error) => console.log(error.status))
                .finally(() => {
                    console.log('success for db');
                    navigate('/admin/checkin')
                    setLoading(false)
                })
        }
        else if (source == 'new') {
            DataController.handlePost(guestsUrl, guest)
                .catch((error) => console.log(error));
            DataController.handlePost(bookingUrl, {
                clientPassportNum: guest.passportNum,
                roomNumber: data.number,
                checkInDate: dates.checkIn,
                checkOutDate: dates.checkOut,
            })
                .catch((error) => console.log(error))
                .finally(() => {
                    setLoading(false);
                    console.log('success');
                })
        }
    }

    return (
        <>
            <div className="flex flex-col gap-6">
                <ArrowButtonLeft
                    action={() => navigate(-1)}
                />
                <Header text='Детали бронирования' />
            </div>
            <div className={`grid grid-cols-2 gap-6 my-6 pb-6 border-b-1 border-mid-gray`}>
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
                <GuestDetailTable
                    action={(object) => setGuest(object)}
                    setSource={(value) => setSource(value)}
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
                    cell='roomType'
                    getValue={(value) => getValue(value)}
                    entity= {data}
                    summary={{
                        text: 'Итоговая стоимость, BYN',
                        value: price || 0
                    }}
                />
            </div>
            <Button
                type="button"
                text='Создать бронь'
                actionOnClick={handleSubmit}/>
        </>
    )
}

export default CheckinDetails;