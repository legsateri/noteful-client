import React from 'react';
import './RouteListError.css';

class RouteListError extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {

        if (this.state.hasError) {
            return (
                <h2>Could not display the MainList subtree</h2>
            );
        }
        return this.props.children;
    }
}

export default RouteListError;
