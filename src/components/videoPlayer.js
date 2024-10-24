import React, { useState, useRef } from "react"
import ReactPlayer from "react-player"
import Control from "./control"
import { formatTime } from "../utils/formatTime"
import full from "../images/fullScreen.svg"
import small from "../images/smallScreen.svg"
import screenfull from "screenfull"
import useWindowSize from "../utils/useWindowSize"
import * as styles from "./videoPlayer.module.css"

let count = 0

const VideoPlayer = ({ video, videoId }) => {
  const videoPlayerRef = useRef(null)
  const controlRef = useRef(null)
  const fullScreenRef = useRef(null)
  const elementRef = useRef(null)

  const [videoState, setVideoState] = useState({
    playing: false,
    muted: true,
    volume: 0,
    playbackRate: 1.0,
    played: 0,
    playsinline: true,
    seeking: false,
  })

  const [fullScreenState, setFullScreenState] = useState(false)

  const { width, height } = useWindowSize()
  const isMobile = height > width ? width < 769 : width < 900

  //Destructuring the properties from the videoState
  const { playing, muted, volume, playbackRate, played, seeking } = videoState

  const currentTime = videoPlayerRef.current
    ? videoPlayerRef.current.getCurrentTime()
    : "00:00"
  const duration = videoPlayerRef.current
    ? videoPlayerRef.current.getDuration()
    : "00:00"

  const formatCurrentTime = formatTime(currentTime)
  const formatDuration = formatTime(duration)

  const playPauseHandler = () => {
    //plays and pause the video (toggling)
    setVideoState({ ...videoState, playing: !videoState.playing })
  }

  const rewindHandler = () => {
    //Rewinds the video player reducing 5
    if (videoPlayerRef.current.getCurrentTime() > 5) {
      videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() - 5)
    } else {
      videoPlayerRef.current.seekTo(0)
    }
  }

  const handleFastFoward = () => {
    //FastFowards the video player by adding 5
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() + 5)
  }

  const progressHandler = state => {
    if (count > 20) {
      controlRef.current.style.visibility = "hidden"
      fullScreenRef.current.style.visibility = "hidden" // toggling player control container
    } else {
      count += 1
    }

    if (!seeking) {
      setVideoState({ ...videoState, ...state })
    }
  }

  const seekHandler = (e, value) => {
    setVideoState({ ...videoState, played: parseFloat(value / 100) })
    videoPlayerRef.current.seekTo(parseFloat(value / 100))
  }

  const seekMouseUpHandler = (e, value) => {
    setVideoState({ ...videoState, seeking: false })
    videoPlayerRef.current.seekTo(value / 100)
  }

  const volumeChangeHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: Number(newVolume) === 0 ? true : false, // volume === 0 then muted
    })
  }

  const volumeSeekUpHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: newVolume === 0 ? true : false,
    })
  }

  const muteHandler = () => {
    //Mutes the video player
    setVideoState({ ...videoState, muted: !videoState.muted })
  }

  const onSeekMouseDownHandler = e => {
    setVideoState({ ...videoState, seeking: true })
  }

  const mouseMoveHandler = () => {
    controlRef.current.style.visibility = "visible"
    fullScreenRef.current.style.visibility = "visible"
    count = 0
  }

  const handleClickFullscreen = () => {
    if (!fullScreenState && !isMobile && screenfull.isEnabled) {
      screenfull.request(document.getElementById(videoId))
      setFullScreenState(true)
    } else if (isMobile && !fullScreenState && screenfull.isEnabled) {
      const videoDiv = document.getElementById(videoId)
      screenfull.request(videoDiv.getElementsByTagName("iframe")[0])
      setFullScreenState(true)
    } else {
      document.exitFullscreen()
      setFullScreenState(false)
    }
  }

  return (
    <div className={styles.videoPlayerContainer}>
      <div
        className={styles.videoPlayer}
        id={videoId}
        onMouseMove={isMobile ? null : mouseMoveHandler}
        key={isMobile}
        ref={elementRef}
      >
        <ReactPlayer
          url={video}
          ref={videoPlayerRef}
          width={"100%"}
          height={"100%"}
          className={styles.videoPlayerVideo}
          progressInterval={100}
          controls={isMobile}
          playing={playing}
          playsinline
          onPlay={() => setVideoState({ ...videoState, playing: true })}
          onPause={() => setVideoState({ ...videoState, playing: false })}
          volume={volume}
          muted={muted}
          onProgress={isMobile ? () => void 0 : progressHandler}
          onEnded={() => videoPlayerRef.current.seekTo(0)}
          config={{
            youtube: {
              playerVars: { showinfo: 0 },
            },
          }}
        ></ReactPlayer>
        {!isMobile && (
          <Control
            ref={controlRef}
            onPlayPause={playPauseHandler}
            playing={playing}
            onRewind={rewindHandler}
            onForward={handleFastFoward}
            played={played}
            onSeek={seekHandler}
            onSeekMouseUp={seekMouseUpHandler}
            volume={volume}
            onVolumeChangeHandler={volumeChangeHandler}
            onVolumeSeekUp={volumeSeekUpHandler}
            mute={muted}
            onMute={muteHandler}
            playRate={playbackRate}
            duration={formatDuration}
            currentTime={formatCurrentTime}
            onMouseSeekDown={onSeekMouseDownHandler}
          ></Control>
        )}
        {!isMobile && (
          <div
            className={styles.fullScreenBtn}
            ref={fullScreenRef}
            onClick={handleClickFullscreen}
          >
            <img src={fullScreenState ? small : full} alt="full screen"></img>
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoPlayer
