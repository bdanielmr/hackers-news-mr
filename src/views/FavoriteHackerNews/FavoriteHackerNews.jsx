/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomCard from '../../components/CustomCard/CustomCard';
import CustomButton from '../../components/CustomButton/CustomButton';
import styles from './favoriteHackerNews.module.scss';
import { StoreContext } from '../../store/StoreProvider';
import { types } from '../../store/storeReducer';
const FavoriteHackerNews = (props) => {
  const [store, dispatch] = useContext(StoreContext);
  const {
    newsHackerPost,
    newsPagination,
    localPostAngular,
    localPostReact,
    localPostVue,
  } = store;
  const localAngularFav = JSON.parse(
    localStorage.getItem('ANGULARLOCALFAVORITE')
  );

  useEffect(() => {}, [localPostAngular]);
  useEffect(() => {}, [localPostReact]);
  useEffect(() => {}, [localPostVue]);
  return (
    <div className={styles['favorite-all']}>
      <div className={styles['favorite-hackers-news-buttom']}>
        <CustomButton />
      </div>
      <div className={styles['container-favorite']}>
        {!!localAngularFav &&
          localAngularFav?.hits?.map((favorite, index) => {
            return (
              favorite.fav && (
                <CustomCard key={index} card={favorite} fav={favorite.fav} />
              )
            );
          })}
        {!!localPostReact &&
          localPostReact?.hits?.map((favorite, index) => {
            return (
              favorite.fav && (
                <CustomCard key={index} card={favorite} fav={favorite.fav} />
              )
            );
          })}
        {!!localPostVue &&
          localPostVue?.hits?.map((favorite, index) => {
            return (
              favorite.fav && (
                <CustomCard key={index} card={favorite} fav={favorite.fav} />
              )
            );
          })}
      </div>
    </div>
  );
};

FavoriteHackerNews.propTypes = {};

export default FavoriteHackerNews;
