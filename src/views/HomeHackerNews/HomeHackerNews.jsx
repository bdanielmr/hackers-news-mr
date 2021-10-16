/* eslint-disable node/handle-callback-err */
/* eslint-disable no-unused-expressions */
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

const HomeHackerNews = (props) => {
  const [getTecnologi, setGetTecnologi] = useState(
    localStorage?.SELECTNEWS
      ? JSON.parse(localStorage.getItem('SELECTNEWS'))
      : 'angular'
  );
  const [indexFocus, setIndexFocus] = useState('index1');
  const [store, dispatch] = useContext(StoreContext);
  const {
    newsHackerPost,
    newsPagination,
    localPost,
    localPostVue,
    localSelect,
  } = store;
  const [errorHome, setErrorHome] = useState(false);
  const getNews = {};
  const getApiHackerNews = () => {
    apiGetHackerNews({
      tecnologi: getTecnologi,
    })
      .then((post) => {
        dispatch({
          type: types.getNewPosts,
          payload: post,
        });
        localStorage.setItem('POSTNEWS', JSON.stringify(post));
        localStorage.setItem('SELECTNEWS', JSON.stringify(post?.query));
        dispatch({
          type: types.postLocalPost,
          payload: post,
        });
      })
      .catch((error) => {
        setErrorHome(true);
      });
  };
  const postHackeNews = (post) => {
    localStorage.setItem('SELECTNEWS', JSON.stringify(post?.query));
    if (post?.query === 'angular') {
      dispatch({
        type: types.getNewPosts,
        payload: post,
      });
      dispatch({
        type: types.postLocalPost,
        payload: post,
      });
      localStorage.setItem('ANGULARLOCALFAVORITE', JSON.stringify(post));
      dispatch({
        type: types.postLocalPostAngular,
        payload: post,
      });
    }
    if (post?.query === 'reactjs') {
      dispatch({
        type: types.getNewPosts,
        payload: post,
      });
      dispatch({
        type: types.postLocalPost,
        payload: post,
      });
      localStorage.setItem('REACTLOCALFAVORITE', JSON.stringify(post));
      dispatch({
        type: types.postLocalPostReact,
        payload: post,
      });
    }
    if (post?.query === 'vuejs') {
      dispatch({
        type: types.getNewPosts,
        payload: post,
      });
      dispatch({
        type: types.postLocalPost,
        payload: post,
      });
      localStorage.setItem('VUELOCALFAVORITE', JSON.stringify(post));
      dispatch({
        type: types.postLocalPostVue,
        payload: post,
      });
    }
  };

  useEffect(() => {
    if (!localPost) {
      localStorage.setItem('POSTNEWS', JSON.stringify({}));
    }
  }, []);

  useEffect(() => {
    localPost?.hits?.length > 0 ? postHackeNews(localPost) : getApiHackerNews();
  }, [localPost]);

  return (
    <>
      <div className={styles.containerPagination}>
        <div className={styles.containeButton}>
          <CustomButton />
        </div>
        <div className={styles.containerSelect}>
          <CustomSelect
            getNews={getNews}
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
                    <CustomCard key={index} card={post} fav={post?.fav} />
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
      {errorHome ? <p>error</p> : null}
    </>
  );
};

HomeHackerNews.propTypes = {};

export default memo(HomeHackerNews);
