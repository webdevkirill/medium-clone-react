import React, { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';

export const AddToFavorites = ({isFavorited, favoritesCount, slug}) => {

    const apiUrl = `/articles/${slug}/favorite`;
    const [{response}, doFetch] = useFetch(apiUrl);
    const [favoritesCountWithResponse, setFavoritesCountWithResponse] = useState(favoritesCount);
    const [isFavoritedWithResponse, setIsFavoritedWithResponse] = useState(isFavorited);

    useEffect(() => {
        if (!response) {
            return
        }
        setFavoritesCountWithResponse(response.article.favoritesCount);
        setIsFavoritedWithResponse(response.article.favorited);

    }, [response])

    const handleLike = (e) => { 
        e.preventDefault();
        doFetch({
            method: isFavoritedWithResponse ? 'delete' : 'post'
        })
    }

    return (
        <button className={`btn btn-sm ${isFavoritedWithResponse ? 'btn-primary' : 'btn-outline-primary' }`} onClick={handleLike}>
            <i className='ion-heart' />
            <span>&nbsp; {favoritesCountWithResponse}</span>
        </button>
    )
}