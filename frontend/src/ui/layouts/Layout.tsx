import type { LayoutProps } from '../../types/types.d';

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {children}
    </div>
  );
};
