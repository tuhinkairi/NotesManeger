import type { OnlineIndicatorProps } from '../../../types/types.d';

export const OnlineIndicator = ({ isOnline }: OnlineIndicatorProps) => {
  return (
    <span
      className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white ${
        isOnline ? 'bg-green-500' : 'bg-gray-400'
      }`}
    />
  );
};
