import styled from '@emotion/styled'
import Rig from './Rig';
import uniqid from 'uniqid';

const Container = styled.div`
  display:flex;
  flex-direction: column;
  margin-top: 20px;
  justify-content: center;
  width: 100%;
`

function Rigs(props) {
  const rigData = props.data.rigData
  const rigs = rigData?.miningRigs.map((rig) => {
    const profitability = (rig?.profitability * props?.data?.btcPrice)?.toFixed(2)?.toLocaleString("en-US")
    const data = {
      profitability,
      rig,
    }
    return (<Rig key={`${uniqid()}`} {...data}/>)
  })
  
  return (
    <Container >
      {rigs}
    </Container>
  );
}

export default Rigs;
