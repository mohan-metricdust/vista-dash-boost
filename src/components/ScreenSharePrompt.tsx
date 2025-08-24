
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MonitorSpeaker } from 'lucide-react';

interface ScreenSharePromptProps {
  isOpen: boolean;
  onEnableScreenShare: () => void;
  onClose: () => void;
  screenShareEnabled: boolean;
}

const ScreenSharePrompt = ({ isOpen, onEnableScreenShare, onClose, screenShareEnabled }: ScreenSharePromptProps) => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (isOpen && !screenShareEnabled) {
      // Show the prompt after a short delay to make it less intrusive
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    } else if (screenShareEnabled) {
      // Hide prompt immediately when screen sharing is enabled
      setShowPrompt(false);
    }
  }, [isOpen, screenShareEnabled]);

  const handleEnableScreenShare = () => {
    onEnableScreenShare();
    // Don't set showPrompt to false here - let the screenShareEnabled prop control it
  };

  return (
    <Dialog 
      open={showPrompt} 
      onOpenChange={() => {}} // Prevent closing by external interaction
    >
      <DialogContent 
        className="sm:max-w-md backdrop-blur-md bg-white/90 border border-white/20 [&>button]:hidden"
        onPointerDownOutside={(e) => e.preventDefault()} // Prevent closing by clicking outside
        onEscapeKeyDown={(e) => e.preventDefault()} // Prevent closing with escape key
      >
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MonitorSpeaker className="w-5 h-5 text-blue-600" />
            <span>Enable Screen Sharing</span>
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            To enhance your interview experience, please enable screen sharing. This allows you to share your screen when demonstrating code or presenting work.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col space-y-3 mt-4">
          <Button
            onClick={handleEnableScreenShare}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <MonitorSpeaker className="w-4 h-4 mr-2" />
            Enable Screen Share
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 text-center mt-2">
          Screen sharing is required to continue with the interview.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default ScreenSharePrompt;
