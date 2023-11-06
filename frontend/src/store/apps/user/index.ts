// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

// ** Axios Imports
// import axios from 'axios'
import { axiosInstance as axios } from 'src/configs/axios'

interface DataParams {
  q: string
  role: string
  createdAtInit: any
  createdAtEnd: any
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Users
export const fetchData = createAsyncThunk('appUsers/fetchData', async (params: DataParams) => {
  const response = await axios.get('/user/find-custom', {
    params
  })

  return response.data
})

// ** Add User
export const addUser = createAsyncThunk(
  'appUsers/addUser',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    let response = { data: null }

    try {
      response = await axios.post('/user', {
        ...data
      })
      toast.success(`Usuário foi criado com sucesso`)
    } catch (error: any) {
      dispatch(handleSetError(error?.response?.data ? error?.response?.data : false))
    }

    dispatch(fetchData(getState().user.params))

    return response.data
  }
)

// ** Delete User
export const deleteUser = createAsyncThunk(
  'appUsers/deleteUser',
  async (id: number | string, { getState, dispatch }: Redux) => {
    let response = { data: null }

    try {
      response = await axios.delete(`/user/${id}`)
      toast.success(`Usuário id=${id} foi deletado com sucesso`)
    } catch (error: any) {
      toast.error(`Houve, erro ao deletar usuário id=${id}! \n ${error?.message}`)
    }

    dispatch(fetchData(getState().user.params))

    return response.data
  }
)

// ** Set Errors User
export const handleSetError = createAsyncThunk('appUsers/errors', async (data: any) => {
  return data
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    errors: false as any
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.users
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
    builder.addCase(handleSetError.fulfilled, (state, action) => {
      state.errors = action.payload
    })
  }
})

// export const { handleSetError } = appUsersSlice.actions

export default appUsersSlice.reducer
