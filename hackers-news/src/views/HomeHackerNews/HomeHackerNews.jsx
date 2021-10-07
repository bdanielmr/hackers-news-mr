/* eslint-disable no-unused-vars */
import React, { memo, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useFetch } from '../../hooks/useFetch';
import { apiGetHackerNews } from '../../utils/routes';
import { StoreContext } from '../../store/StoreProvider';
import { types } from '../../store/storeReducer';
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
  useEffect(() => {
    if (getNews?.hits) {
      getListMovies();
    }
  }, [getNews]);
  console.log(newsHackerPost);
  return <div>pinga</div>;
});

HomeHackerNews.propTypes = {};

export default HomeHackerNews;
