/* eslint-disable prettier/prettier */
export const reducer = (prevState, action) => {
  switch (action.type) {
    case 'GET_TASK':
      return {
        ...prevState,
        dataTask: action.tasks,
        isLoading: false,
        isReady: true,
      };
    case 'ADD_TASK':
      return {
        ...prevState,
        dataTask: action.addTask,
        isLoading: false,
      };
    case 'CHANGE_TASK':
      return {
        ...prevState,
        dataTask: action.changeTask,
        isLoading: false,
      };
    case 'DELETE_TASK':
      return {
        ...prevState,
        dataTask: action.delTask,
        isLoading: false,
      };
    case 'GET_POST':
      return {
        ...prevState,
        dataPost: action.posts,
        isLoading: false,
        isReady: true,
      };
    case 'ADD_POST':
      return {
        ...prevState,
        dataPost: action.addPost,
        isLoading: false,
      };
    case 'GET_FORECAST':
      return {
        ...prevState,
        dataForecast: action.forecasts,
        isLoading: false,
      };
    case 'GET_CURRENT':
      return {
        ...prevState,
        dataCurrent: action.current,
        isLoading: false,
      };
    case 'GET_DAILY':
      return {
        ...prevState,
        dataDaily: action.daily,
        isLoading: false,
      };
    case 'GET_GEOLOCATION':
      return {
        ...prevState,
        dataGeolocation: action.geolocation,
        isLoading: false,
        isReady: true,
      };
  }
};

export const initialState = {
  isLoading: true,
  isReady: false,
  dataTask: null,
  dataPost: null,
  dataForecast: null,
  dataCurrent: null,
  dataDaily: null,
  dataGeolocation: null,
};
