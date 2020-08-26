import React from 'react';

export const BackendErrorMessages = ({backendErrors}) => {
    const errorMessages = Object.keys(backendErrors).map((name) => {
        const messages = backendErrors[name].join(' ')
        return `${name} ${messages}`
    })
    return (
        <ul className='error-messages'>
            {
                errorMessages.map((error, index) => (
                    <li key={index}>
                        {error}
                    </li>
                ))
            }
        </ul>
    )
}