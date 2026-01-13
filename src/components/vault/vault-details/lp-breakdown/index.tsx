'use client';

import { ClientOnly } from '@redduck/helpers-react';
import Image from 'next/image';
import { useMemo } from 'react';

import { type VaultWithApyAndTvl } from '@/actions/get-all-vaults-with-apy-and-tvl';
import { TooltipItemExtended } from '@/components/extended-tooltip-item';
import { Progress } from '@/components/ui/progress';
import { getTokenAssetUrl } from '@/constants/assets';
import { getRowsFromLps } from '@/lib/get-rows-from-lps';
import { tvlFormatter } from '@/lib/tvl-formatter';

export type LpBreakdownProps = {
  vault: VaultWithApyAndTvl;
};

export const LpBreakdown = ({ vault }: LpBreakdownProps) => {
  const rows = useMemo(() => getRowsFromLps(vault), [vault]);
  const totalSupply = parseFloat(vault.lps?.totalSupply ?? '0');

  return (
    <div className="flex flex-col gap-[4px] rounded-[12px] rounded-tl-none">
      <div className="flex flex-col gap-[10px] rounded-[8px] bg-slate-50 p-[12px] text-xs font-medium text-slate-800">
        <div className="flex flex-row items-center justify-between gap-[4px]">
          <span className="text-slate-500">Asset</span>
          <div className="flex gap-2">
            <div className="flex items-center">
              {vault.assets.map((asset) => (
                <Image
                  className="-ml-1"
                  key={asset}
                  width={16}
                  height={16}
                  src={getTokenAssetUrl(asset)}
                  alt={asset}
                />
              ))}
            </div>
            <p className="text-sm font-semibold text-slate-800">{vault.assets.join('/')}</p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between gap-[4px]">
          <span className="text-slate-500">Token Amount</span>
          <TooltipItemExtended tooltipComponent={totalSupply}>
            <span className="text-sm font-semibold text-slate-800 underline underline-offset-4">
              {tvlFormatter(totalSupply, 2)}
            </span>
          </TooltipItemExtended>
        </div>
        <div className="flex flex-row items-center justify-between gap-[4px]">
          <span className="text-slate-500">Value</span>
          <span className="text-sm font-semibold text-slate-800">
            ${tvlFormatter(totalSupply * (vault.lps?.price ?? 0), 2)}
          </span>
        </div>
      </div>
      <div className="divide-y divide-dashed divide-slate-300">
        {rows
          .filter((row) => !!row)
          .map((row) => (
            <div key={row.name} className="flex flex-col gap-[16px] p-[12px]">
              <div className="flex flex-row items-center justify-between">
                <div className="flex gap-2">
                  <Image
                    width={24}
                    height={24}
                    src={getTokenAssetUrl(row.name)}
                    alt={row.name}
                  />
                  <p className="text-slate-800">{row.name}</p>
                </div>
                <div className="flex flex-row items-center gap-[8px]">
                  <ClientOnly>
                    <span className="text-sm font-medium text-primary">
                      {row.progress.toFixed(2)}%
                    </span>
                    <Progress
                      value={row.progress}
                      className="h-[20px] w-[100px] bg-slate-200 [&>div]:bg-primary"
                    />
                  </ClientOnly>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between">
                <div className="text-[12px] text-slate-500">Token Amount</div>
                <div>
                  <TooltipItemExtended tooltipComponent={row.amount}>
                    <span className="text-sm font-semibold text-slate-800 underline underline-offset-4">
                      {row.amount.toFixed(2)}
                    </span>
                  </TooltipItemExtended>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between">
                <div className="text-[12px] text-slate-500">Value</div>
                <div className="text-slate-800">${tvlFormatter(row.value, 2)}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
