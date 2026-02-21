import { useRef } from "react";
import alarmSound from "../assets/interstellar.mp3";
import type { UseAlarmSoundReturn } from "../types";

export default function useAlarmSound(): UseAlarmSoundReturn {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    function initiateSound(): Promise<void> {
        if (!audioRef.current) {
            audioRef.current = new Audio(alarmSound);
            audioRef.current.loop = true;
            audioRef.current.volume = 1;
        }

        // 🔑 THIS IS THE UNLOCK
        return audioRef.current
            .play()
            .then(() => {
                audioRef.current!.pause();
                audioRef.current!.currentTime = 0;
            });
    }

    function play(): void {
        if (!audioRef.current) return;
        audioRef.current.play().catch(console.warn);
    }

    function stop(): void {
        if (!audioRef.current) return;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }

    return { initiateSound, play, stop };
}
