import { type FC } from 'react';
import type * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={cn(
        'rounded-[8px] border border-slate-300 bg-white px-[16px] py-[7px] text-slate-800 placeholder:text-slate-400',
        className,
      )}
    />
  );
};
