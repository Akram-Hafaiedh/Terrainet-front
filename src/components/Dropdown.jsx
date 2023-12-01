import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const DropdownContext = createContext();

const Dropdown = ({ children }) => {

    const [open, setOpen] = useState(false);
    const toggleOpen = () => {

        setOpen((previousState) => !previousState);
    }
    return (
        <DropdownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="relative">{children}</div>
        </DropdownContext.Provider>
        // <div>
        //     <div className={`relative flex items-center justify-between px-3 text-sm uppercase  rounded cursor-pointer select-none disable:opacity-25`}
        //         onClick={() => setIsOpen(!isOpen)}
        //     >
        //         {user && user.avatar ? (
        //             <img
        //                 src={user.avatar}
        //                 alt="User Avatar"
        //                 className={`w-8 h-8 rounded-full ${isOpen ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}`}
        //             />
        //         ) : (
        //             <div className={`w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center ${isOpen ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}`}>
        //                 <span className="text-white font-semibold">
        //                     {user.username.charAt(0).toUpperCase()}
        //                 </span>
        //             </div>
        //         )}

        //         {isOpen && (
        //             <ul className="z-[4] w-48 tracking-widest absolute top-8 right-8 bg-white border rounded shadow-sm focus:ring-2 focus:outline-none z-1 transition ease-in-out space-y-2 ">
        //                 {options.map((option, index) => (
        //                     <li
        //                         key={index}
        //                         onClick={() => handleOptionClick(option.action)}
        //                         className="py-2 px-4 hover:bg-gray-200/40 cursor-pointer hover:underline"
        //                     >
        //                         {option.label}
        //                     </li>
        //                 ))}
        //             </ul>
        //         )}
        //     </div>

        // </div >
    );
};

const Content = ({ align = 'right', width = '48', contentClasses = 'py-1 bg-white', children }) => {
    const { open, setOpen } = useContext(DropdownContext);
    let alignmentClasses = 'origin-top';
    if (align === 'left') {
        alignmentClasses = 'origin-top-left left-0'
    } else if (align === 'right') {
        alignmentClasses = 'origin-top-right right-0'
    }
    let widhClasses = ''
    if (width === '48') {
        widhClasses = 'w-48'
    }
    return (
        <>
            {open && (
                <div
                    className={`absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widhClasses}`}
                    onClick={() => setOpen(false)}
                >
                    <div className={`rounded-md ring-1 ring-black ring-opacity-5 ` + contentClasses}>{children}</div>
                </div>
            )}
        </>
    )
}
const DropdownLink = ({ as, route, method, children, className }) => {
    return (
        <RouterLink
            to={route}
            as={as}
            method={method}
            className={className}
        >
            {children}
        </RouterLink>
    )
}
const Trigger = ({ children }) => {
    const { open, toggleOpen } = useContext(DropdownContext);
    return (
        <>
            <div onClick={toggleOpen}>{children}</div>
            {open && <div className="fixed inset-0 z-40" onClick={toggleOpen}></div>}
        </>
    )
}

DropdownLink.propTypes = {
    method: PropTypes.string,
    route: PropTypes.string,
    as: PropTypes.string,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

Content.propTypes = {
    align: PropTypes.oneOf(['left', 'right']),
    width: PropTypes.string,
    contentClasses: PropTypes.string,
    children: PropTypes.node.isRequired
}

Trigger.propTypes = {
    children: PropTypes.node.isRequired,
}

Dropdown.propTypes = {
    options: PropTypes.array.isRequired,
    user: PropTypes.object,
    children: PropTypes.node.isRequired
};
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;
Dropdown.Trigger = Trigger;

export default Dropdown;
