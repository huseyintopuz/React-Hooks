import React, { useEffect } from 'react';

const Child = ({returnComment}) => {
    useEffect(() => {
        console.log('function was called')
    }, [returnComment])
    return (
        <div style={{marginBottom: "0.5rem"}}>
            {returnComment("Huseyin")}    
        </div>
    );
};

export default Child;
