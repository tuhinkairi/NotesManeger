// Interfaces for API requests and responses
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

// Note color types
export type NoteColor = 'blue' | 'green' | 'yellow' | 'red' | 'purple';

// Note interface for the application
export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  color: NoteColor;
  isPinned: boolean;
  isShared: boolean;
  collaborators: string[];
  lastModified: string;
}

// User interface for collaboration features
export interface User {
  id: string;
  name: string;
  avatar: string;
  color: string;
  isOnline: boolean;
}

// FilterPosts interface
export interface FilterPosts {
  filter: "new" | "old" | "recent" | string | undefined;
}

// NoteCard Props
export interface NoteCardProps {
  note: Note;
  onClick: () => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
  onToggleShare: (id: string) => void;
}

// NoteEditor Props
export interface NoteEditorProps {
  note: Note | null;
  onSave: (noteData: Partial<Note>) => void;
  onClose: () => void;
  onTyping?: () => void;
  typingUsers?: User[];
}

// NoteFilters Props
export interface NoteFiltersProps {
  allTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

// NoteGrid Props
export interface NoteGridProps {
  notes: Note[];
  onNoteClick: (note: Note) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
  onToggleShare: (id: string) => void;
}

// NoteList Props
export interface NoteListProps {
  notes: Note[];
  onNoteClick: (note: Note) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
  onToggleShare: (id: string) => void;
}

// CollaboratorAvatar Props
export interface CollaboratorAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  showOnline?: boolean;
}

// TypingIndicator Props
export interface TypingIndicatorProps {
  users: User[];
}

// OnlineIndicator Props
export interface OnlineIndicatorProps {
  isOnline: boolean;
}

// CollaborationList Props
export interface CollaborationListProps {
  users: (User | string)[];
  maxVisible?: number;
}

// Sidebar Props
export interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

// Header Props
export interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNewNote: () => void;
  onMenuToggle: () => void;
}

// Layout Props
export interface LayoutProps {
  children: React.ReactNode;
}

// SearchBar Props
export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Button Props
export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

// Badge Props
export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "success" | "warning";
  onClick?: () => void;
  removable?: boolean;
}


