/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './customCard.module.scss';
import Moment from 'react-moment';
import { types } from '../../store/storeReducer';
import { StoreContext } from '../../store/StoreProvider';
const CustomCard = ({ card, fav }) => {
  console.log('ver key', fav);
  const [store, dispatch] = useContext(StoreContext);
  const { newsHackerPost, newsPagination } = store;

  const handleButtonFav = (e) => {
    console.log('ver e', e);
    const objIndex = newsHackerPost.hits.findIndex((obj) => {
      console.log(obj);
      return obj.objectID === e.objectID;
    });
    const updatedObj = {
      ...newsHackerPost.hits[objIndex],
      fav: !card.fav,
    };
    const updatedProjects = [
      ...newsHackerPost.hits.slice(0, objIndex),
      updatedObj,
      ...newsHackerPost.hits.slice(objIndex + 1),
    ];
    localStorage.setItem(
      'POSTNEWS',
      JSON.stringify({ ...newsHackerPost, hits: updatedProjects })
    );

    dispatch({
      type: types.getNewPosts,
      payload: { ...newsHackerPost, hits: updatedProjects },
    });
  };

  return (
    <p className={styles['custom-card']}>
      <a href={card.story_url} target="_blank" rel="noopener noreferrer">
        <span className={styles['time-moment']}>
          <span className={styles['time-icon']}></span>
          <span>
            {
              <Moment fromNow ago>
                {card.created_at}
              </Moment>
            }
          </span>
        </span>
        <span className={styles['story-title']}>{card.story_title}</span>
      </a>
      <button
        className={styles['custom-car-buttom']}
        onClick={() => handleButtonFav(card)}
      >
        {card.fav ? (
          <span className={styles['heart-icon']}></span>
        ) : (
          <img
            src={
              'https://upload.wikimedia.org/wikipedia/commons/5/52/Heart_icon_red_hollow.svg'
            }
            alt=""
            className={styles['regular-heart-icon']}
          />
        )}
      </button>
    </p>
  );
};

CustomCard.propTypes = {
  card: PropTypes.object,
  fav: PropTypes.bool,
};

export default CustomCard;
