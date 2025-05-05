function DetailTable({ title = '', cell='', getValue = () => {}, columns, entity, summary = null, styles = '' }) {
    return (
        <div className={`rounded-big bg-white min-w-[548px] ${styles}`}>
            <div className="p-4 font-bold text-base border-b-1 border-mid-gray">
                {title}
            </div>
            <div className="flex flex-col">
                {columns.map((column, index) => (
                    <div key={index} className='grid grid-cols-2 gap-2.5 items-center hover:bg-mid-gray/25'>
                        <div className="py-2.5 pl-4">{column.value}</div>
                        <div>{((column.id == cell) && getValue(entity[column.id])) || entity[column.id] || '-'}</div>
                    </div>
                ))}
                {summary && (
                    <div className='grid grid-cols-2 gap-2.5 items-center border-t-1 border-mid-gray font-bold hover:bg-mid-gray/25'>
                        <div className="py-2.5 pl-4">{summary.text}</div>
                        <div>{summary.value}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DetailTable