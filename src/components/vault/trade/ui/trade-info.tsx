import { type PublicClient } from 'wagmi';

import { type VaultWithApyAndTvl } from '@/actions/get-all-vaults-with-apy-and-tvl';
import { TooltipItem } from '@/components/tooltip-item';
import { useVaultFees } from '@/hooks/useVaultFees';

export const TradeInfo = ({
  vault,
  publicClient,
}: {
  vault: VaultWithApyAndTvl;
  publicClient: PublicClient;
}) => {
  const { data: feesData, isLoading: isFeesLoading } = useVaultFees(
    vault,
    publicClient,
  );

  return (
    <div className="flex flex-col gap-[8px] py-[10px] text-slate-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <div className="text-[12px] text-slate-500">DEPOSIT FEE</div>
          <TooltipItem contentClassName="text-sm">
            Fee for deposit charged by the provider or InvariFi
          </TooltipItem>
        </div>
        <div className="text-[14px] text-slate-800">
          {isFeesLoading ? '...' : `${feesData?.depositFee}%`}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <div className="text-[12px] text-slate-500">WITHDRAWAL FEE</div>
          <TooltipItem contentClassName="text-sm">
            Fee for withdrawal charged by the provider or InvariFi
          </TooltipItem>
        </div>
        <div className="text-[14px] text-slate-800">
          {isFeesLoading ? '...' : `${feesData?.withdrawFee}%`}
        </div>
      </div>
      <p className="text-[12px] text-slate-500">
        The displayed APY accounts for performance fee that is deducted from the
        generated yield only.
      </p>
    </div>
  );
};
