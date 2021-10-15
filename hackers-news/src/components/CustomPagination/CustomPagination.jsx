/* eslint-disable no-unused-expressions */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import React, { memo, useContext, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StoreContext } from '../../store/StoreProvider';
import { types } from '../../store/storeReducer';
import styles from './customPagination.module.scss';
import { useFetch } from '../../hooks/useFetch';
import { apiGetHackerNewsPage } from '../../utils/routes';

const CustomPagination = memo(({ tecno, start, end, pagina = 'index1' }) => {
  const descRef = useRef();
  const [store, dispatch] = useContext(StoreContext);
  const { newsPagination, newsHackerPost, localPost } = store;
  const [colorFocus, setColorFocus] = useState(pagina);
  const [putResPage, setPutResPage] = useState(start);

  const handleMorePage = () => {
    if (putResPage < end) {
      setPutResPage(putResPage + 1);
      dispatch({
        type: types.getNewsPagination,
        payload: [newsPagination[0] + 8, newsPagination[1] + 8],
      });
      handleFocus(
        { target: { value: putResPage + 1 } },
        `index${putResPage + 1}`
      );
    }
  };
  const handleMinusPage = () => {
    if (putResPage > 1) {
      setPutResPage(putResPage - 1);
      dispatch({
        type: types.getNewsPagination,
        payload: [newsPagination[0] - 8, newsPagination[1] - 8],
      });
      handleFocus(
        { target: { value: putResPage - 1 } },
        `index${putResPage - 1}`
      );
    }
  };

  const handleFocus = (e, id) => {
    setColorFocus(id);

    setPutResPage(Number(e.target.value));
    dispatch({
      type: types.getNewsPagination,
      payload: [Number(e.target.value - 1) * 8, Number(e.target.value) * 8],
    });

    if (Number(e.target.value) * 8 > localPost?.hits?.length) {
      apiGetHackerNewsPage({
        tecnologi: tecno,
        page: parseInt((e.target.value * 3) / 8),
      }).then((res) => {
        dispatch({
          type: types.getNewPosts,
          payload: {
            ...localPost,
            hits: [...localPost.hits, ...res?.hits],
          },
        });
        dispatch({
          type: types.postLocalPost,
          payload: {
            ...localPost,
            hits: [...localPost.hits, ...res?.hits],
          },
        });
        localStorage.setItem(
          'POSTNEWS',
          JSON.stringify({
            ...localPost,
            hits: [...localPost.hits, ...res?.hits],
          })
        );
      });
    }
  };
  const handleBlur = (e, id) => {};
  useEffect(() => {
    setColorFocus('index1');
    setPutResPage(1);
  }, [end]);
  return (
    <>
      {end > 1 && (
        <div className={styles['custom-pagination']}>
          <div
            className={styles['custom-pagination-arrow-body']}
            onClick={handleMinusPage}
          >
            <a className={styles['custom-pagination-arrow']}>{'<'}</a>
          </div>
          <div className={styles['custom-pagination-body']}>
            {Array.from(Array(end + 1).keys())
              .slice(
                putResPage <= 9 ? 1 : putResPage - 8,
                putResPage < 9 ? 10 : putResPage + 1
              )
              .map((pagination, i) => {
                const ID = 'index' + pagination;
                return (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '30px',
                      height: '30px',
                      margin: '0px 10px',
                    }}
                    key={i}
                  >
                    <input
                      type="text"
                      readOnly
                      ref={descRef}
                      key={ID}
                      style={{
                        textAlign: 'center',
                        color: colorFocus === ID ? 'white' : 'black',
                        border:
                          colorFocus === ID
                            ? '1px solid #d9d9d9'
                            : '1px solid #d9d9d9',
                        width: colorFocus === ID ? '30px' : '30px',
                        height: colorFocus === ID ? '30px' : '30px',
                        background: colorFocus === ID ? '#1890ff' : '',
                        borderRadius: colorFocus === ID ? '6px' : '6px',
                        cursor: 'pointer',
                      }}
                      onChange={() => console.log('onChange')}
                      onFocus={(e) => handleFocus(e, ID)}
                      onBlur={(e) => handleBlur(e, ID)}
                      value={pagination}
                    />
                  </div>
                );
              })}
          </div>
          <div
            className={styles['custom-pagination-arrow-body']}
            onClick={handleMorePage}
          >
            <a className={styles['custom-pagination-arrow']}>{'>'}</a>
          </div>
        </div>
      )}
    </>
  );
});

CustomPagination.propTypes = {
  start: PropTypes.number,
  end: PropTypes.number,
  pagina: PropTypes.string,
  tecno: PropTypes.string,
};

export default CustomPagination;
