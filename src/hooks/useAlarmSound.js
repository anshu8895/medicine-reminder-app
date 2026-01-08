import { useRef } from "react";
import interstellarAudio from "../assets/interstellar.mp3";

export default function useAlarmSound() {
    const audioRef = useRef(null);

    function initiateSound() {
        if (!audioRef.current) {
            audioRef.current = new Audio(interstellarAudio);
            audioRef.current.loop = true;
            audioRef.current.volume = 1;
        }

        // 🔑 THIS IS THE UNLOCK
        return audioRef.current
            .play()
            .then(() => {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            });
    }

    function play() {
        if (!audioRef.current) return;
        audioRef.current.play().catch(console.warn);
    }

    function stop() {
        if (!audioRef.current) return;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }

    return { initiateSound, play, stop };
}
