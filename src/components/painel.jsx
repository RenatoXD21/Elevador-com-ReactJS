import { Button, List } from "semantic-ui-react";
import { useSelector, useDispatch } from 'react-redux'
import { ativarAndar, desativarAndar } from "../redux/slicers/andares.Slicer";
import { alterarPorta, alterarDirecao, alterarAndar } from "../redux/slicers/elevadorSlice";
import { useRef } from "react";

export default function Painel() {

    const dispatch = useDispatch()

    const chamadas = useSelector((state) => state.andares.chamadas)

    const chamadasRef = useRef(chamadas)
    chamadasRef.current = chamadas

    const elevador = useSelector((state) => state.elevador)

    const elevadorRef = useRef(elevador)
    elevadorRef.current = elevador

    const movimentacao = async (elevador, chamadas, andarChamado) => {

        let chamadaEmcima = false
        let chamadaEmbaixo = false

        if (elevador.direcao === 'parado' && andarChamado !== undefined) {
            dispatch(alterarPorta('fechada'))

            dispatch(alterarDirecao(elevador.andar < andarChamado ? 'subindo' : 'descendo'))
        }
        else if (elevador.direcao !== 'parado' && andarChamado === undefined) {
            let novoAndar
            if (elevador.direcao === 'subindo') novoAndar = elevador.andar + 1
            else novoAndar = elevador.andar - 1

            dispatch(alterarAndar(novoAndar))

            chamadas.forEach((valor, andar) => {
                if (valor) {
                    if (andar < novoAndar) chamadaEmbaixo = true
                    else if (andar > novoAndar) chamadaEmcima = true
                }
            })

            if (chamadas[novoAndar] === true) {
                dispatch(alterarPorta('aberta'))

                dispatch(desativarAndar(novoAndar))

                if (chamadaEmcima || chamadaEmbaixo) setTimeout(() => dispatch(alterarPorta('fechada')), 1000)

                if (chamadaEmbaixo && elevador.direcao !== 'descendo' && !chamadaEmcima) dispatch(alterarDirecao('descendo'))
                else if (chamadaEmcima && elevador.direcao !== 'subindo' && !chamadaEmbaixo) dispatch(alterarDirecao('subindo'))
                else if (!chamadaEmbaixo && !chamadaEmcima) dispatch(alterarDirecao('parado'))
            }
        }

        if ((elevador.direcao !== 'parado' && (chamadaEmbaixo || chamadaEmcima)) || (elevador.direcao === 'parado' && andarChamado !== undefined))
            setTimeout(() => movimentacao(elevadorRef.current, chamadasRef.current), 2000)
    }

    const chamarAndar = (andar) => {
        if (andar !== elevador.andar && chamadas[andar] === false) {
            dispatch(ativarAndar(andar))

            if (elevador.direcao === 'parado') movimentacao(elevadorRef.current, chamadasRef.current, andar)
        }
    }

    return (
        <List> {
            chamadas.map((chamado, andar) => (
                <List.Item key={andar}> {
                    chamado ?
                        <Button disabled color='black' onClick={() => chamarAndar(andar)}>
                            {andar}
                        </Button>
                        :
                        <Button disabled={elevador.andar === andar} onClick={() => chamarAndar(andar)}>
                            {andar}
                        </Button>
                } </List.Item>)
            ).reverse()
        } </List>
    )
}