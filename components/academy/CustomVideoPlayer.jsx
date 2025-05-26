// components/CustomVideoPlayer.js
import { FastForward, Pause, Play, Rewind } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

const formatTime = (time) => {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const CustomVideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const video = videoRef.current;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video.paused || video.ended) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const skip = (seconds) => {
    const video = videoRef.current;
    video.currentTime += seconds;
  };

  const handleProgressClick = (e) => {
    const video = videoRef.current;
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * video.duration;
    video.currentTime = newTime;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    const video = videoRef.current;
    video.volume = newVolume;
    setVolume(newVolume);
  };

  const toggleFullscreen = () => {
    const container = videoRef.current.parentElement;
    if (!document.fullscreenElement) {
      container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-black rounded-2xl overflow-hidden shadow-lg">
      <video
        ref={videoRef}
        autoPlay={false}
        muted={false}
        src={src}
        loop
        playsInline
        className="w-full h-auto bg-black rounded-2xl"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-md text-white">
        {/* Progress Bar */}
        <div
          className="w-full h-2 bg-gray-600 rounded-full cursor-pointer mb-3"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
          {/* Left Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => skip(-10)}
              className="bg-white/20 px-3 py-2 rounded-lg hover:bg-primary transition"
            >
              <Rewind />
            </button>
            <button
              onClick={togglePlayPause}
              className="bg-white/20 px-4 py-2 rounded-lg font-semibold hover:bg-primary transition"
            >
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <button
              onClick={() => skip(10)}
              className="bg-white/20 px-3 py-2 rounded-lg hover:bg-primary transition"
            >
              <FastForward />
            </button>
            <span className="ml-2 text-gray-300">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Volume */}
            {/* <div className="flex items-center gap-2">
              <span>🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 h-1 bg-primary"
              />
            </div> */}

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="bg-transparent text-white px-3 py-2 hover:text-primary transition"
            >
              {isFullscreen ? "🗕 Exit Fullscreen" : "🗖 Fullscreen"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
