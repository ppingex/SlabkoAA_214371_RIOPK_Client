import { useState, useEffect } from "react";

function TypeDropdown({ required, error, action, value, styles }) {
    const [selectedValue, setSelectedValue] = useState();
    const [customStyle, setCustomStyle] = useState();

    useEffect(() => {
        if (value == '')
            {
                setSelectedValue('roomType')
                setCustomStyle('text-gray!')
            }
        else
            {
                setSelectedValue(value);
                setCustomStyle('')
            }
    }, [value])
    
    const handleChange = (evt) => {
        const value = evt.target.value;
        if (value == 'roomType')
        {
            setCustomStyle('text-gray!')
        }
        else
        {
            setCustomStyle('');
            setSelectedValue(value);
            action(value);
        }
    };

    const handleBlur = () => {
        if (selectedValue == 'roomType')
            setCustomStyle("text-gray border-red-500 hover:shadow-red/10")
        else
            setCustomStyle('')
    }

    return (
        <div className={`relative w-full ${styles}`}>
            <label htmlFor="roomType" className="hidden">Тип комнаты</label>
            <select
                id="roomType"
                name="roomType"
                onChange={handleChange}
                onBlur={handleBlur}
                className={`bg-white border border-mid-gray outline-none text-dark text-base rounded-normal focus:ring-purple focus:border-purple w-full p-2.5 my-2.5 pr-[50px] appearance-none hover:shadow-md transition-all duration-300 hover:shadow-mid-gray ${customStyle} ${error ? "border-red-500 hover:shadow-red/10": ''}`}
                value={selectedValue}
                required={required}
            >
                <option value='roomType' hidden>Тип*</option>
                <option value='LUX' className="text-dark">Люкс</option>
                <option value='STANDARD' className="text-dark">Стандарт</option>
                <option value='ECONOMY' className="text-dark">Эконом</option>
            </select>
            <svg className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none" width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        </div>
    )
}

export default TypeDropdown