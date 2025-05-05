function ArrowButtonLeft({side = 'left', action = () => {}}) {
    return (
        <div className="cursor-pointer bg-white px-8 py-2.5 flex items-center gap-2.5 rounded-normal w-min border-1 border-mid-gray" onClick={action}>
            {side == 'left' && (
                <>
                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.469669 6.53033C0.176776 6.23744 0.176776 5.76256 0.469669 5.46967L5.24264 0.696699C5.53553 0.403806 6.01041 0.403806 6.3033 0.696699C6.59619 0.989593 6.59619 1.46447 6.3033 1.75736L2.06066 6L6.3033 10.2426C6.59619 10.5355 6.59619 11.0104 6.3033 11.3033C6.01041 11.5962 5.53553 11.5962 5.24264 11.3033L0.469669 6.53033ZM13 6.75H0.999999V5.25H13V6.75Z" fill="#1F2937"/>
                    </svg>
                    <p>Назад</p>
                </>
            )
            }
            {side == 'right' && (
                <>
                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5303 6.53033C12.8232 6.23744 12.8232 5.76256 12.5303 5.46967L7.75736 0.696699C7.46447 0.403806 6.98959 0.403806 6.6967 0.696699C6.40381 0.989593 6.40381 1.46447 6.6967 1.75736L10.9393 6L6.6967 10.2426C6.40381 10.5355 6.40381 11.0104 6.6967 11.3033C6.98959 11.5962 7.46447 11.5962 7.75736 11.3033L12.5303 6.53033ZM0 6.75H12V5.25H0V6.75Z" fill="#1F2937"/>
                    </svg>
                    <p>Далее</p>
                </>
            )
            }
        </div>
    )
}

export default ArrowButtonLeft