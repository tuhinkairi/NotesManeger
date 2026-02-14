import { useState } from "react";
import { useNotes } from "../../hooks/useNotes";
import { useSearch } from "../../hooks/useSearch";
import { useCollaboration } from "../../hooks/useCollaboration";
import { Layout } from "../layouts/Layout";
import { Sidebar } from "../layouts/Sidebar";
import { Header } from "../layouts/Header";
import { NoteFilters } from "../components/Notes/NoteFilter";
import { NoteGrid } from "../components/Notes/NoteGrid";
import { NoteList } from "../components/Notes/NoteList";
import { Modal } from "../others/Modal";
import { NoteEditor } from "../components/Notes/NoteEditor";
import type { Note } from "../../types/types.d";


function Dashboard() {
  const [activeTab, setActiveTab] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const {
    notes,
    selectedNote,
    setSelectedNote,
    createNote,
    updateNote,
    deleteNote,
    togglePin,
    toggleShare,
  } = useNotes();

  const {
    searchQuery,
    setSearchQuery,
    selectedTags,
    toggleTag,
    viewMode,
    setViewMode,
    filteredNotes,
    allTags,
  } = useSearch(notes);

  const { typingUsers, handleTyping } = useCollaboration(selectedNote?.id);

  const handleNewNote = () => {
    setSelectedNote(null);
    setIsEditorOpen(true);
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setIsEditorOpen(true);
  };

  const handleSaveNote = (noteData: Partial<Note>) => {
    if (selectedNote) {
      updateNote(selectedNote.id, noteData);
    } else {
      createNote(noteData);
    }
    setIsEditorOpen(false);
    setSelectedNote(null);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setSelectedNote(null);
  };

  return (
    <Layout>
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNewNote={handleNewNote}
          onMenuToggle={() => setIsMobileMenuOpen(true)}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Filters */}
            <NoteFilters
              allTags={allTags}
              selectedTags={selectedTags}
              onToggleTag={toggleTag}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

            {/* Notes Display */}
            {viewMode === 'grid' ? (
              <NoteGrid
                notes={filteredNotes}
                onNoteClick={handleNoteClick}
                onDelete={deleteNote}
                onTogglePin={togglePin}
                onToggleShare={toggleShare}
              />
            ) : (
              <NoteList
                notes={filteredNotes}
                onNoteClick={handleNoteClick}
                onDelete={deleteNote}
                onTogglePin={togglePin}
                onToggleShare={toggleShare}
              />
            )}
          </div>
        </main>
      </div>

      {/* Note Editor Modal */}
      <Modal
        isOpen={isEditorOpen}
        onClose={handleCloseEditor}
        title={selectedNote ? 'Edit Note' : 'New Note'}
      >
        <NoteEditor
          note={selectedNote}
          onSave={handleSaveNote}
          onClose={handleCloseEditor}
          onTyping={handleTyping}
          typingUsers={typingUsers}
        />
      </Modal>
    </Layout>
  );
}

export default Dashboard;
