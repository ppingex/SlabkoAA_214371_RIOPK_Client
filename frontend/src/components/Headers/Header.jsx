function Header({ text, status = '', style = ''}) {
    return (
        <div className="flex items-baseline gap-6">
            <h1 className='text-[32px] font-bold'>{text}</h1>
            {status && <p className={style}>{status}</p>}
        </div>
    )
}

export default Header