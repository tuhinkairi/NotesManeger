import { SearchBar } from '../others/Searchbar';
import { Button } from '../others/PrimaryBtn';
import type { HeaderProps } from '../../types/types.d';

export const Header = ({ searchQuery, onSearchChange, onNewNote, onMenuToggle }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search notes..."
            />
          </div>

          {/* New Note Button */}
          <Button
            onClick={onNewNote}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            <span className="hidden sm:inline">New Note</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
