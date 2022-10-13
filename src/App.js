import React from 'react'
import { Grid } from 'semantic-ui-react'
import Painel from './components/painel'
import Elevador from './components/elevador';

function App() {
  document.title = 'Elevador'

  return (
    <Grid textAlign='center' divided='vertically' verticalAlign='middle' >

      <Grid.Row>
        <Grid.Column color='black'> <h1>Elevador</h1> </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={2} color='grey' >

        <Grid.Column computer={6} mobile={10} tablet={10}>
          <Elevador />
        </Grid.Column>

        <Grid.Column computer={1} mobile={1} tablet={1}>
          <Painel />
        </Grid.Column>

      </Grid.Row>

    </Grid>
  );
}

export default App;