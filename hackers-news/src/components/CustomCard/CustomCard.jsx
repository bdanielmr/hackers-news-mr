/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './customCard.module.scss';
import Moment from 'react-moment';
const CustomCard = ({ card }) => {
  const [showFav, setShowFav] = useState(true);
  const handleButtonFav = () => {
    setShowFav(!showFav);
  };

  return (
    <a className={styles['custom-card']}>
      <article>
        <p>
          <span className={styles['time-icon']}></span>
          <a>
            {
              <Moment fromNow ago>
                {card.created_at}
              </Moment>
            }
          </a>
        </p>
        <h3>{card.story_title}</h3>
      </article>
      <button className={styles['custom-car-buttom']} onClick={handleButtonFav}>
        {showFav ? (
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
    </a>
  );
};

CustomCard.propTypes = {
  card: PropTypes.object,
};

export default CustomCard;
