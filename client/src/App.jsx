import { useEffect, useState } from 'react';
import './App.css'
import Graph from './components/Graph';
import serverService from './server/serverService';

function App() {

  const [countData, setCountData] = useState([]);
  const [maxCountValue, setMaxCountValue] = useState(0);
  const [countDataError, setCountDataError] = useState('');
  const [acvData, setAcvData] = useState([]);
  const [maxAcvValue, setMaxAcvValue] = useState(0);
  const [acvDataError, setAcvDataError] = useState('');

  const getCountData = async () => {
    await serverService.getCountData()
      .then((res) => {
        if (res.status == 200) {
          // console.log(res.data.data.data);
          setCountData(res.data.data.data);
          setMaxCountValue(res.data.data.maxCount);
          return;
        } else {
          setCountDataError(res.message);
          console.log(res);
        }
      })
  }

  const getAcvData = async () => {
    await serverService.getAcvData()
      .then((res) => {
        if (res.status == 200) {
          setAcvData(res.data.data.data);
          setMaxAcvValue(res.data.data.maxCount);
          return;
        } else {
          setAcvDataError(res.message);
          console.log(res);
        }
      })
  }
  useEffect(() => {
    getCountData();
    getAcvData();
  }, [])

  return (
    <div className="container">
      <div className="graph" id="graph1">
        {countData.length > 0 ? (
          <Graph data={countData} maxValue={maxCountValue} />
        ) : (
          <p>Loading Count Data...</p>
        )}
      </div>
      <div className="graph" id="graph2">
        {acvData.length > 0 ? (
          <Graph isAcv={true} data={acvData} maxValue={maxAcvValue} />
        ) : (
          <p>Loading ACV Data...</p>
        )}
      </div>
    </div>
  )

}

export default App
