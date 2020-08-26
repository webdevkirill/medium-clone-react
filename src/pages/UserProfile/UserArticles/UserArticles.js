import React, { useEffect } from 'react';
import { getPaginator, limit } from '../../../utils';
import { stringify } from 'query-string';
import { useFetch } from '../../../hooks/useFetch';
import { Loading } from '../../../components/Loading/Loading';
import { Feed } from '../../../components/Feed/Feed';
import { Pagination } from '../../../components/Pagination/Pagination';

const getApiUrl = ({username, offset, isFavorites}) => {
        const params = isFavorites 
                        ? {limit, offset, favorited: username} 
                        : {limit, offset, author: username};
        return `/articles?${stringify(params)}`
    };

export const UserArticles = ({username, location, isFavorites, url}) => {

    const {offset, currentPage} = getPaginator(location.search);
    const apiUrl = getApiUrl({username, offset, isFavorites});

    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl);

    useEffect(() => {
        doFetch();

    }, [doFetch, isFavorites]);

    return (
        <div>
            {isLoading && <Loading />}
            {error && <div>Something went wrong...</div>}
            {!isLoading && response && (
                <>
                    <Feed articles={response.articles} />
                    <Pagination 
                    total={response.articlesCount} 
                    limit={limit} 
                    url={url}
                    currentPage={currentPage} />
                </>
            )}
        </div>
    )
}