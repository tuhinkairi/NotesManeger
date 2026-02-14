import { Badge } from '../../others/Badge';
import { CollaboratorList } from '../Collaboration/CollaborationList';
import type { NoteCardProps, User } from '../../../types/types.d';

function collaboratorToUser(collaborator: User | string): User {
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

export const NoteCard = ({ note, onClick, onDelete, onTogglePin, onToggleShare }: NoteCardProps) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    red: 'bg-red-50 border-red-200',
    purple: 'bg-purple-50 border-purple-200',
  };

  return (
    <div
      className={`${colorClasses[note.color] || 'bg-white'} border-2 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all duration-200 relative group`}
      onClick={onClick}
    >
      {/* Pin Badge */}
      {note.isPinned && (
        <div className="absolute top-2 right-2">
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
          </svg>
        </div>
      )}

      {/* Title */}
      <h3 className="font-semibold text-lg mb-2 pr-8">{note.title}</h3>

      {/* Content Preview */}
      <p className="text-gray-600 text-sm mb-3 line-clamp-3">{note.content}</p>

      {/* Tags */}
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {note.tags.map(tag => (
            <Badge key={tag} variant="default">#{tag}</Badge>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          {note.isShared && note.collaborators && note.collaborators.length > 0 && (
            <CollaboratorList users={note.collaborators.map(collaboratorToUser)} maxVisible={3} />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin(note.id);
            }}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title={note.isPinned ? 'Unpin' : 'Pin'}
          >
            <svg className="w-4 h-4" fill={note.isPinned ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleShare(note.id);
            }}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title={note.isShared ? 'Stop sharing' : 'Share'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
            className="p-2 hover:bg-red-100 text-red-600 rounded transition-colors"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
