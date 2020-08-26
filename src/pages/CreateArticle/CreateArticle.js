import React, { useEffect, useState, useContext } from 'react';
import { ArticleForm } from '../../components/ArticleForm/ArticleForm';
import { useFetch } from '../../hooks/useFetch';
import { Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../../context/currentUser';

export const CreateArticle = () => {
    const [currentUserState] = useContext(CurrentUserContext);
    const apiUrl = '/articles';
    const [{response, error}, doFetch] = useFetch(apiUrl);
    const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);

    const initialValues = {
        title: '',
        description: '',
        body: '',
        tagList: []
    };

    const handleSubmit = article => {
        doFetch({
            method: 'post',
            data: {
                article
            }
        });
    }

    useEffect(() => {
        if (!response) {
            return
        }
        setIsSuccessfulSubmit(true);
    }, [response])

    if (currentUserState.isLoggenIn === false) {
        return <Redirect to={`/`} />
    }

    if (isSuccessfulSubmit) {
        return <Redirect to={`/articles/${response.article.slug}`} />
    }
    return (
        <ArticleForm 
        errors={(error && error.errors) || {}} 
        initialValues={initialValues} onSubmit={handleSubmit} / >
    )
}