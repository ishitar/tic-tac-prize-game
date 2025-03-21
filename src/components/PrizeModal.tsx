
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Copy, CheckCircle2 } from 'lucide-react';
import { generateCoupon } from '@/utils/gameLogic';

interface PrizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrizeModal: React.FC<PrizeModalProps> = ({ isOpen, onClose }) => {
  const [couponCode, setCouponCode] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCouponCode(generateCoupon());
      setCopied(false);
    }
  }, [isOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format coupon for display with dashes
  const formattedCoupon = couponCode.split('-').map((part, i) => (
    <React.Fragment key={i}>
      {i > 0 && <span className="coupon-dash"></span>}
      {part}
    </React.Fragment>
  ));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="prize-card p-0 max-w-md w-full">
        <div className="relative overflow-hidden">
          {/* Top decoration */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-game-player/10 to-transparent z-0" />
          
          <div className="relative z-10 px-6 pt-12 pb-8 text-center">
            <div className="inline-block p-4 bg-game-player/10 rounded-full mb-4 animate-float">
              <Trophy className="h-10 w-10 text-game-player" />
            </div>
            
            <h3 className="text-2xl font-medium mb-1">You Won!</h3>
            <p className="text-gray-500 mb-6 text-sm">Here's your Myntra coupon code</p>
            
            <div className="flex items-center justify-center">
              <div className="bg-gray-50 rounded-l-lg px-4 py-3 font-mono text-lg tracking-wider border border-gray-200 select-all">
                {formattedCoupon}
              </div>
              <Button 
                onClick={handleCopy}
                variant="ghost" 
                className="rounded-l-none border border-l-0 border-gray-200 h-[50px] px-3 bg-gray-50 hover:bg-gray-100"
              >
                {copied ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-gray-500" />}
              </Button>
            </div>
            
            <p className="mt-4 text-xs text-gray-400">Valid for 10% off your next purchase</p>
            
            <div className="mt-8">
              <Button onClick={onClose} variant="outline" className="w-full">
                Close
              </Button>
            </div>
          </div>
          
          {/* Bottom decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-game-player/5 to-transparent z-0" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrizeModal;
