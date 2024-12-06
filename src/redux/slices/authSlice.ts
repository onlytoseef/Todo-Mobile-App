import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../../types/types';
import auth from '@react-native-firebase/auth';
import {AuthState} from '../../types/types';
import {UserData} from '../../types/types';
import ShowToast from '../../components/showToast';

const initialState: AuthState = {
  user: undefined,
  isLoggedIn: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUserSuccess(state, action: PayloadAction<UserData>) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    loginUserSuccess(state, action: PayloadAction<UserData>) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    logoutUserSuccess(state) {
      state.user = undefined;
      state.isLoggedIn = false;
      state.isLoading = false;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const {
  registerUserSuccess,
  loginUserSuccess,
  logoutUserSuccess,
  setIsLoading,
} = authSlice.actions;

// Define async action creators with ThunkAction
export const registerUser =
  (userData: UserData): ThunkAction<void, RootState, unknown, any> =>
  async dispatch => {
    dispatch(setIsLoading(true));
    const {fullName, email, password} = userData;

    if (!email || !password) {
      ShowToast('info', 'Please Enter Your Email or Password');
      dispatch(setIsLoading(false));
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      const user = userCredential.user;

      if (user) {
        dispatch(registerUserSuccess({email, password, fullName}));
        dispatch(setIsLoading(false));
      }
    } catch (error) {
      ShowToast('warning', 'There was an error registering user');
      console.error('Registration error:', error);
      dispatch(setIsLoading(false)); // Set isLoading to false in case of error
    }
  };

export const loginUser =
  (
    email: string,
    password: string,
  ): ThunkAction<void, RootState, unknown, any> =>
  async dispatch => {
    dispatch(setIsLoading(true));
    if (!email || !password) {
      ShowToast('info', 'Please enter your Email and Password ');
      dispatch(setIsLoading(false));
      return;
    }

    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;

      if (user) {
        dispatch(loginUserSuccess({email, password}));
        dispatch(setIsLoading(false));
      }
    } catch (error) {
      ShowToast('warning', 'Invalid Email or Password ');
      dispatch(setIsLoading(false)); // Set isLoading to false in case of error
    }
  };

export const logoutUser =
  (): ThunkAction<void, RootState, unknown, any> => async dispatch => {
    dispatch(setIsLoading(true));
    try {
      await auth().signOut();
      dispatch(logoutUserSuccess());
      console.log('User logged out successfully!');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export default authSlice.reducer;
