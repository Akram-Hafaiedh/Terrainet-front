import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';


const FilterButtons = ({ filterType, onFilterChange }) => {
    // console.log('FilterButtons - filterType:', filterType);
    // const filterTypes = ['All', 'typeA', 'typeB', 'typeC'];
    const [filterTypes, setFilterTypes] = useState([])
    // console.log(filterTypes);
    useEffect(() => {
        const fetchFilterTypes = async () => {
            const authToken = localStorage.getItem('token');
            // console.log('authToken:', authToken);
            try {
                const res = await fetch('/api/places/types', {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/Json'
                    }
                });
                if (!res.ok) {
                    throw new Error(`Failed to fetch types:'${res.statusText}`);
                }
                const data = await res.json();
                console.log(data);
                const typesWithCount = ['all', ...data.map((item) => item.type.toLowerCase())]
                setFilterTypes(typesWithCount)
            } catch (error) {
                console.log(error)
            }
        }
        fetchFilterTypes();
    }, [])
    return (
        <div className='flex space-x-2'>
            {filterTypes.map((type) => {
                // console.log(type);
                return (
                    <button
                        key={type}
                        className={`px-4 py-2 rounded ${filterType && filterType.toLowerCase() === type.toLowerCase() ? `bg-blue-500 text-white` : 'bg-gray-200 text-gray-700'} ${filterType === null && type === 'All' ? 'bg-green-500 !text-white' : ''}`}
                        onClick={() => onFilterChange(type.toLowerCase() === 'all' ? null : type)}
                    >
                        {type}
                    </button>
                );
            })}

        </div >
    );
};


FilterButtons.propTypes = {
    filterType: PropTypes.string,
    onFilterChange: PropTypes.func.isRequired,
};


export default FilterButtons;
