function InfoButton({action = () => {}}) {
    return (
        <div className='px-4 py-3 flex justify-center items-center cursor-pointer' onClick={action}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.99967 14.6667C11.6816 14.6667 14.6663 11.6819 14.6663 8.00001C14.6663 4.31811 11.6816 1.33334 7.99967 1.33334C4.31778 1.33334 1.33301 4.31811 1.33301 8.00001C1.33301 11.6819 4.31778 14.6667 7.99967 14.6667Z" stroke="#8470FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.66699 8H9.66699" stroke="#8470FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.33301 10L10.333 8L8.33301 6" stroke="#8470FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>)
}

export default InfoButton