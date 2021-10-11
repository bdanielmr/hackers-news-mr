/* eslint-disable no-case-declarations */
const types = {
  getTrendingMoviesSuccess: 'get - trending - movies - success',
  getTrendingMoviesError: 'get - trending - movies - error',
  getSearchMovies: 'get - search - movies',
  getPaginaMovie: 'get - pagina - movie',
  getInfoMovie: 'get - info - movie',
  getNewPosts: 'get-new-posts',
  getNewsPagination: 'get-news-pagination',
};

const initialStore = {
  movie: {},
  listMovies: [],
  listMoviesLoading: false,
  listMoviesError: [],
  paginationList: null,
  infoMovie: {},
  newsHackerPost: [],
  newsPagination: [0, 8],
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case types.getNewPosts:
      return {
        ...state,
        newsHackerPost: action.payload,
      };
    case types.getNewsPagination:
      return {
        ...state,
        newsPagination: action.payload,
      };
    case types.getTrendingMoviesSuccess:
      return {
        ...state,
        listMovies: action.payload,
        paginationList: action.allPayload,
      };
    case types.getTrendingMoviesError:
      return {
        ...state,
        listMoviesError: action.payload,
      };
    case types.getPaginaMovie:
      return {
        ...state,
        listMovies: action.payload,
      };
    case types.getInfoMovie:
      return {
        ...state,
        infoMovie: action.payload,
      };
    case types.getSearchMovies:
      return {
        ...state,
        listMovies: action.payload,
      };
    default:
      return state;
  }
};

export { initialStore, types };
export default storeReducer;
