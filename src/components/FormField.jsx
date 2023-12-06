import PropTypes from 'prop-types'

const FormField = ({ onChange, error, value, type, id, label }) => {
    return (
        <div>
            <div className="relative">
                <input
                    onChange={onChange}
                    type={type}
                    name={id}
                    id={id}
                    autoComplete={id}
                    required
                    className={`border 
                        ${error ?
                            'border-red-500 dark:border-red-600' 
                            : 'dark:border-gray-600 border-gray-300'
                        } block px-2.5 pb-2.5 pt-4 w-full text-sm dark:bg-gray-900 text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    placeholder=" "
                    value={value}
                />
                <label htmlFor={id} className={`absolute text-sm 
                
                    ${error ? 'text-red-500 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}
                 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
                >{label} {error && "*"}</label>
            </div>
            {error && (
                <p className="text-sm text-red-500 mt-1">{error}</p>
            )}
        </div>
    )
}


FormField.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
}

export default FormField;