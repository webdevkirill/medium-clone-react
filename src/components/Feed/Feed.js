import React from 'react';
import { Link } from 'react-router-dom';
import { Taglist } from '../TagList/TagList';
import { AddToFavorites } from '../AddToFavorites/AddToFavorites';

export const Feed = ({articles}) => {
    return (
        <div>
            {
                articles.map((article, index) => {
                    return (
                        <div className='article-preview' key={index}>
                            <div className='article-meta'>
                                <Link to={`/profiles/${article.author.username}`}>
                                    <img src={article.author.image} alt='' />
                                </Link>
                                <div className='info'>
                                    <Link to={`/profiles/${article.author.username}`} className='author'>
                                        {article.author.username}
                                    </Link>
                                    <span className='date'>{article.createdAt}</span>
                                </div>
                                <div className='pull-xs-right'>
                                    <AddToFavorites 
                                    isFavorited={article.favorited} 
                                    favoritesCount={article.favoritesCount} 
                                    slug={article.slug} />
                                </div>
                            </div>
                            <Link to={`/articles/${article.slug}`} className='preview-link'>
                                <h1>{article.title}</h1>
                                <p>{article.description}</p>
                                <span>Read more...</span>
                                <Taglist tags={article.tagList} />
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}