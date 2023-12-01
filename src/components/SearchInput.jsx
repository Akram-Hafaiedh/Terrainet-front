import PropTypes from "prop-types";

function SearchInput({ searchQuery, onSearchChange }) {
    return (
        <div>
            <input
                type="text"
                name=""
                placeholder="Search ..."
                className="border px-2 py-1 rounded"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                id="" />
        </div>
    );
}

SearchInput.propTypes = {
    searchQuery: PropTypes.string,
    onSearchChange: PropTypes.func.isRequired,
};

export default SearchInput;
