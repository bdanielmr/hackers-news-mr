/* eslint-disable no-unused-vars */
import React, { memo, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useFetch } from '../../hooks/useFetch';
import { apiGetHackerNews } from '../../utils/routes';
import { StoreContext } from '../../store/StoreProvider';
import { types } from '../../store/storeReducer';
import CustomCard from '../../components/CustomCard/CustomCard';

const HomeHackerNews = memo((props) => {
  const [store, dispatch] = useContext(StoreContext);
  const { newsHackerPost } = store;
  const { data: getNews } = useFetch(apiGetHackerNews, {
    tecnologi: 'react',
  });
  const getListMovies = () => {
    dispatch({
      type: types.getNewPosts,
      payload: getNews,
    });
  };
  const getListMoviesStorage = () => {
    dispatch({
      type: types.getNewPosts,
      payload: JSON.parse(localStorage.getItem('POSTNEWS')),
    });
  };

  useEffect(() => {
    if (getNews?.hits) {
      getListMovies();
      localStorage.setItem('POSTNEWS', JSON.stringify(getNews));
    }
  }, [getNews]);
  useEffect(() => {
    if (localStorage.POSTNEWS && !getNews.hits) {
      getListMoviesStorage();
    }
  }, [localStorage.POSTNEWS]);

  console.log('newsHackerPost', newsHackerPost.hits);
  return (
    <div>
      pinga
      {!!newsHackerPost &&
        newsHackerPost?.hits?.map((post, index) => {
          return <CustomCard key={index} card={post} />;
        })}
    </div>
  );
});

HomeHackerNews.propTypes = {};

export default HomeHackerNews;
