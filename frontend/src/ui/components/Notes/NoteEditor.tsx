import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Button } from '../../others/PrimaryBtn';
import { Badge } from '../../others/Badge';
import { CollaboratorList } from '../Collaboration/CollaborationList';
import { TypingIndicator } from '../Collaboration/TypingIndicator';
import type { NoteColor, NoteEditorProps, User } from '../../../types/types.d';

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

export const NoteEditor = ({ note, onSave, onClose, onTyping, typingUsers }: NoteEditorProps) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [tags, setTags] = useState<string[]>(note?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [color, setColor] = useState<NoteColor>(note?.color || 'blue');
  const [isShared, setIsShared] = useState(note?.isShared || false);

  const colors: NoteColor[] = ['blue', 'green', 'yellow', 'red', 'purple'];

  const handleSave = () => {
    onSave({
      ...note,
      title,
      content,
      tags,
      color,
      isShared,
    });
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (onTyping) onTyping();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title..."
          className="text-2xl font-bold border-none outline-none w-full"
        />
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Toolbar */}
      <div className="border-b p-4 space-y-3">
        {/* Color Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Color:</span>
          {colors.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full bg-${c}-200 border-2 ${
                color === c ? 'border-gray-900' : 'border-transparent'
              } hover:scale-110 transition-transform`}
            />
          ))}
        </div>

        {/* Tags */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTag()}
              placeholder="Add tag..."
              className="flex-1 px-3 py-1 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Button size="sm" onClick={addTag}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Badge key={tag} variant="primary" removable onClick={() => removeTag(tag)}>
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Collaboration Toggle */}
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isShared}
              onChange={(e) => setIsShared(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Enable Collaboration</span>
          </label>
          
          {isShared && note?.collaborators && (
            <CollaboratorList users={note.collaborators.map(collaboratorToUser)} maxVisible={4} />
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Start typing your note..."
          className="w-full h-full border-none outline-none resize-none text-gray-700"
        />
      </div>

      {/* Typing Indicator */}
      {typingUsers && typingUsers.length > 0 && (
        <div className="px-4">
          <TypingIndicator users={typingUsers} />
        </div>
      )}

      {/* Footer */}
      <div className="border-t p-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {note?.lastModified && `Last modified: ${new Date(note.lastModified).toLocaleString()}`}
        </span>
        <div className="flex items-center space-x-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Note</Button>
        </div>
      </div>
    </div>
  );
};
