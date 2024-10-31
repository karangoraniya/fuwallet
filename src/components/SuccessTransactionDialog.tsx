import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, ExternalLink } from "lucide-react";

interface SuccessTransactionDialogProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  txHash: string;
}

export const SuccessTransactionDialog = ({
  isOpen,
  onClose,
  txHash,
}: SuccessTransactionDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transaction Successful!</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-center">
          <div className="p-3 rounded-full bg-green-100 w-12 h-12 mx-auto flex items-center justify-center">
            <Check className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-lg font-medium">
            Your transfer has been completed successfully.
          </p>
          <Link
            href={`https://app-testnet.fuel.network/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-500 underline flex items-center justify-center gap-2"
          >
            View on Explorer <ExternalLink className="w-4 h-4" />
          </Link>
          <Button
            onClick={() => onClose(false)}
            className="w-full bg-emerald-400 hover:bg-emerald-500 text-black"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
