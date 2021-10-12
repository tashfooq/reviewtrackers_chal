import React, { useEffect, useState } from 'react';
import ReviewCard from './components/ReviewCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [data, setData] = useState([]);

  const getData = () => {
    fetch('reviews.json'
    ,{
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(myJson => {
      setData(myJson)
    });
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      {data && data.length > 0 && <ReviewCard reviews={data} />}
    </div>
  );
}

export default App;
