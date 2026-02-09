import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { supabase } from './lib/supabase';
import type { LeaderboardUser } from './lib/types';
import { Podium } from './components/Podium';
import { RankingsList } from './components/RankingsList';
import { BottomNav } from './components/BottomNav';

function App() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'home' | 'tasks' | 'leaderboard' | 'profile'>('leaderboard');

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  async function fetchLeaderboard() {
    try {
      const { data, error } = await supabase
        .from('leaderboard_users')
        .select('*')
        .order('weekly_xp', { ascending: false });

      if (error) throw error;
      if (data) setUsers(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  }

  const topThree = users.slice(0, 3);
  const remaining = users.slice(3);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse">
          <Sparkles className="w-12 h-12 text-violet-500 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-transparent to-transparent pointer-events-none" />

        <header className="relative pt-8 pb-4 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-6 h-6 text-violet-400 animate-sparkle" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 via-purple-500 to-violet-600 bg-clip-text text-transparent">
                Leaderboard
              </h1>
              <Sparkles className="w-6 h-6 text-violet-400 animate-sparkle" style={{ animationDelay: '1s' }} />
            </div>
            <p className="text-gray-400 text-lg">Top Language Learners This Week</p>
          </div>
        </header>

        <Podium topThree={topThree} />

        <div className="mt-8">
          <RankingsList users={remaining} />
        </div>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
