import PropTypes from "prop-types";

const Card = ({ children, className, ...props }) => {
    return (
        <div className={`rouned-md border p-4 ${className}`} {...props}>
            {children}
        </div>
    );
};

const CardFooter = ({ children }) => {
    return <div className="mt-4">{children}</div>
}

const CardContent = ({ children }) => {
    return <div>{children}</div>
}
const CardHeader = ({ children }) => {
    return <div className="mb-4">{children}</div>
}


CardContent.propTypes = {
    children: PropTypes.node.isRequired,
}


CardFooter.propTypes = {
    children: PropTypes.node.isRequired,
}



CardHeader.propTypes = {
    children: PropTypes.node.isRequired,
}


Card.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export { Card, CardHeader, CardFooter, CardContent };
