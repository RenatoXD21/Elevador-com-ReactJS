import { createSlice } from "@reduxjs/toolkit";

export const elevadorSlice = createSlice({
    name: 'elevador',
    initialState: {
        andar: 0,
        direcao: 'parado',
        porta: 'aberta'
    },
    reducers: {
        alterarAndar: (state, action) => { state.andar = action.payload },
        alterarDirecao: (state, action) => { state.direcao = action.payload },
        alterarPorta: (state, action) => { state.porta = action.payload }
    }
})

export const { alterarAndar, alterarDirecao, alterarPorta } = elevadorSlice.actions

export default elevadorSlice.reducer