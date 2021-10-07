/* eslint-disable prettier/prettier */
import HomeHackerNews from '../views/HomeHackerNews/HomeHackerNews';
import Error404 from '../views/Error404/Error404';

export default [
  {
    name: 'HomeSearchMovie',
    url: '/',
    path: '/',
    component: HomeHackerNews,
    exact: true,
  },
  {
    name: 'Error404',
    url: '/',
    path: '/',
    component: Error404,
    exact: false,
  },
];
