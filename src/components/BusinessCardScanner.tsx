
import React, { useRef, useState } from 'react';
import { Camera, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface BusinessCardScannerProps {
  onDataExtracted: (data: {
    name: string;
    company: string;
    title: string;
    email: string;
    phone: string;
  }) => void;
}

const BusinessCardScanner: React.FC<BusinessCardScannerProps> = ({ onDataExtracted }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCapturing(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCapturing(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageData);
        stopCamera();
        
        // Simulate OCR processing
        processOCR(imageData);
      }
    }
  };

  const processOCR = async (imageData: string) => {
    toast({
      title: "Processing Business Card",
      description: "Extracting text using OCR...",
    });

    // Simulate OCR processing delay
    setTimeout(() => {
      // Mock OCR results - in a real app, this would call an OCR service
      const mockData = {
        name: "Sarah Johnson",
        company: "Innovation Corp",
        title: "Chief Technology Officer",
        email: "sarah.johnson@innovationcorp.com",
        phone: "+1 (555) 987-6543"
      };

      onDataExtracted(mockData);
      setIsOpen(false);
      setCapturedImage(null);
      
      toast({
        title: "Business Card Scanned!",
        description: "Contact information has been extracted and filled in.",
      });
    }, 2000);
  };

  const handleOpen = () => {
    setIsOpen(true);
    startCamera();
  };

  const handleClose = () => {
    setIsOpen(false);
    stopCamera();
    setCapturedImage(null);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  return (
    <>
      <Button 
        onClick={handleOpen}
        variant="outline" 
        className="p-6 h-auto flex-col space-y-2 hover:bg-blue-50"
      >
        <Camera className="w-8 h-8 text-blue-600" />
        <span className="text-sm font-medium">Scan Business Card</span>
        <span className="text-xs text-slate-500">Auto-fill contact info</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Scan Business Card</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {!capturedImage ? (
              <>
                <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    playsInline
                    muted
                  />
                  {!isCapturing && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button onClick={startCamera}>Start Camera</Button>
                    </div>
                  )}
                </div>
                
                {isCapturing && (
                  <div className="flex justify-center space-x-4">
                    <Button onClick={captureImage} size="lg">
                      <Camera className="w-4 h-4 mr-2" />
                      Capture
                    </Button>
                    <Button onClick={handleClose} variant="outline" size="lg">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="relative rounded-lg overflow-hidden">
                  <img 
                    src={capturedImage} 
                    alt="Captured business card" 
                    className="w-full h-auto"
                  />
                </div>
                
                <div className="flex justify-center space-x-4">
                  <Button onClick={() => processOCR(capturedImage)} size="lg">
                    <Check className="w-4 h-4 mr-2" />
                    Process Card
                  </Button>
                  <Button onClick={retakePhoto} variant="outline" size="lg">
                    <Camera className="w-4 h-4 mr-2" />
                    Retake
                  </Button>
                </div>
              </>
            )}
          </div>
          
          <canvas ref={canvasRef} className="hidden" />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BusinessCardScanner;
