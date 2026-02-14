import { useState, useCallback } from 'react';
import type { Note, NoteColor } from '../types/types.d';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Project Planning',
      content: 'Define milestones and deliverables for Q1',
      tags: ['work', 'planning'],
      color: 'blue' as NoteColor,
      isPinned: true,
      isShared: true,
      collaborators: ['user1', 'user2'],
      lastModified: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Meeting Notes',
      content: 'Discussed new features and timeline',
      tags: ['work', 'meetings'],
      color: 'green' as NoteColor,
      isPinned: false,
      isShared: false,
      collaborators: [],
      lastModified: new Date().toISOString(),
    },
  ]);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const createNote = useCallback((noteData: Partial<Note>) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: noteData.title || '',
      content: noteData.content || '',
      tags: noteData.tags || [],
      color: noteData.color || 'blue',
      isPinned: false,
      isShared: noteData.isShared || false,
      collaborators: noteData.collaborators || [],
      lastModified: new Date().toISOString(),
    };
    setNotes(prev => [newNote, ...prev]);
    return newNote;
  }, []);

  const updateNote = useCallback((id: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, ...updates, lastModified: new Date().toISOString() }
        : note
    ));
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    if (selectedNote?.id === id) {
      setSelectedNote(null);
    }
  }, [selectedNote]);

  const togglePin = useCallback((id: string) => {
    setNotes(prev => prev.map(note =>
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    ));
  }, []);

  const toggleShare = useCallback((id: string) => {
    setNotes(prev => prev.map(note =>
      note.id === id ? { ...note, isShared: !note.isShared } : note
    ));
  }, []);

  return {
    notes,
    selectedNote,
    setSelectedNote,
    createNote,
    updateNote,
    deleteNote,
    togglePin,
    toggleShare,
  };
};
