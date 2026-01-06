// import { useRef } from "react";

// export default function useAlarmSound() {
//     const audioRef = useRef(null);

//     function initiateSound() {
//         if (!audioRef.current) {
//             audioRef.current = new Audio("/public/interstellar.mp3");
//             audioRef.current.loop = true; // alarm repeats until stopped
//         }
// }

//     async function play() {
//         if (!audioRef.current) return;
//         try {
//             await audioRef.current.play();
//         } catch (err) {
//             console.warn("Audio autoplay blocked until user interacts.", err);
//         }
//     }

//     function stop() {
//         if (!audioRef.current) return;
//         audioRef.current.pause();
//         audioRef.current.currentTime = 0;
//     }

//     return { initiateSound, play, stop };
// }


import { useRef } from "react";

export default function useAlarmSound() {
  const audioRef = useRef(null);

  function initiateSound() {
    if (!audioRef.current) {
      audioRef.current = new Audio("/public/interstellar.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 1;
    }

    // 🔑 THIS IS THE UNLOCK
    audioRef.current
      .play()
      .then(() => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        })
      .catch(console.warn);
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
