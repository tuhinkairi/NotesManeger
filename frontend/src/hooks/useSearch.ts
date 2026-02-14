import { useState, useMemo } from 'react';
import type { Note } from '../types/types.d';

type ViewMode = 'grid' | 'list';

export const useSearch = (notes: Note[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      const matchesSearch = 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => note.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [notes, searchQuery, selectedTags]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    notes.forEach(note => note.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, [notes]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedTags,
    toggleTag,
    viewMode,
    setViewMode,
    filteredNotes,
    allTags,
  };
};
