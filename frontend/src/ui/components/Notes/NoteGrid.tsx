import { NoteCard } from './NoteCard';
import type { Note, NoteGridProps } from '../../../types/types.d';

export const NoteGrid = ({ notes, onNoteClick, onDelete, onTogglePin, onToggleShare }: NoteGridProps) => {
  const pinnedNotes = notes.filter((note: Note) => note.isPinned);
  const unpinnedNotes = notes.filter((note: Note) => !note.isPinned);

  return (
    <div className="space-y-6">
      {/* Pinned Notes */}
      {pinnedNotes.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Pinned
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pinnedNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onClick={() => onNoteClick(note)}
                onDelete={onDelete}
                onTogglePin={onTogglePin}
                onToggleShare={onToggleShare}
              />
            ))}
          </div>
        </div>
      )}

      {/* Other Notes */}
      {unpinnedNotes.length > 0 && (
        <div>
          {pinnedNotes.length > 0 && (
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Others
            </h3>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {unpinnedNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onClick={() => onNoteClick(note)}
                onDelete={onDelete}
                onTogglePin={onTogglePin}
                onToggleShare={onToggleShare}
              />
            ))}
          </div>
        </div>
      )}

      {notes.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-lg">No notes found</p>
        </div>
      )}
    </div>
  );
};
