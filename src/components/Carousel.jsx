import PropTypes from 'prop-types';

import { useRef, useState } from "react";
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaRegStar, FaStar } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import FilterButtons from "./FilterButtons";
import SearchInput from "./SearchInput";
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';
// import { Link } from "react-router-dom";

const imageUrl = 'https://placekitten.com/400/300';


const Carousel = ({ places }) => {
    // console.log('Carousel Re-rendered');

    const scrollContainerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0)
    const [filterType, setFilterType] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleScrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const handleScrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const deltaX = startX - e.clientX;
        setStartX(e.clientX);
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += deltaX;
            scrollContainerRef.current.style.cursor = "grabbing"
        }
    }
    const handleMouseUp = () => {
        // console.log('Mouse Up');
        setIsDragging(false);
        if (scrollContainerRef.current) {
            scrollContainerRef.current.style.cursor = "grab";
        }
    }
    const handleMouseDown = (e) => {
        // console.log('Mouse down');
        setIsDragging(true);
        setStartX(e.clientX);
    }
    const handleItemClick = (id) => {
        console.log(`Item ${id} clicked`);
    }
    const handleFilterChange = (type) => {
        // console.log('Carousel - handleFilterChange - type:', type);
        // console.log('Filtering Items:', items.filter((item) => item.type === type));
        setFilterType(type);
    }
    const handleSearchChange = (value) => {
        setSearchQuery(value)
    }

    // const filteredItems = filterType ? items.filter((item) => item.type === filterType) : items;
    const filteredItems = filterType ? places.filter((item) => item.type.toLowerCase() === filterType.toLowerCase()) : places;
    const searchedItems = searchQuery
        ? filteredItems.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
        : filteredItems

    return (
        <div className="relative">
            <div className="flex items-center justify-between m-8">
                <FilterButtons filterType={filterType} onFilterChange={handleFilterChange} />

                <SearchInput searchQuery={searchQuery} onSearchChange={handleSearchChange} />
            </div>
            <div className={`flex items-center justify-between max-w-full m-8 bg-gray-100 h-full`}>

                <button className="absolute left-0 text-3xl cursor-pointer" onClick={handleScrollLeft}><FaChevronLeft /></button>
                <div
                    ref={scrollContainerRef}
                    className={`select-none flex transition-transform ease-in-out duration-300 overflow-x-auto ${searchedItems.length === 0 ? 'w-full' : ''}`}
                    onMouseMove={handleMouseMove}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}

                >
                    {searchedItems.length === 0 ? (
                        <div className="w-full flex items-center justify-center h-full rounded-md">
                            <p className="text-gray-500 text-center">No items match the search criteria.</p>
                        </div>
                    ) : (

                        searchedItems.map((item, index) => {
                            // console.log('Rendered Item:', item);
                            return (
                                <div to={`item/${index}`} key={index} className="flex-shrink-0 w-72 rounded-md overflow-hidden flex items-center justify-center bg-gray-200 mr-4">
                                    <CarouselItem item={item} onClick={() => handleItemClick(item.id)} />
                                    {/* {item.photos[0]} */}


                                </div>
                            );
                        })
                    )}
                </div>
                <button className="absolute right-0 text-3xl cursor-pointer" onClick={handleScrollRight}><FaChevronRight /></button>
            </div>
        </div >
    );
};

const CarouselItem = ({ item, onItemClick, onSelect }) => {
    const [isSelected, setIsSelected] = useState(false);
    const handleSelect = () => {
        setIsSelected(!isSelected);
        onSelect(item.id, !isSelected);
    }
    return (
        <>

            <div
                onClick={handleSelect}
                className={`relative flex flex-col max-w-sm bg-white  rounded-lg h-full shadow dark:bg-gray-800 dark:border-gray-700 group border-2 ${isSelected ? 'border-blue-500' : 'border-gray-200'}`}
            >
                <div className='absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <HiOutlineDotsVertical className="cursor-pointer text-white text-2xl" />
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <div className='pl-4 p-2 flex flex-col'>
                                <Dropdown.Link className="hover:bg-gray-400 py-1 px-2" onClick={onItemClick} to={`/details/${item.id}`}>Comments</Dropdown.Link>
                                <Dropdown.Link className="hover:bg-gray-400 py-1 px-2" onClick={onItemClick} to={`/details/${item.id}`}>Details</Dropdown.Link>
                                <Dropdown.Link className="hover:bg-gray-400 py-1 px-2" onClick={onItemClick} to={`/details/${item.id}`}>Ratings</Dropdown.Link>
                            </div>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
                <a href="#">
                    <img className="rounded-t-lg w-full object-fit h-48" src={imageUrl} alt="" />
                </a>
                <div className="p-5 flex flex-col h-full">

                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                    </a>
                    <div className='flex items-center mt-2.5 mb-5'>
                        <div className="flex items-center space-x-1 rtl:space-x-reservse">
                            <FaStar className='text-yellow-400' />
                            <FaStar className='text-yellow-400' />
                            <FaStar className='text-yellow-400' />
                            <FaStar className='text-yellow-400' />
                            <FaRegStar className='text-yellow-400' />
                        </div>
                        <span className="ms-3 bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">{item.rating}</span>
                    </div>
                    {item.description ? (
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-ellipsis line-clamp-2">{item.description}.</p>
                    ) : (

                        <p className="shrink mb-3 font-normal text-gray-700 dark:text-gray-400 max-h-20 text-ellipsis line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum exercitationem ab dolores asperiores, commodi molestias blanditiis natus impedit aliquam tempora saepe nam repellat ad quam accusantium quo magni deleniti in corrupti! Consequuntur explicabo illo numquam accusantium quod tempora deleniti laudantium.</p>
                    )}
                    <div className="mt-auto">
                        <Link to="#" className="w-fit space-x-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <span>Make Reservation</span>
                            <FaArrowRight />
                        </Link>
                    </div>

                </div>
            </div>
        </>
    )
}

CarouselItem.propTypes = {
    onSelect: PropTypes.func,
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        photos: PropTypes.array,
        image: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
    onItemClick: PropTypes.func,
}

Carousel.propTypes = {
    places: PropTypes.array.isRequired,
};


export default Carousel;
