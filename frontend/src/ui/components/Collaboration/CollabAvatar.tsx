import { OnlineIndicator } from './CollabIndication';
import type { CollaboratorAvatarProps } from '../../../types/types.d';

export const CollaboratorAvatar = ({ user, size = 'md', showOnline = true }: CollaboratorAvatarProps) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  return (
    <div className="relative inline-block">
      <div
        className={`${sizes[size]} ${user.color} rounded-full flex items-center justify-center text-white font-semibold`}
        title={user.name}
      >
        {user.avatar}
      </div>
      {showOnline && <OnlineIndicator isOnline={user.isOnline} />}
    </div>
  );
};
