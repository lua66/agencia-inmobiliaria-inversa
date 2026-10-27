import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useRouter, PageRoute } from '../router/RouterContext';

interface BreadcrumbItem {
  label: string;
  path?: PageRoute;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { navigate } = useRouter();

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <li className="inline-flex items-center">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Inicio</span>
          </button>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600" />
              {isLast || !item.path ? (
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  {item.label}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => item.path && navigate(item.path)}
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
