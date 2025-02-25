import React from 'react'
import { useContext, useEffect } from 'react'
import { MyContext } from './RefContext/Context';
import { DirectionContext } from './RefContext/DirectionContext';

function CharacterAudio() {

    // const { audioRefs, getAudioRef, setAudioRef } = useContext(MyContext);
    const { audioRefs, getAudioRef, setAudioRef } = useContext(DirectionContext);
    // audio/runningAudio.mp3

    // return the audioRefs 
    useEffect(() => {
        setAudioRef('audio/runningAudio.mp3', React.createRef());
        setAudioRef('audio/collectBottle.mp3', React.createRef());
        setAudioRef('audio/powerup1.mp3', React.createRef());
        setAudioRef('audio/powerup2.mp3', React.createRef());
        setAudioRef('audio/running.mp3', React.createRef());
        setAudioRef('audio/hit.mp3', React.createRef());
        setAudioRef('audio/collected.mp3', React.createRef());
        setAudioRef('audio/levelFinished.mp3', React.createRef());
        setAudioRef('audio/bgMusic.mp3', React.createRef());
        setAudioRef('audio/thumsuPbgMusic.mp3', React.createRef());
        setAudioRef('audio/jump.mp3', React.createRef());
        setAudioRef('audio/capSound.mp3', React.createRef());
        setAudioRef('audio/capSoundRow.mp3', React.createRef());
        setAudioRef('audio/drinkCoke.mp3', React.createRef());
        setAudioRef('audio/thumsupBGmusic.mp3', React.createRef());
        console.log(audioRefs.current);
    }, []);

    return Object.entries(audioRefs?.current).map(([audioSource, audioRef]) => (
        <audio key={audioSource} ref={audioRef}>
            <source src={audioSource} type="audio/mp3" />
            Your browser does not support the audio element.
        </audio>
    ));
}

export default CharacterAudio
