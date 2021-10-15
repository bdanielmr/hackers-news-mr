/* eslint-disable no-case-declarations */
const types = {
  getNewPosts: 'get-new-posts',
  getNewsPagination: 'get-news-pagination',
  getPostAngular: 'get-post-angular',
  getPostReact: 'get-post-react',
  getPostVue: 'get-post-vue',
  postLocalPost: 'post-local-post',
  postLocalPostAngular: 'post-local-post-angular',
  postLocalPostReact: 'post-local-post-react',
  postLocalPostVue: 'post-local-post-vue',
  editLocalPostAngular: 'edit-local-post-angular',
  editLocalPostReact: 'edit-local-post-react',
  editLocalPostVue: 'edit-local-post-vue',
  editLocalSelect: 'edit-local-select',
};

const initialStore = {
  newsHackerPost: [],
  newsPagination: [0, 8],
  hackerPostAngular: [],
  hackerPostReact: [],
  hackerPostVue: [],
  localPost: JSON.parse(localStorage.getItem('POSTNEWS')),
  localSelect: JSON.parse(localStorage.getItem('SELECTNEWS')),
  selectInput: false,
  localPostAngular: JSON.parse(localStorage.getItem('ANGULARLOCALFAVORITE')),
  localPostReact: JSON.parse(localStorage.getItem('REACTLOCALFAVORITE')),
  localPostVue: JSON.parse(localStorage.getItem('VUELOCALFAVORITE')),
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
    case types.postLocalPost:
      return {
        ...state,
        localPost: action.payload,
      };
    case types.postLocalPostAngular:
      return {
        ...state,
        hackerPostAngular: action.payload,
      };
    case types.postLocalPostReact:
      return {
        ...state,
        hackerPosReact: action.payload,
      };
    case types.postLocalPostVue:
      return {
        ...state,
        postLocalPostVue: action.payload,
      };
    case types.editLocalPostAngular:
      return {
        ...state,
        localPostAngular: action.payload,
      };
    case types.editLocalPostReact:
      return {
        ...state,
        localPostReact: action.payload,
      };
    case types.editLocalPostVue:
      return {
        ...state,
        localPostVue: action.payload,
      };
    case types.editLocalSelect:
      return {
        ...state,
        localSelect: action.payload,
      };

    default:
      return state;
  }
};

export { initialStore, types };
export default storeReducer;
