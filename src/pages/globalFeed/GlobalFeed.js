import React, { useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { Feed } from '../../components/Feed/Feed';
import { Pagination } from '../../components/Pagination/Pagination';
import { getPaginator, limit } from '../../utils';
import {stringify} from 'query-string';
import { PopularTags } from '../../components/PopularTags/PopularTags';
import { Loading } from '../../components/Loading/Loading';
import { FeedToggler } from '../../components/FeedToggler.js/FeedToggler';

export const GlobalFeed = ({location, match}) => {
    
    const {offset, currentPage} = getPaginator(location.search);
    const stringifiedParams = stringify({
        limit, offset
    });
    const apiUrl = `/articles?${stringifiedParams}`;
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl);

    useEffect(() => {
        doFetch();
    }, [doFetch, currentPage])

    return (
        <div className='home-page'>
            <div className='banner'>
                <div className='container'>
                    <h1>Medium clone</h1>
                    <p>A place to share knowledge</p>
                </div>
            </div>
            <div className='container page'>

                <div className='row'>
                    <div className='col-md-9'>
                        <FeedToggler />
                        {isLoading && <Loading />}
                        {error && <div>Something went wrong</div>}
                        {
                            (!isLoading && response)  
                            ? <>
                                <Feed articles={response.articles} />
                                <Pagination total={response.articlesCount} limit={limit} url={match.url} currentPage={currentPage} />
                            </> 
                            : null
                        }

                    </div>
                    <div className='col-md-3'>
                        <PopularTags />
                    </div>
                </div>
            </div>
            
        </div>
    )
}