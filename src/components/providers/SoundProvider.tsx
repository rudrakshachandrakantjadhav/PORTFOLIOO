'use client';

import React, { createContext, useContext, ReactNode } from 'react';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playHover: () => void;
  playClick: () => void;
  playSuccess: () => void;
  playPalette: () => void;
}

const dummyFn = () => {};

const SoundContext = createContext<SoundContextType>({
  isMuted: true,
  toggleMute: dummyFn,
  playHover: dummyFn,
  playClick: dummyFn,
  playSuccess: dummyFn,
  playPalette: dummyFn,
});

export function SoundProvider({ children }: { children: ReactNode }) {
  return (
    <SoundContext.Provider
      value={{
        isMuted: true,
        toggleMute: dummyFn,
        playHover: dummyFn,
        playClick: dummyFn,
        playSuccess: dummyFn,
        playPalette: dummyFn,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundFX() {
  return useContext(SoundContext);
}
