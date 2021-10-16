/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './customButton.module.scss';
import { useRouteMatch, useParams, Link } from 'react-router-dom';
const CustomButton = (props) => {
  const match = useRouteMatch();
  const gParam = useParams();
  /**
   * component button thats contain tab to router to home or favorite roturer
   */
  return (
    <div className={styles['custom-button']}>
      <Link style={{ padding: '0px 0px' }} to="/">
        <a
          style={{
            height: '31px',
            width: '98px',
            color: match?.path === '/' ? '#1797ff' : '#606060',
            borderTop:
              match?.path === '/' ? '1px solid #1797ff' : '1px solid #606060',
            borderBottom:
              match?.path === '/' ? '1px solid #1797ff' : '1px solid #606060',
            borderLeft:
              match?.path === '/' ? '1px solid #1797ff' : '1px solid #606060',
          }}
          className={styles['custom-button-home']}
        >
          All
        </a>
      </Link>
      <Link style={{ padding: '0px 0px' }} to="/favorite">
        <a
          style={{
            color: match?.path === '/favorite' ? '#1797ff' : '#606060',
            borderTop:
              match?.path === '/favorite'
                ? '1px solid #1797ff'
                : '1px solid #606060',
            borderBottom:
              match?.path === '/favorite'
                ? '1px solid #1797ff'
                : '1px solid #606060',
            borderRight:
              match?.path === '/favorite'
                ? '1px solid #1797ff'
                : '1px solid #606060',
          }}
          className={styles['custom-button-favorite']}
        >
          My Faves
        </a>
      </Link>
    </div>
  );
};

CustomButton.propTypes = {};

export default CustomButton;
