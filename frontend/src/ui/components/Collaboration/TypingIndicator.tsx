import type { TypingIndicatorProps } from '../../../types/types.d';

export const TypingIndicator = ({ users }: TypingIndicatorProps) => {
  if (!users || users.length === 0) return null;

  const names = users.map(u => u.name).join(', ');

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-500 py-2">
      <div className="flex space-x-1">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span>{names} {users.length === 1 ? 'is' : 'are'} typing...</span>
    </div>
  );
};
