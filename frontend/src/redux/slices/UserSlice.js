import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import usersJson from '../../data/users.json'

const mappedUsers = usersJson.map((user) => {
    return {
        ...user,
    }
})

// export const loginUser = createAsyncThunk(
//   "user/login",
//   async (values, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/auth/login",
//         values
//       );
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

export const registerUser = createAsyncThunk(
    'user/register',
    async (values, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/auth/register',
                values
            )
            return response.data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const followUser = createAsyncThunk(
    'user/follow',
    async (values, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/social/follow_user', values)
            return response.data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

const initialState = {
    data: null,
    isLoggedIn: false,
    message: null,
    isLoading: false,
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        loadUser: (state, action) => {
            const onid = action.payload
            let email = onid + '@oregonstate.edu'
            let user = mappedUsers.find((user) => user.email === email)
            state.data = user
        },
        loginUser: (state, action) => {
            state.data = action.payload
            state.isLoggedIn = true
            state.isLoading = false
            state.error = null
            state.message = null
        },
        logoutUser: (state) => {
            state.data = null
            state.isLoggedIn = false
            state.isLoading = false
            state.error = null
            state.message = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoggedIn = false
            state.message = action.payload.message
            state.isLoading = false
            state.error = null
        })
        builder.addCase(registerUser.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoggedIn = false
            state.message = action.payload.message
            state.isLoading = false
            state.error = 'Register Failed'
        })
    },
})

export const { setUser, loadUser, loginUser, logoutUser } = userSlice.actions
export default userSlice.reducer

export const selectUser = (state) => state.data

export const selectUserProfile = (action) => (state) => {
    const onid = action
    let email = onid + '@oregonstate.edu'
    let user = mappedUsers.find((user) => user.email === email)
    return user
}
