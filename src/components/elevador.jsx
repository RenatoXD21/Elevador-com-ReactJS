import { Image, Icon, Grid } from 'semantic-ui-react'
import saguao from '../assets/saguao.jpg'
import metal from '../assets/metal.jpg'
import corredor from '../assets/corredor.jpg'
import { useSelector } from 'react-redux'

const Abertura = (props) => {

    const porta = useSelector((state) => state.elevador.porta)

    return (
        <Image src={metal} height="100%" width={porta === 'aberta' ? '10%' : '50%'} style={{ float: props.side, transition: '0.5s' }} />
    )
}

export default function Elevador() {

    const andar = useSelector((state) => state.elevador.andar)
    const direcao = useSelector((state) => state.elevador.direcao)
    const plano = andar === 0 ? saguao : corredor

    return (
        <Grid>
            <Grid.Row columns={3} textAlign='center' color='black'>
                <Grid.Column>
                    <Icon name='angle double down' size='big' disabled={direcao !== 'descendo'} color={direcao === 'descendo' ? 'green' : 'grey'} />
                </Grid.Column>

                <Grid.Column>
                    <h3>{andar}</h3>
                </Grid.Column>

                <Grid.Column>
                    <Icon name='angle double up' size='big' disabled={direcao !== 'subindo'} color={direcao === 'subindo' ? 'green' : 'grey'} />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row >
                <div style={{ backgroundImage: `url(${plano})`, backgroundSize: '100% 100%', width: '100%', height: '480px' }}>
                    <Abertura side='right' />
                    <Abertura side='left' />
                </div>
            </Grid.Row>
        </Grid>
    )
}