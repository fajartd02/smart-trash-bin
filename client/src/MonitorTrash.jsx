import './Trash.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Badge from 'react-bootstrap/Badge';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function MonitorTrash() {
  const [distance, setDistance] = useState("0");
  const [text, setText] = useState("");

  useInterval(async () => {
    const response = await axios.get("http://localhost:5000/range/last");
    const { range } = response.data;
    let distanceFloat = Number(range);
    console.log("distance float 1: " + distanceFloat);
    if (distanceFloat >= 15) {
        distanceFloat = 15;
    }
    const percent = (15 - distanceFloat) * 100 / 15;
    setDistance(percent);
    console.log("distance float 2: " + distanceFloat);
    console.log("percent: " + percent);
    console.log("distance: " + distance);
    if (percent >= 60) {
      setText("Full");
    } else {
      setText("");
    }
  }, 100);

  return (
    <div className='container text-center mt-5'>
      <h1>
        Monitor <Badge bg="primary">Trash</Badge>
      </h1>
      <h1 style={{marginTop: '5%'}}>
        {distance} %
      </h1>
      {text === 'Full' && <h1>
        <Badge bg="danger" style={{marginTop: '3%'}}>Full, Time to Pick Up!</Badge>
      </h1>}
    </div>
  );
}

export default MonitorTrash;
