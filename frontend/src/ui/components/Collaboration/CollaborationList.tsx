import { CollaboratorAvatar } from './CollabAvatar';
import type { CollaborationListProps, User } from '../../../types/types.d';

function asUser(collaborator: User | string): User {
  if (typeof collaborator === 'string') {
    return {
      id: collaborator,
      name: collaborator,
      avatar: collaborator.slice(0, 2).toUpperCase(),
      color: 'bg-gray-500',
      isOnline: false,
    };
  }
  return collaborator;
}

export const CollaboratorList = ({ users, maxVisible = 3 }: CollaborationListProps) => {
  const visibleUsers = users.slice(0, maxVisible).map(asUser);
  const remainingCount = users.length - maxVisible;

  return (
    <div className="flex items-center -space-x-2">
      {visibleUsers.map(user => (
        <CollaboratorAvatar key={user.id} user={user} size="sm" />
      ))}
      {remainingCount > 0 && (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700 ring-2 ring-white">
          +{remainingCount}
        </div>
      )}
    </div>
  );
};
