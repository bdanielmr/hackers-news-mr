/* eslint-disable no-unused-expressions */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import React, { memo, useContext, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StoreContext } from '../../store/StoreProvider';
import { types } from '../../store/storeReducer';
import styles from './customPagination.module.scss';
const CustomPagination = memo(({ start, end, pagina = 'index1' }) => {
  const descRef = useRef();
  const [store, dispatch] = useContext(StoreContext);
  const { newsPagination } = store;
  const [colorFocus, setColorFocus] = useState(pagina);
  const [putResPage, setPutResPage] = useState(start);
  console.log('newsPagination 2', newsPagination);
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
  const updateListMovies = (res, component, find) => {
    dispatch({
      type: types.getTrendingMoviesSuccess,
      payload: res.results,
      allPayload: { ...res, component, find },
    });
  };
  const handleFocus = (e, id) => {
    setColorFocus(id);
    console.log('ver este e', e.target.value);
    setPutResPage(Number(e.target.value));
    dispatch({
      type: types.getNewsPagination,
      payload: [Number(e.target.value - 1) * 8, Number(e.target.value) * 8],
    });
  };
  const handleBlur = (e, id) => {};
  useEffect(() => {
    setColorFocus('index1');
    setPutResPage(1);
  }, [end]);
  return (
    <>
      {end > 1 && (
        <>
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
                        color: 'black',
                        border: colorFocus === ID ? '1px solid black' : '',
                        width: colorFocus === ID ? '30px' : '30px',
                        height: colorFocus === ID ? '30px' : '30px',
                        background:
                          colorFocus === ID
                            ? 'linear-gradient(to right, #1ed5a9 0%, #01b4e4 100%)'
                            : '',
                        borderRadius: colorFocus === ID ? '50%' : '',
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
        </>
      )}
    </>
  );
});

CustomPagination.propTypes = {
  start: PropTypes.number,
  end: PropTypes.number,
  pagina: PropTypes.string,
};

export default CustomPagination;
