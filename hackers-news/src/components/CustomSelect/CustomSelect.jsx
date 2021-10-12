/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { apiGetHackerNews } from '../../utils/routes';
import { StoreContext } from '../../store/StoreProvider';
import { types } from '../../store/storeReducer';
import styles from './CustomSelect.module.scss';
const CustomSelect = ({ getNews, sendData, sendUseState }) => {
  const [getTecnologi, setGetTecnologi] = useState(
    localStorage?.SELECTNEWS
      ? JSON.parse(localStorage.getItem('SELECTNEWS'))
      : sendUseState.tecnoState
  );
  const [store, dispatch] = useContext(StoreContext);
  const { newsHackerPost } = store;
  const [indexFocus, setIndexFocus] = useState(sendUseState.focusState);
  const handleSelect = (e) => {
    sendUseState.tecno(e.target.value);
    sendUseState.focus('index1');
    console.log('ver select', e.target.value);
    if (typeof getNews !== 'undefined') {
      apiGetHackerNews({
        tecnologi: e.target.value,
      }).then((res) => {
        dispatch({
          type: types.getNewPosts,
          payload: {
            ...newsHackerPost,
            hits: [...res.hits],
          },
        });
        localStorage.setItem(
          'POSTNEWS',
          JSON.stringify({
            ...newsHackerPost,
            hits: [...res.hits],
          })
        );
        localStorage.setItem('SELECTNEWS', JSON.stringify(e.target.value));
        dispatch({
          type: types.getNewsPagination,
          payload: [0, 8],
        });
      });
    }
    sendData({ getTecnologi, indexFocus });
  };
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

export default CustomSelect;
