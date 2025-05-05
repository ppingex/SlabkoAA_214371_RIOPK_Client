import DeleteButton from "../Buttons/DeleteButton";
import EditButton from "../Buttons/EditButton";
import InfoButton from "../Buttons/InfoButton";

function Table(
    {
        title = '',
        size = 'big',
        columns = [],
        data = [],
        actions = [],
        cell = '',
        getCellStyle = () => {},
        getValue = () => {}
    }
) {
    const actionCount = actions.length;

    return (
        <div className="bg-white rounded-big">
          <h2 className="text-lg font-semibold p-4">{title}</h2>
          <div className="overflow-hidden">
                <div className={`overflow-y-auto relative ${size == 'big' ? 'max-h-[574px]': size == 'small' ? 'max-h-[312px]' : ''}`}>
                    <table className="w-full table-auto">
                        <thead className="bg-light-gray text-dark/50 border-y-1 border-mid-gray sticky top-0 z-0">
                            <tr>
                                {
                                    columns.map((column, index) => 
                                        <th key={index} className="py-2.5 px-4 text-left truncate max-w-[100px]" title={column.value}>
                                            {column.value}
                                        </th>
                                    )
                                }
                                {
                                    actionCount > 0 && (
                                        <th colSpan={actionCount} className={`w-[${48*actionCount}px]`}></th>
                                    )
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {data.length != 0
                            ?
                                data.map((entity, index) => (
                                    <tr key={index} className="border-t-1 border-mid-gray transition-all duration-300 hover:bg-mid-gray/25">
                                        {columns.map((column, index) => {
                                            const cellStyle = (column.id === cell) ? getCellStyle(entity[column.id]) : '';
                                            return (
                                                <td key={index} className={`py-3 px-4 text-left truncate max-w-[100px] ${cellStyle.style}`}
                                                title = {(column.id == 'roomType' && getValue(entity[column.id])) || column.id == cell && cellStyle.name || entity[column.id] || '-' + (column.id == 'roomPrice' && entity[column.id]) && 'BYN'}>
                                                    {(column.id == 'roomType' && getValue(entity[column.id])) || column.id == cell && cellStyle.name || entity[column.id] || '-'} {(column.id == 'roomPrice' && entity[column.id]) && 'BYN'}
                                                </td>
                                            )
                                        })}
                                        {actionCount > 0 && (
                                        actions.map((action) => (
                                            <td key={action.item} className="w-[48px]">
                                                {
                                                    action.item === 'info' && 
                                                    <InfoButton
                                                        action={() => action.callback(entity)}
                                                    />
                                                }
                                                {
                                                    action.item === 'edit' &&
                                                    <EditButton
                                                        action={() => action.callback(entity)}
                                                    />
                                                }
                                                {
                                                    action.item === 'delete' &&
                                                    <DeleteButton
                                                        action={() => action.callback(entity)}
                                                    />
                                                }
                                            </td>
                                        ))
                                    )}
                                    </tr>
                                ))
                            :
                            <tr className="border-t-1 border-mid-gray transition-all duration-300 hover:bg-mid-gray/25">
                                <td className='text-gray py-3 px-4 text-left' colSpan={actionCount + columns.length}>Ничего не найдено.</td>
                            </tr>}
                            
                        </tbody>
                    </table>
                
                </div>
          </div>
        </div>
      );
}

export default Table