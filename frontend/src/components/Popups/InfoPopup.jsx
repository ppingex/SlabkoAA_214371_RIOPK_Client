import { useEffect, useRef, useState } from 'react'

import Button from "../Buttons/Button"
import CancelButton from "../Buttons/CancelButton"
import Input from "../Inputs/Input"
import TypeDropdown from '../Inputs/TypeDroprown';
import StatusDroprow from "../Inputs/StatusDroprow.jsx";

function InfoPopup({
    title = '',
    cell = '',
    specialCells = [],
    columns = [],
    entity = {},
    action = () => {},
    actionOnClose = () => {},
    actionOnAdd = () => {},
}) {
    const formDataRef = useRef();
    const formData = useRef(entity)
    const [hiddenValue, setHiddenValue] = useState();
    const [error, setError] = useState(false);
    const [tableData, setTableData] = useState([]);

    function setPropertyOfForm(key, value) {
        formData.current = {
            ...formData.current,
            [key]: value,
        }

        action(formData.current)
    }

    useEffect(() => {
        setHiddenValue(entity[cell])
    }, [entity, cell])

    const handleUpdateTable= (evt) => {
        evt.preventDefault();

        if (!formDataRef.current.checkValidity()) {
            setError(true);
        }

        actionOnAdd()
    }
    
    const handleInvalid = (evt) => {
        evt.preventDefault();
        setError(true);
    }

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white rounded-big">
                <p className="font-bold text-base py-6 px-10 text-dark font-inter text-center">{title}</p>
                <form ref={formDataRef} onSubmit={handleUpdateTable} className="flex flex-col">
                    {columns.map((column, index) => {
                        if (column.id == 'roomType')
                            return (
                                <div key={index}>
                                    <input type="text" id={column.id} name={column.id} defaultValue={hiddenValue} hidden onInvalid={handleInvalid} required readOnly/>
                                    <TypeDropdown
                                        styles='w-112! mx-4'
                                        action={(value) => {
                                            setError(false);
                                            setPropertyOfForm(column.id, value);
                                            setHiddenValue(value)
                                        }}
                                        value={entity[column.id] || ''}
                                        error={hiddenValue == '' && error}
                                        required={true}
                                    />
                                </div>
                            )
                        else
                            return (
                                <Input
                                    // type={column.id == 'additionalParameters' ? 'text' : 'number' }
                                    type={specialCells.includes(column.id) ? 'text' : 'number'}
                                    min='0'
                                    key={index}
                                    id={column.id}
                                    placeholder={column.value}
                                    value={entity[column.id] || ''}
                                    styles='w-112! mx-4'
                                    action={(value) => setPropertyOfForm(column.id, value)}
                                    required={column.id == 'additionalParameters' ? false : true}
                                    ignore={column.id == 'additionalParameters' ? true : false}
                                />)
                    })}
                </form>
                    <div className="flex items-center justify-center gap-2.5 my-2.5">
                        <CancelButton
                            text="Отмена"
                            styles='min-w-25'
                            action={actionOnClose}
                        />
                        <Button
                            type="submit"
                            text={title}
                            styles='min-w-25!'
                            actionOnClick={() => formDataRef.current.requestSubmit()}
                        />
                    </div>
            </div>
        </div>
    )
}

export default InfoPopup