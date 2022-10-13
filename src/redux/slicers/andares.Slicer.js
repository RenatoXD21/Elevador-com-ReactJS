import { createSlice } from "@reduxjs/toolkit";

const numeroDeAndares = 6

const andares = quantidadeAndares => {
    let andares = []

    for (let andar = 0; andar < quantidadeAndares; andar++) andares.push(false)

    return andares
}

export const andaresSlice = createSlice({
    name: 'andares',
    initialState: {
        chamadas: andares(numeroDeAndares)
    },
    reducers: {
        ativarAndar: (state, action) => { state.chamadas[action.payload] = true },
        desativarAndar: (state, action) => { state.chamadas[action.payload] = false }
    }
})

export const { ativarAndar, desativarAndar } = andaresSlice.actions

export default andaresSlice.reducer