import { useState } from "react";

function Input({
                   id = '',
                   min = '',
                   max = '',
                   type,
                   placeholder,
                   value,
                   error = false,
                   ignore = false,
                   required = false,
                   disabled = false,
                   action = () => {},
                   styles = null}) {
    const [invalid, setInvalid] = useState(false);

    const handleBlur = (evt) => {
        if (evt.target.value == '' && !ignore)
            setInvalid(true)
        else
            setInvalid(false);
    }

    const handleChange = (evt) => {
        const value = evt.target.value;
        if(value == '' && !ignore){
            setInvalid(true);
            return;
        }
        else {
            setInvalid(false);
        }
        action(value);
    }

    if (required) {
        return <input
            type={type}
            id={id}
            name={id}
            placeholder={placeholder}
            defaultValue={value}
            disabled={disabled}
            required={required}
            onBlur={handleBlur}
            onChange={handleChange}
            autoComplete="off"
            min={min}
            max={max}
            className={`rounded-normal border-1 p-2.5 my-2.5 w-full focus:outline-none focus:ring-1 focus:ring-purple transition-all duration-300 hover:shadow-md text-dark ${styles} ${
                (error || invalid) ? "border-red-500 hover:shadow-red/10" : "border-mid-gray hover:shadow-mid-gray"
            } bg-white`}/>
    }
    else {
        return <input
            type={type}
            id={id}
            name={id}
            placeholder={placeholder}
            defaultValue={value}
            disabled={disabled}
            onBlur={handleBlur}
            onChange={handleChange}
            autoComplete="off"
            className={`rounded-normal border-1 p-2.5 my-2.5 w-full focus:outline-none focus:ring-1 focus:ring-purple transition-all duration-300 hover:shadow-md text-dark ${styles} border-mid-gray hover:shadow-mid-gray bg-white`}/>
    }


}

export default Input