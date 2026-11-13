import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Button } from './Button';
import { Loader } from './Loader';

interface CameraPreviewProps { onVerify: (success: boolean) => void; }

export const CameraPreview: React.FC<CameraPreviewProps> = ({ onVerify }) => {
  const webcamRef = useRef<Webcam>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [captured, setCaptured] = useState<string | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCaptured(imageSrc);
      setIsVerifying(true);
      // Dummy verification delay
      setTimeout(() => {
        setIsVerifying(false);
        onVerify(true);
      }, 2500);
    }
  }, [webcamRef, onVerify]);

  if (captured && !isVerifying) return <div className="text-green-600 font-medium p-4 bg-green-50 rounded-xl text-center">Liveness Verified Successfully</div>;

  return (
    <div className="flex flex-col items-center gap-4">
      {isVerifying ? <Loader /> : (
        <>
          <div className="rounded-xl overflow-hidden border-2 border-gray-200">
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={320} height={240} />
          </div>
          <Button onClick={capture} variant="primary">Capture & Verify</Button>
        </>
      )}
    </div>
  );
};