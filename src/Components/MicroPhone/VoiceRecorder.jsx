import React, { useState, useRef } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

function VoiceRecorder({setopenRejectDialog,openRejectDialog}) {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioRef = useRef(null);

  const handleRecord = () => {
    if (recording) {
      // Stop recording
      mediaRecorderRef.current.stop();
      mediaStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      setRecording(false);
    } else {
      // Check if an audio URL already exists and delete it
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
        setAudioURL("");
      }

      // Start recording
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        mediaStreamRef.current = stream;
        mediaRecorder.start();

        const chunks = [];
        mediaRecorder.addEventListener("dataavailable", (event) => {
          chunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(chunks, { type: "audio/wav" });
          const url = URL.createObjectURL(audioBlob);
          setAudioURL(url);
        });

        setRecording(true);
      });
    }
  };

  const handlePlay = () => {
    audioRef.current.play();
  };

  const handlePause = () => {
    audioRef.current.pause();
  };



  const handleClose = () => {
    setopenRejectDialog(false);
  };

  const handleReject = () => {
    // Handle rejection
    handleClose();
  };

  return (
    <div>
      <Dialog open={openRejectDialog} onClose={handleClose}>
        <DialogTitle>Record Audio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Click the button below to start recording audio.
          </DialogContentText>
          <Box m={2}>
            <IconButton onClick={handleRecord}>
              {recording ? <MicOffIcon color="error" /> : <MicIcon />}
            </IconButton>
          </Box>
          {audioURL && (
            <div>
              <audio ref={audioRef}>
                <source src={audioURL} type="audio/wav" />
              </audio>
              <div className="custom-audio-controls">
                <button onClick={handlePlay}>Play</button>
                <button onClick={handlePause}>Pause</button>
              </div>
              <button onClick={() => setAudioURL("")}>Remove Recording</button>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleReject}>Reject</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default VoiceRecorder;