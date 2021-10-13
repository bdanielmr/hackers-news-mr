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
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import CustomButton from '../../components/CustomButton/CustomButton';

const HomeHackerNews = memo((props) => {
  const [getTecnologi, setGetTecnologi] = useState(
    localStorage?.SELECTNEWS
      ? JSON.parse(localStorage.getItem('SELECTNEWS'))
      : 'angular'
  );
  const [indexFocus, setIndexFocus] = useState('index1');
  const [store, dispatch] = useContext(StoreContext);
  const { newsHackerPost, newsPagination } = store;
  const { data: getNews } = useFetch(apiGetHackerNews, {
    tecnologi: getTecnologi,
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
  const reciveDataSeelect = (e) => {
    console.log('ver revidev data ', e);
  };
  useEffect(() => {
    if (newsHackerPost?.hits?.[0].objectID !== getNews?.hits?.[0].objectID) {
      getListMovies();
      localStorage.setItem('POSTNEWS', JSON.stringify(getNews));
      localStorage.setItem('SELECTNEWS', JSON.stringify(getTecnologi));
    }
  }, [getNews?.hits?.[0].objectID]);
  useEffect(() => {
    if (localStorage.POSTNEWS && !getNews.hits) {
      getListMoviesStorage();
    }
  }, [localStorage.POSTNEWS]);

  console.log('newsHackerPost getNews', getNews);
  return (
    <>
      <div className={styles.containerPagination}>
        <div className={styles.containeButton}>
          <CustomButton />
        </div>
        <div className={styles.containerSelect}>
          <CustomSelect
            getNews={getNews}
            sendData={reciveDataSeelect}
            sendUseState={{
              tecno: setGetTecnologi,
              focus: setIndexFocus,
              tecnoState: getTecnologi,
              focusState: indexFocus,
            }}
          />
        </div>
        <ul className={styles.container}>
          {!!newsHackerPost &&
            newsHackerPost?.hits
              ?.slice(newsPagination[0], newsPagination[1])
              .map((post, index) => {
                return (
                  <li key={index}>
                    <CustomCard key={index} card={post} fav={post.fav} />
                  </li>
                );
              })}
        </ul>

        <CustomPagination
          key={getTecnologi}
          pagina={indexFocus}
          tecno={getTecnologi}
          start={1}
          end={newsHackerPost.nbPages}
        />
      </div>
    </>
  );
});

HomeHackerNews.propTypes = {};

export default HomeHackerNews;
