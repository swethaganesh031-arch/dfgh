import { Home, CheckSquare, Trophy, User } from 'lucide-react';

type NavItem = 'home' | 'tasks' | 'leaderboard' | 'profile';

interface BottomNavProps {
  activeTab: NavItem;
  onTabChange: (tab: NavItem) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const navItems: { id: NavItem; icon: typeof Home; label: string }[] = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
    { id: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-violet-500/20 z-50">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-around py-3">
          {navItems.map(({ id, icon: Icon, label }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'text-violet-400 scale-110'
                    : 'text-gray-500 hover:text-gray-300 hover:scale-105'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-6 h-6 transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]' : ''}`} />
                  {isActive && (
                    <div className="absolute inset-0 bg-violet-500 rounded-full blur-xl opacity-50 animate-pulse" />
                  )}
                </div>
                <span className={`text-xs font-medium ${isActive ? 'font-bold' : ''}`}>{label}</span>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
