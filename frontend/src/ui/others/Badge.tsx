import type { BadgeProps } from '../../types/types.d';

export const Badge = ({ children, variant = 'default', onClick, removable }: BadgeProps) => {
    const variants = {
        default: 'bg-gray-100 text-gray-700',
        primary: 'bg-blue-100 text-blue-700',
        success: 'bg-green-100 text-green-700',
        warning: 'bg-yellow-100 text-yellow-700',
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${onClick ? 'cursor-pointer hover:opacity-80' : ''}`}
            onClick={onClick}
        >
            {children}
            {removable && (
                <button className="ml-1 hover:text-gray-900">×</button>
            )}
        </span>
    );
};
