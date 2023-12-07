import { forwardRef, useRef, useState } from "react";
import PropTypes from "prop-types";

const Switch = forwardRef(({ checked: propChecked, onChange, className, ...props }, ref) => {
    const [checked, setChecked] = useState(propChecked || false);
    const inputRef = useRef(null);

    const handleChange = (event) => {
        const newChecked = event.target.checked;

        // If the parent component provides the `onChange` prop, call it
        if (onChange) {
            onChange(event);
        } else {
            // If `onChange` is not provided, manage the state internally
            setChecked(newChecked);
        }
    };

    return (
        <label className={`inline-flex items-center cursor-pointer ${className}`}>
            <input
                type="checkbox"
                className="hidden"
                checked={checked}
                onChange={handleChange}
                ref={(el) => {
                    inputRef.current = el;
                    if (ref) {
                        // Forward the ref to the parent component if provided
                        if (typeof ref === 'function') {
                            ref(el);
                        } else if (typeof ref === 'object' && ref !== null && Object.hasOwnProperty.call(ref, 'current')) {
                            ref.current = el;
                        }
                    }
                }}
                {...props}
            />
            <div className="relative w-10 h-5 transition-colors rounded-full border-2 border-transparent shadow-sm bg-gray-400">
                <div
                    className={`absolute top-0 left-0 w-5 h-5 rounded-full bg-white border transition-transform ${checked ? 'translate-x-full' : 'translate-x-0'
                        }`}
                />
            </div>
        </label>
    );
});

Switch.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
};
Switch.displayName = 'Switch';
export default Switch;
