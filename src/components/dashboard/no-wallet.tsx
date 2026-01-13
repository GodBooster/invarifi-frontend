'use client';

import { ConnectWalletButton } from '@/components/connect-wallet-button';
import { EmptyWallet } from '@/ui/icons';

export const NoWalletDashboard = () => {
  return (
    <div className="border-primary container mb-12 flex h-full items-center justify-center rounded-[16px] border-2 bg-white p-3 shadow-sm">
      <div className="flex flex-col items-center gap-6">
        <EmptyWallet />
        <div className="text-center">
          <h2 className="text-base font-semibold text-slate-800">No address selected</h2>
          <h5 className="mt-2 text-sm font-semibold text-slate-500">
            No wallet connected. Connect your wallet or search for an address
          </h5>
        </div>
        <ConnectWalletButton className="bg-primary hover:bg-primary-hover w-[320px] text-base font-semibold text-white" />
      </div>
    </div>
  );
};
