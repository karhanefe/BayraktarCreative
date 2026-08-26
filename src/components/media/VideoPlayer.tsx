'use client'

import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
}

export function VideoPlayer({ src, poster, className, autoPlay = false }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting && isPlaying) {
          video.pause();
          setIsPlaying(false);
        } else if (entry.isIntersecting && autoPlay && !isPlaying) {
          video.play().catch(() => {});
          setIsPlaying(true);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(video);
    return () => observer.disconnect();
  }, [autoPlay, isPlaying]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  return (
    <div className={cn("relative group overflow-hidden bg-[#0a0a0a]", className)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-contain"
        muted={isMuted}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
        <div className="w-full h-1 bg-[#f5f5f0]/20 cursor-pointer" onClick={(e) => {
          if (videoRef.current) {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            videoRef.current.currentTime = pos * videoRef.current.duration;
          }
        }}>
          <div className="h-full bg-[#f5f5f0] transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex justify-between text-[#f5f5f0] text-sm font-medium">
          <button onClick={togglePlay}>{isPlaying ? 'PAUSE' : 'PLAY'}</button>
          <button onClick={() => setIsMuted(!isMuted)}>{isMuted ? 'UNMUTE' : 'MUTE'}</button>
        </div>
      </div>
    </div>
  );
}
