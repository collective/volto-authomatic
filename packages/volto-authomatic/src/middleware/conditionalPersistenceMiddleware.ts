/**
 * Conditional Persistence Middleware
 * 
 * This middleware prevents unnecessary local storage (Redux persist) 
 * initialization for authentication reducers when the user is anonymous.
 * This improves performance and GDPR compliance by reducing localStorage usage.
 */

interface User {
  id?: string;
  username?: string;
}

interface AuthState {
  user?: User;
  login?: {
    loaded: boolean;
  };
}

interface RootState {
  userSession?: AuthState;
}

/**
 * Check if user is authenticated
 */
function isUserAuthenticated(state: RootState): boolean {
  const userSession = state.userSession;
  return !!(
    userSession?.user?.id || 
    userSession?.user?.username || 
    userSession?.login?.loaded
  );
}

/**
 * Remove authentication reducer data from localStorage if user is anonymous
 */
function removeAuthReducerDataFromStorage(): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    const persistKey = 'persist:root';
    try {
      const persistedState = localStorage.getItem(persistKey);
      if (persistedState) {
        const parsedState = JSON.parse(persistedState);
        
        // Remove authentication-related reducers for anonymous users
        delete parsedState.authomaticRedirect;
        delete parsedState.oidcLogout;
        delete parsedState.oidcRedirect;
        
        localStorage.setItem(persistKey, JSON.stringify(parsedState));
      }
    } catch (error) {
      // Silently handle localStorage errors
    }
  }
}

/**
 * Middleware to conditionally handle persistence for authentication reducers
 */
export const conditionalPersistenceMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  const state = store.getState() as RootState;
  
  // If user is not authenticated, remove auth reducer data from localStorage
  if (!isUserAuthenticated(state)) {
    removeAuthReducerDataFromStorage();
  }
  
  return result;
};

export default conditionalPersistenceMiddleware;