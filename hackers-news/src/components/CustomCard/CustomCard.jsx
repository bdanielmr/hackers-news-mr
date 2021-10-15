/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './customCard.module.scss';
import Moment from 'react-moment';
import { types } from '../../store/storeReducer';
import { StoreContext } from '../../store/StoreProvider';
import { useRouteMatch, useParams, Link } from 'react-router-dom';

const CustomCard = ({ card, fav }) => {
  const [store, dispatch] = useContext(StoreContext);
  const {
    newsHackerPost,
    localPost,
    newsPagination,
    localPostAngular,
    localPostReact,
    localPostVue,
  } = store;
  const match = useRouteMatch();

  const handleButtonFav = (e) => {
    if (JSON.parse(localStorage.getItem('SELECTNEWS')) === 'angular') {
      const objIndex = localPost?.hits?.findIndex((obj) => {
        return obj.objectID === e.objectID;
      });
      const updatedObj = {
        ...localPost?.hits?.[objIndex],
        fav: !card.fav,
        selectNews: 'angular',
      };
      const updatedProjects = [
        ...localPost?.hits?.slice(0, objIndex),
        updatedObj,
        ...localPost?.hits?.slice(objIndex + 1),
      ];
      localStorage.setItem(
        'POSTNEWS',
        JSON.stringify({ ...localPost, hits: updatedProjects })
      );
      localStorage.setItem(
        'ANGULARLOCALFAVORITE',
        JSON.stringify({ ...localPostAngular, hits: updatedProjects })
      );
      dispatch({
        type: types.getNewPosts,
        payload: { ...localPost, hits: updatedProjects },
      });
      dispatch({
        type: types.postLocalPost,
        payload: { ...localPost, hits: updatedProjects },
      });
    }
    if (JSON.parse(localStorage.getItem('SELECTNEWS')) === 'reactjs') {
      const objIndex = localPost?.hits?.findIndex((obj) => {
        return obj.objectID === e.objectID;
      });
      const updatedObj = {
        ...localPost?.hits?.[objIndex],
        fav: !card.fav,
        selectNews: 'reactjs',
      };
      const updatedProjects = [
        ...localPost?.hits?.slice(0, objIndex),
        updatedObj,
        ...localPost?.hits?.slice(objIndex + 1),
      ];
      localStorage.setItem(
        'POSTNEWS',
        JSON.stringify({ ...localPost, hits: updatedProjects })
      );
      localStorage.setItem(
        'REACTLOCALFAVORITE',
        JSON.stringify({ ...localPostReact, hits: updatedProjects })
      );
      dispatch({
        type: types.getNewPosts,
        payload: { ...localPost, hits: updatedProjects },
      });
      dispatch({
        type: types.postLocalPost,
        payload: { ...localPost, hits: updatedProjects },
      });
    }
    if (JSON.parse(localStorage.getItem('SELECTNEWS')) === 'vuejs') {
      const objIndex = localPost?.hits?.findIndex((obj) => {
        return obj.objectID === e.objectID;
      });
      const updatedObj = {
        ...localPost?.hits?.[objIndex],
        fav: !card.fav,
        selectNews: 'vuejs',
      };
      const updatedProjects = [
        ...localPost?.hits?.slice(0, objIndex),
        updatedObj,
        ...localPost?.hits?.slice(objIndex + 1),
      ];
      localStorage.setItem(
        'POSTNEWS',
        JSON.stringify({ ...localPost, hits: updatedProjects })
      );
      localStorage.setItem(
        'VUELOCALFAVORITE',
        JSON.stringify({ ...localPostVue, hits: updatedProjects })
      );
      dispatch({
        type: types.getNewPosts,
        payload: { ...localPost, hits: updatedProjects },
      });
      dispatch({
        type: types.postLocalPost,
        payload: { ...localPost, hits: updatedProjects },
      });
    }
  };

  const handleAllFavorite = (e) => {
    if (e.selectNews === 'angular') {
      const objIndex = localPostAngular?.hits?.findIndex((obj) => {
        return obj.objectID === e.objectID;
      });
      const updatedObj = {
        ...localPostAngular?.hits?.[objIndex],
        fav: false,
        selectNews: 'angular',
      };
      const updatedProjects = [
        ...localPostAngular?.hits?.slice(0, objIndex),
        updatedObj,
        ...localPostAngular?.hits?.slice(objIndex + 1),
      ];

      localStorage.setItem(
        'ANGULARLOCALFAVORITE',
        JSON.stringify({ ...localPostAngular, hits: updatedProjects })
      );
      dispatch({
        type: types.editLocalPostAngular,
        payload: { ...localPostAngular, hits: updatedProjects },
      });
      localStorage.setItem(
        'POSTNEWS',
        JSON.stringify({ ...localPostAngular, hits: updatedProjects })
      );
      dispatch({
        type: types.postLocalPostAngular,
        payload: { ...localPostAngular, hits: updatedProjects },
      });
    }
    if (e.selectNews === 'reactjs') {
      const objIndex = localPostReact?.hits?.findIndex((obj) => {
        return obj.objectID === e.objectID;
      });
      const updatedObj = {
        ...localPostReact?.hits?.[objIndex],
        fav: false,
        selectNews: 'reactjs',
      };
      const updatedProjects = [
        ...localPostReact?.hits?.slice(0, objIndex),
        updatedObj,
        ...localPostReact?.hits?.slice(objIndex + 1),
      ];

      localStorage.setItem(
        'REACTLOCALFAVORITE',
        JSON.stringify({ ...localPostReact, hits: updatedProjects })
      );
      dispatch({
        type: types.editLocalPostReact,
        payload: { ...localPostReact, hits: updatedProjects },
      });
      localStorage.setItem(
        'POSTNEWS',
        JSON.stringify({ ...localPostReact, hits: updatedProjects })
      );
      dispatch({
        type: types.postLocalPostReact,
        payload: { ...localPostReact, hits: updatedProjects },
      });
    }
    if (e.selectNews === 'vuejs') {
      const objIndex = localPostVue?.hits?.findIndex((obj) => {
        return obj.objectID === e.objectID;
      });
      const updatedObj = {
        ...localPostVue?.hits?.[objIndex],
        fav: false,
        selectNews: 'vuejs',
      };
      const updatedProjects = [
        ...localPostVue?.hits?.slice(0, objIndex),
        updatedObj,
        ...localPostVue?.hits?.slice(objIndex + 1),
      ];

      localStorage.setItem(
        'VUELOCALFAVORITE',
        JSON.stringify({ ...localPostVue, hits: updatedProjects })
      );
      dispatch({
        type: types.editLocalPostVue,
        payload: { ...localPostVue, hits: updatedProjects },
      });
      localStorage.setItem(
        'POSTNEWS',
        JSON.stringify({ ...localPostVue, hits: updatedProjects })
      );
      dispatch({
        type: types.postLocalPostVue,
        payload: { ...localPostVue, hits: updatedProjects },
      });
    }
  };
  return (
    <p className={styles['custom-card']}>
      <a href={card?.story_url} target="_blank" rel="noopener noreferrer">
        <span className={styles['time-moment']}>
          <span className={styles['time-icon']}></span>
          <span>
            {
              <Moment fromNow ago>
                {card?.created_at}
              </Moment>
            }
          </span>
        </span>
        <span className={styles['story-title']}>{card?.story_title}</span>
      </a>
      <button
        className={styles['custom-car-buttom']}
        onClick={
          match?.path === '/favorite'
            ? () => handleAllFavorite(card)
            : () => handleButtonFav(card)
        }
      >
        {card?.fav ? (
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
