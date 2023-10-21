import { useState } from "react";
// @ts-ignore
import CoinsTable from "./components/CoinsTable";
import Container from "../node_modules/react-bootstrap/esm/Container";
import axios from "../node_modules/axios/index";
// @ts-ignore
import { useQuery } from 'react-query';
import Button from "../node_modules/react-bootstrap/esm/Button";

async function fetchCoins(skip = 0) {
  const {data} = await axios.get(`https://api.coinstats.app/public/v1/coins?skip=${skip}&limit=10`);
  return data.coins;
}

function App() {
  const [page, setPage] = useState(0);
  const {data, isLoading, isError} = useQuery(['coins', page], () => fetchCoins(page),
  {
    keepPreviousData: true,
    refetchOnWindowFocus: false
  }
  );


  if(isLoading) {
    return <h3>Loading...</h3>
  }

  if (isError) {
    return <h3>Error get!!!</h3>
  }

  if (!data) {
    return <h3>No data</h3>
  }

  return (
    <Container style={{marginTop: 30, maxWidth: 600}}>
      <CoinsTable data={data} />
      
      <Button onClick={() => setPage((p) => p - 10)} disabled={!page}>Prev</Button>
      <Button onClick={() => setPage((p) => p + 10)}>Next</Button>
    </Container>
  );
}

export default App;
