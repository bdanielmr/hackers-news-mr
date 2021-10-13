/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import CustomCard from '../../components/CustomCard/CustomCard';
import CustomButton from '../../components/CustomButton/CustomButton';
import styles from './favoriteHackerNews.module.scss';
const FavoriteHackerNews = (props) => {
  return (
    <div>
      <div className={styles['favorite-hackers-news-buttom']}>
        <CustomButton />
      </div>
    </div>
  );
};

FavoriteHackerNews.propTypes = {};

export default FavoriteHackerNews;
