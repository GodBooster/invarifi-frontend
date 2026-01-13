import { memo, useMemo } from 'react';
import { usePublicClient } from 'wagmi';

import { type VaultWithApyAndTvl } from '@/actions/get-all-vaults-with-apy-and-tvl';
import { useVaultFees } from '@/hooks/useVaultFees';
import { apiChainToWagmi } from '@/lib/api-chain-to-wagmi';
import { apyFormatter } from '@/lib/apy-formatter';
import { lastHarvestFormatter } from '@/lib/last-harvest-formatter';

export const VaultInfoBlock = memo(
  ({ vault }: { vault: VaultWithApyAndTvl }) => {
    const chainId = apiChainToWagmi(vault.network || '').id;
    const publicClient = usePublicClient({ chainId });
    console.log(vault);

    const { data: feesData, isLoading: isFeesLoading } = useVaultFees(
      vault,
      publicClient,
    );

    const lastHarvest = useMemo(
      () => lastHarvestFormatter(vault.lastHarvest),
      [vault.lastHarvest],
    );

    return (
      <>
        <div className="mb-[4px] flex gap-[4px]">
          <div className="w-full rounded-[6px] bg-slate-100 p-[8px]">
            <h4 className="text-[12px] font-medium leading-[18px] text-primary">
              Native APY
            </h4>
            <h5 className="text-[14px] font-semibold leading-[20px] text-slate-800">
              {apyFormatter(vault.apy.totalApy)}
            </h5>
          </div>
          <div className="w-full rounded-[6px] bg-slate-100 p-[8px]">
            <h4 className="text-[12px] font-medium leading-[18px] text-primary">
              Daily APY
            </h4>
            <h5 className="text-[14px] font-semibold leading-[20px] text-slate-800">
              {apyFormatter(vault.apy.totalApy ? vault.apy.totalApy / 365 : 0)}
            </h5>
          </div>
          <div className="w-full rounded-[6px] bg-slate-100 p-[8px]">
            <h4 className="text-[12px] font-medium leading-[18px] text-primary">
              Last harvest
            </h4>
            <h5 className="text-[14px] font-semibold leading-[20px] text-slate-800">
              {lastHarvest || 'No harvest yet'}
            </h5>
          </div>
        </div>
        <div className="mb-[4px] flex gap-[4px]">
          <div className="flex w-full justify-between rounded-[6px] bg-slate-100 p-[8px]">
            <h4 className="text-[12px] font-medium leading-[18px] text-primary">
              Deposit fee
            </h4>
            <h5 className="text-[14px] font-semibold leading-[20px] text-slate-800">
              {isFeesLoading ? '...' : `${feesData?.depositFee}%`}
            </h5>
          </div>
          <div className="flex w-full justify-between rounded-[6px] bg-slate-100 p-[8px]">
            <h4 className="text-[12px] font-medium leading-[18px] text-primary">
              Withdraw fee
            </h4>
            <h5 className="text-[14px] font-semibold leading-[20px] text-slate-800">
              {isFeesLoading ? '...' : `${feesData?.withdrawFee}%`}
            </h5>
          </div>
        </div>
      </>
    );
  },
);
VaultInfoBlock.displayName = 'VaultInfoBlock';
