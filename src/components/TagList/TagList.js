import React from 'react';

export const Taglist = ({tags}) => {
    return (
        <ul className='tag-list'>
            {
                tags.map(tag => (
                    <li key={tag} 
                    className='tag-default tag-pill tag-outline'>{tag}</li>
                ))
            }
        </ul>
    )
}