'use client';

import { useIsMounted } from '@redduck/helpers-react';

import { HistoryTable } from './history-table';

import { type CubeWithApyAndTvl } from '@/actions/get-all-cubes';
import { type VaultWithApyAndTvl } from '@/actions/get-all-vaults-with-apy-and-tvl';
import { EarnHistoryTable } from '@/components/dashboard/earn-history-table';
import { TooltipItem } from '@/components/tooltip-item';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';

type DashboardHistoryProps = {
  usedBefore: boolean;
  vaults: VaultWithApyAndTvl[];
  addressFromUrl?: string;
  cubes: CubeWithApyAndTvl[];
};

enum HistoryTabs {
  VAULTS = 'vaults',
  STRATEGIES = 'strategies',
}

const DashboardHistory = ({
  usedBefore,
  vaults,
  addressFromUrl,
  cubes,
}: DashboardHistoryProps) => {
  const isMounted = useIsMounted();

  if (!addressFromUrl || !isMounted || !usedBefore) return null;

  return (
    <Accordion defaultValue={['default']} type="multiple" className="w-full">
      <AccordionItem value="default" className="border-b-0">
        <div className="mb-6 rounded-[16px] border border-slate-200 bg-white p-4 shadow-sm">
          <AccordionTrigger className="p-0 text-2xl font-semibold text-slate-800 hover:no-underline">
            <div className="flex items-center gap-1">
              <p>History</p>
              <TooltipItem>
                <p className="text-base font-medium text-slate-500">
                  Detailed history of actions and interactions with InvariFi's vaults and strategies
                </p>
              </TooltipItem>
            </div>
          </AccordionTrigger>
        </div>
        <AccordionContent className="p-0">
          <Tabs defaultValue={HistoryTabs.VAULTS}>
            <TabsList className="h-fit w-full justify-center gap-[8px] bg-transparent">
              <TabsTrigger
                value={HistoryTabs.VAULTS}
                className="data-[state=active]:!bg-primary data-[state=active]:!text-white rounded-[8px] px-[24px] py-[8px] text-[14px] font-semibold text-slate-800"
              >
                Vaults
              </TabsTrigger>
              <TabsTrigger
                value={HistoryTabs.STRATEGIES}
                className="data-[state=active]:!bg-primary data-[state=active]:!text-white rounded-[8px] px-[24px] py-[8px] text-[14px] font-semibold text-slate-800"
              >
                Strategies
              </TabsTrigger>
            </TabsList>
            <div className="pt-[24px]">
              <TabsContent value={HistoryTabs.VAULTS} asChild>
                <div className="mb-4 rounded-t-[16px] border border-slate-200 bg-white shadow-sm [&>div]:rounded-[16px]">
                  <HistoryTable vaults={vaults} />
                </div>
              </TabsContent>
              <TabsContent value={HistoryTabs.STRATEGIES} asChild>
                <div className="mb-4 rounded-t-[16px] border border-slate-200 bg-white shadow-sm [&>div]:rounded-[16px]">
                  <EarnHistoryTable cubes={cubes} />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DashboardHistory;
