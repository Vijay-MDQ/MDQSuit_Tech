import React, {useState} from 'react'
import AudioAnalyser from "react-audio-analyser";
import {Box,Button,Card,Grid,TextField,Typography, Container } from "@mui/material";

function RecorderAudio() {
  const [stat, setStat] = useState();
  const [audiotype, setAudiotype] = useState("audio/wav");
  const [audiosrc, setAudiosrc] = useState();

  function controlAudio(status) {
    setStat(status);
  }

  function changeScheme(e) {
    setAudiotype(e.target.value);
  }

  const audioProps = {
    status: stat,
    audioType: audiotype,
    audioSrc: audiosrc,
    timeslice: 1000, 
    startCallback: (e) => {
      console.log("succ start", e);
    },
    pauseCallback: (e) => {
      console.log("succ pause", e);
    },
    stopCallback: (e) => {
      setAudiosrc(window.URL.createObjectURL(e));
      console.log("succ stop", e);
    },
    onRecordCallback: (e) => {
      console.log("recording", e);
    },
    errorCallback: (err) => {
      console.log("error", err);
    },
    width: 80,
    height: 30,
    backgroundColor: "red"
  };
  return (
    <div>
      <AudioAnalyser {...audioProps}>
          <Button className="btn" onClick={() => controlAudio("recording")}>
            Start
          </Button>
          <Button className="btn" onClick={() => controlAudio("paused")}>
            Pause
          </Button>
          <button className="btn" onClick={() => controlAudio("inactive")}>
            
          </button>
          <button className="btn" onClick={() => console.log(AudioAnalyser)}>
            Log
          </button>
      </AudioAnalyser>
      <p>choose output type</p>
      <select name="" id="" onChange={(e) => changeScheme(e)} value={audiotype}>
        <option value="audio/webm">audio/webm（default）</option>
        <option value="audio/wav">audio/wav</option>
        <option value="audio/mp3">audio/mp3</option>
      </select>
    </div>
  );
}

export default RecorderAudio;


