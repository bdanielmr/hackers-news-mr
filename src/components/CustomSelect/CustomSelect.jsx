/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { memo, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { apiGetHackerNews } from '../../utils/routes';
import { StoreContext } from '../../store/StoreProvider';
import { types } from '../../store/storeReducer';
import styles from './CustomSelect.module.scss';
/**
 * component select manage and set diferent post (angular, react, vue) and set localstorage
 * if there no exist and get a response api if ther no exist post news
 */
const CustomSelect = ({ getNews, sendData, sendUseState }) => {
  const [getTecnologi, setGetTecnologi] = useState(
    localStorage?.SELECTNEWS
      ? JSON.parse(localStorage.getItem('SELECTNEWS'))
      : sendUseState.tecnoState
  );
  const [store, dispatch] = useContext(StoreContext);
  const { newsHackerPost, localPost, localPostAngular } = store;
  const [indexFocus, setIndexFocus] = useState(sendUseState.focusState);
  const handleSelect = (e) => {
    sendUseState.tecno(e.target.value);
    sendUseState.focus('index1');
    dispatch({
      type: types.editLocalSelect,
      payload: e.target.value,
    });
    if (typeof getNews !== 'undefined') {
      if (e.target.value === 'angular') {
        localStorage.setItem(
          'POSTNEWS',
          JSON.stringify(
            JSON.parse(localStorage.getItem('ANGULARLOCALFAVORITE'))
          )
        );
        dispatch({
          type: types.postLocalPost,
          payload: JSON.parse(localStorage.getItem('ANGULARLOCALFAVORITE')),
        });
        dispatch({
          type: types.getNewPosts,
          payload: JSON.parse(localStorage.getItem('ANGULARLOCALFAVORITE')),
        });
      } else if (
        e.target.value === 'reactjs' &&
        JSON.parse(localStorage.getItem('REACTLOCALFAVORITE'))
      ) {
        localStorage.setItem(
          'POSTNEWS',
          JSON.stringify(JSON.parse(localStorage.getItem('REACTLOCALFAVORITE')))
        );
        dispatch({
          type: types.postLocalPost,
          payload: JSON.parse(localStorage.getItem('REACTLOCALFAVORITE')),
        });
        dispatch({
          type: types.getNewPosts,
          payload: JSON.parse(localStorage.getItem('REACTLOCALFAVORITE')),
        });
      } else if (
        e.target.value === 'vuejs' &&
        JSON.parse(localStorage.getItem('VUELOCALFAVORITE'))
      ) {
        localStorage.setItem(
          'POSTNEWS',
          JSON.stringify(JSON.parse(localStorage.getItem('VUELOCALFAVORITE')))
        );

        dispatch({
          type: types.postLocalPost,
          payload: JSON.parse(localStorage.getItem('VUELOCALFAVORITE')),
        });
        dispatch({
          type: types.getNewPosts,
          payload: JSON.parse(localStorage.getItem('VUELOCALFAVORITE')),
        });
      } else {
        apiGetHackerNews({
          tecnologi: e.target.value,
        }).then((res) => {
          dispatch({
            type: types.postLocalPost,
            payload: res,
          });
          dispatch({
            type: types.getNewPosts,
            payload: res,
          });
          localStorage.setItem('POSTNEWS', JSON.stringify(res));
        });
      }
    }
    localStorage.setItem('SELECTNEWS', JSON.stringify(e.target.value));
    dispatch({
      type: types.getNewsPagination,
      payload: [0, 8],
    });
  };

  useEffect(() => {}, [localPostAngular]);
  return (
    <select
      className={styles['custom-select']}
      defaultValue={JSON.parse(localStorage.getItem('SELECTNEWS'))}
      onChange={handleSelect}
      name="tecnologi"
      id="tecnologi"
    >
      <option hidden>Select your news</option>
      <option className={styles['custom-select-icon-angular']} value="angular">
        Angular
      </option>
      <option value="reactjs">Reacts</option>
      <option value="vuejs">Vuejs</option>
    </select>
  );
};

CustomSelect.propTypes = {};

export default memo(CustomSelect);
