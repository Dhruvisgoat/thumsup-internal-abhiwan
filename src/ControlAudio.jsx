import React, { useEffect, useContext, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DirectionContext } from "./RefContext/DirectionContext";
import { MyContext } from "./RefContext/Context";
import { PauseContext } from "./RefContext/PauseContext";
import { CapRemoveIdContext } from "./RefContext/CapRemoveId";
import PowerUp from "./PowerUp";

function ControlAudio() {
    const {
        getAudioRef,
        invisiblePowerup,
        invisiblePowerupCount,
        isPlayerDied,
        isVictory,
        powerupCount,
        powerup,
        volume
    } = useContext(DirectionContext);
    const { capCountRef } = useContext(CapRemoveIdContext);
    const { jumpRef } = useContext(MyContext);
    const { pause } = useContext(PauseContext);

    const bgMusicRef = getAudioRef('audio/thumsupBGmusic.mp3');
    const powerup1AudioRef = getAudioRef('audio/powerup1.mp3');
    const powerup2AudioRef = getAudioRef('audio/powerup2.mp3');
    const playerDiedAudioRef = getAudioRef('audio/hit.mp3');
    const levelFinishedAudioRef = getAudioRef('audio/levelFinished.mp3');
    const jumpMusicRef = getAudioRef('audio/jump.mp3');
    const capSoundRef = getAudioRef('audio/capSoundRow.mp3');

    const [audioAllowed, setAudioAllowed] = useState(false);
    const [isTabActive, setIsTabActive] = useState(true);
    const timerRef = useRef(null);

    useEffect(() => {
        const enableAudio = () => {
            setAudioAllowed(true);
            document.removeEventListener('click', enableAudio);
            document.removeEventListener('keydown', enableAudio);
        };

        document.addEventListener('click', enableAudio);
        document.addEventListener('keydown', enableAudio);

        return () => {
            document.removeEventListener('click', enableAudio);
            document.removeEventListener('keydown', enableAudio);
        };
    }, []);

    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsTabActive(!document.hidden);
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        if (!audioAllowed || !isTabActive) return;

        if (!pause) {
            bgMusicRef.current.loop = true;
            bgMusicRef.current.volume = volume / 100;
            bgMusicRef.current.play();
        } else {
            bgMusicRef.current.pause();
        }

        return () => {
            bgMusicRef.current?.pause();
        };
    }, [audioAllowed, isTabActive, pause, volume]);

    useEffect(() => {
        if (!audioAllowed || !isTabActive) return;

        if (invisiblePowerup) {
            powerup1AudioRef.current.volume = volume / 100;
            powerup1AudioRef.current?.play();
        }

    }, [audioAllowed, invisiblePowerupCount, invisiblePowerup, isTabActive, volume]);

    useEffect(() => {
        if (!audioAllowed || !isTabActive) return;

        if (powerup) {
            powerup2AudioRef.current.volume = volume / 100;
            powerup2AudioRef.current?.play();
        }

    }, [audioAllowed, powerupCount, powerup, isTabActive, volume]);


    useEffect(() => {
        if (!audioAllowed || !isTabActive) return;

        if (isPlayerDied) {
            playerDiedAudioRef.current.volume = volume / 100;
            playerDiedAudioRef.current?.play();
        } else {
            playerDiedAudioRef.current?.pause();
        }
    }, [audioAllowed, isPlayerDied, isTabActive, volume]);

    useEffect(() => {
        if (!audioAllowed || !isTabActive) return;

        if (isVictory) {
            levelFinishedAudioRef.current.volume = volume / 100;
            levelFinishedAudioRef.current?.play();
            bgMusicRef.current?.pause();
        } else {
            levelFinishedAudioRef.current?.pause();
        }
    }, [audioAllowed, isVictory, isTabActive, volume]);


    useEffect(() => {
        if (isTabActive) return;

        [
            bgMusicRef,
            playerDiedAudioRef,
            levelFinishedAudioRef
        ].forEach(audio => {
            audio.current?.pause();
        });
    }, [isTabActive]);

    useFrame(() => {
        if (jumpRef.current) {
            jumpMusicRef.current.volume = volume / 100;
            jumpMusicRef.current?.play();
        } else {
            jumpMusicRef.current?.pause();
            jumpMusicRef.current.currentTime = 0;
        }

        if (capCountRef.current !== capCountRef.previous) {
            clearTimeout(timerRef.current);
            capSoundRef.current.volume = volume / 100;
            capSoundRef.current.loop = true;
            capSoundRef.current.play();

            timerRef.current = setTimeout(() => {
                capSoundRef.current.volume = 0;
                capSoundRef.current.pause();
            }, 300);
        }

        capCountRef.previous = capCountRef.current;
    });

    return null;
}

export default ControlAudio;