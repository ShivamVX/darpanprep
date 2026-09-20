/**
 * DARPANPREP CANDIDATE FEED
 * Webcam feed with face framing reticle, eye-contact signal, camera/mic controls, and fallback state.
 */

import React, { useRef, useState, useEffect } from 'react';
import { Camera, CameraOff, Mic, MicOff, Maximize2, AlertCircle } from 'lucide-react';

interface CandidateFeedProps {
  isMicMuted: boolean;
  onToggleMic: () => void;
  eyeContactScore?: number;
}

export const CandidateFeed: React.FC<CandidateFeedProps> = ({
  isMicMuted,
  onToggleMic,
  eyeContactScore = 93
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      setPermissionError(null);
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 360 },
        audio: false
      });
      if (videoRef.current) {
        videoRef.current.srcObject = userStream;
      }
      setStream(userStream);
      setIsCameraActive(true);
    } catch (err: any) {
      setPermissionError('Camera unavailable — continuing in audio mode.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const toggleCamera = () => {
    if (isCameraActive) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  useEffect(() => {
    // Attempt camera start on mount
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="relative w-full aspect-video bg-slate-950 rounded-2xl overflow-hidden border border-white/15 shadow-xl flex flex-col justify-between">
      
      {/* Video stream or fallback simulation */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${isCameraActive ? 'block' : 'hidden'}`}
        />
        {!isCameraActive && (
          <img
            src="/assets/images/mobile-interview.jpg"
            alt="Candidate Simulated Feed"
            className="w-full h-full object-cover brightness-90"
          />
        )}
      </div>

      {/* Face Mesh Tracking Reticle Overlay */}
      <div className="absolute inset-x-[20%] inset-y-[15%] pointer-events-none z-10">
        <div className="w-full h-full border border-emerald-500/40 border-dashed rounded-2xl relative">
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-emerald-400" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-emerald-400" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-emerald-400" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-emerald-400" />
        </div>
      </div>

      {/* Top Status Bar */}
      <div className="relative z-20 flex items-center justify-between p-3 bg-gradient-to-b from-slate-950/80 to-transparent">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-bold text-white tracking-wide">
            YOU (Candidate)
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-950/80 border border-white/20 text-[10px] text-emerald-400 font-semibold">
          <span>Eye Contact: {eyeContactScore}%</span>
        </div>
      </div>

      {/* Camera permission alert if denied */}
      {permissionError && (
        <div className="relative z-20 mx-3 mb-2 px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-200 text-[10px] flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{permissionError}</span>
        </div>
      )}

      {/* Bottom Controls Bar */}
      <div className="relative z-20 flex items-center justify-between p-3 bg-gradient-to-t from-slate-950/90 to-transparent">
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMic}
            className={`p-2 rounded-full text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
              isMicMuted
                ? 'bg-rose-600 text-white'
                : 'bg-white/15 hover:bg-white/25 text-white'
            }`}
            title={isMicMuted ? 'Unmute Mic' : 'Mute Mic'}
          >
            {isMicMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={toggleCamera}
            className={`p-2 rounded-full text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
              !isCameraActive
                ? 'bg-amber-600 text-white'
                : 'bg-white/15 hover:bg-white/25 text-white'
            }`}
            title={isCameraActive ? 'Disable Real Camera' : 'Enable Real Camera'}
          >
            {isCameraActive ? <Camera className="w-3.5 h-3.5" /> : <CameraOff className="w-3.5 h-3.5" />}
          </button>
        </div>

        <button
          onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen().catch(() => {});
            } else {
              document.exitFullscreen().catch(() => {});
            }
          }}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          title="Fullscreen"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
