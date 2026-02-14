import { Badge } from '../../others/Badge';
import type { NoteFiltersProps } from '../../../types/types.d';

export const NoteFilters = ({ allTags, selectedTags, onToggleTag, viewMode, onViewModeChange }: NoteFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      {/* Tag Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Filters:</span>
        {allTags.map(tag => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? 'primary' : 'default'}
            onClick={() => onToggleTag(tag)}
          >
            #{tag}
          </Badge>
        ))}
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => onViewModeChange('grid')}
          className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : 'text-gray-600'}`}
          title="Grid view"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>
        <button
          onClick={() => onViewModeChange('list')}
          className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : 'text-gray-600'}`}
          title="List view"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};
