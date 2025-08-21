/**
 * Conditional Persistence Middleware
 * Prevents local storage initialization for authentication reducers when user is anonymous
 * @module middleware/conditionalPersistenceMiddleware
 */

const CONDITIONAL_REDUCERS = ['authomaticRedirect', 'oidcLogout', 'oidcRedirect'];

const isUserAuthenticated = (state) => {
  return !!(state?.userSession?.token || state?.users?.user?.token || state?.users?.user?.id || state?.userSession?.user?.id);
};

/**
 * Removes auth reducer data from local storage for anonymous users
 */
const preventAnonymousLocalStorage = () => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  try {
    CONDITIONAL_REDUCERS.forEach((reducerName) => {
      const key = `redux_localstorage_simple_${reducerName}`;
      if (window.localStorage.getItem(key)) {
        window.localStorage.removeItem(key);
      }
    });
  } catch (error) {}
};

/**
 * Manages conditional persistence of auth reducers in local storage
 */
const conditionalPersistenceMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  const isAuthenticated = isUserAuthenticated(state);

  // Clean up local storage for anonymous users after every action
  if (!isAuthenticated) {
    preventAnonymousLocalStorage();
  }

  return result;
};

export default conditionalPersistenceMiddleware;
