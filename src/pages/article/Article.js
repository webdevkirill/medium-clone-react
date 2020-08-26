import React, { useEffect, useContext, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { Link, Redirect } from 'react-router-dom';
import { Loading } from '../../components/Loading/Loading';
import { Taglist } from '../../components/TagList/TagList';
import { CurrentUserContext } from '../../context/currentUser';

export const Article = ({match}) => {

    const [currentUserState] = useContext(CurrentUserContext);

    const isAuthor = () => {
        if (!fetchArticleResponse || !currentUserState.isLoggenIn) {
            return false
        }

        return fetchArticleResponse.article.author.username === currentUserState.currentUser.username
    }

    const slug = match.params.slug;
    const apiUrl = '/articles/' + slug;

    const [{response: fetchArticleResponse, isLoading: fetchArticleIsLoading, error: fetchArticleError}, doFetch] = useFetch(apiUrl);
    const [{response: deleteArticleResponse}, doDeleteArticle] = useFetch(apiUrl);
    const [isSuccessfulDelete, setIsSuccessfulDelete] = useState(false);

    const deleteArticle = () => {
        doDeleteArticle({
            method: 'delete'
        })
    }

    useEffect(() => {
        doFetch();
    }, [doFetch])

    useEffect(() => {
        if (!deleteArticleResponse) {
            return
        }
        setIsSuccessfulDelete(true);
    }, [deleteArticleResponse, isSuccessfulDelete])

    if (isSuccessfulDelete) {
        return <Redirect to='/' />
    }

    return (
        <div className='article-page'>
            <div className='banner'>
                {!fetchArticleIsLoading && fetchArticleResponse && (
                    <div className='container'>
                        <h1>{fetchArticleResponse.article.title}</h1>
                        <div className='article-meta'>
                            <Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
                                <img src={fetchArticleResponse.article.author.image} alt='' />
                            </Link>
                            <div className='info'>
                                <Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
                                    {fetchArticleResponse.article.author.username}
                                </Link>
                                <span className='date'>{fetchArticleResponse.article.createdAt}</span>
                            </div>
                            {
                                isAuthor() && (
                                    <span>
                                        <Link className='btn btn-outline-secondary btn-sm' 
                                        to={`/articles/${fetchArticleResponse.article.slug}/edit`}>
                                            <i className='ion-edit' />&nbsp;
                                            Edit article
                                        </Link>&nbsp;
                                        <button 
                                        className='btn btn-outline-danger btn-sm'
                                        onClick={deleteArticle}>
                                            <i className='ion-trash-a' />&nbsp;
                                            Delete article
                                        </button>
                                    </span>
                                )
                            }
                        </div>
                    </div>
                )}
            </div>
            <div className='container page'>
                {fetchArticleIsLoading && <Loading />}
                {fetchArticleError && <div>Something went wrong</div>}
                {!fetchArticleIsLoading && fetchArticleResponse && (
                    <div className='row article-content'>
                        <div className='col-xs-12'>
                            <div>
                                <p>{fetchArticleResponse.article.body}</p>
                            </div>
                            <Taglist tags={fetchArticleResponse.article.tagList} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}