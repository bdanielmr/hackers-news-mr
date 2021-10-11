/* eslint-disable no-unused-vars */
import React, { memo, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useFetch } from '../../hooks/useFetch';
import { apiGetHackerNews } from '../../utils/routes';
import { StoreContext } from '../../store/StoreProvider';
import { types } from '../../store/storeReducer';
import CustomCard from '../../components/CustomCard/CustomCard';
import styles from './homeHackerNews.module.scss';
import CustomPagination from '../../components/CustomPagination/CustomPagination';
const HomeHackerNews = memo((props) => {
  const [store, dispatch] = useContext(StoreContext);
  const { newsHackerPost, newsPagination } = store;
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
    if (
      !localStorage?.POSTNEWS?.hits?.[0].objectID !==
      getNews?.hits?.[0].objectID
    ) {
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
    <div className={styles.container}>
      {!!newsHackerPost &&
        newsHackerPost?.hits
          ?.slice(newsPagination[0], newsPagination[1])
          .map((post, index) => {
            return (
              <div key={index}>
                <CustomCard card={post} fav={post.fav} />
              </div>
            );
          })}
      {<CustomPagination start={1} end={newsHackerPost.nbPages} />}
    </div>
  );
});

HomeHackerNews.propTypes = {};

export default HomeHackerNews;
