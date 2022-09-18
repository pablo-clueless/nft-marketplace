import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { NftType } from '../../types'

interface INft {
    nfts: Array<NftType>
    favorites: Array<NftType>
    watchlist: Array<NftType>
    isLoading: boolean
    error?: any
}

const url = import.meta.env.VITE_URL
const initialState = {
    nfts: [],
    favorites: [],
    watchlist: [],
    isLoading: false,
    error: null
} as INft

export const getAllNfts = createAsyncThunk('/getAllNfts', async(_, thunkAPI) => {
    try {
        const response = await fetch(`${url}/nft/get`)
        const data = await response.json()
        return data.nfts
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const nftSlice = createSlice({
    name: 'nfts',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        addToFavorite: (state, action: PayloadAction<any>) => {
            const id = action.payload
            let isFavorite = state.favorites.find(item => item === id)
            if(!isFavorite) {
                state.favorites.push(id)
            } else return
        },
        removeFromFavorite: (state, action: PayloadAction<any>) => {
            const id = action.payload
            state.favorites = state.favorites.filter(item => item !== id)
        },
        addToWatchlist: (state, action: PayloadAction<any>) => {
            const id = action.payload
            let isWatched = state.watchlist.find(item => item === id)
            if(!isWatched) {
                state.watchlist.push(id)
            } else return
        },
        removeFromWatchlist: (state, action: PayloadAction<any>) => {
            const id = action.payload
            state.watchlist = state.watchlist.filter(item => item !== id)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllNfts.pending, (state) => {
            state.isLoading = true
        }),
        builder.addCase(getAllNfts.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.nfts = action.payload
        }),
        builder.addCase(getAllNfts.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.error = action.payload
        })
    },
})

export const { addToFavorite, addToWatchlist, clearError, removeFromFavorite, removeFromWatchlist } = nftSlice.actions
export default nftSlice.reducer