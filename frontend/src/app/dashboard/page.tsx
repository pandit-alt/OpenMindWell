'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession, getCurrentUser, getProfile, signOut } from '../../lib/supabase';
import { roomsApi, resourcesApi } from '../../lib/api';

type Tab = 'rooms' | 'journal' | 'habits' | 'resources';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('rooms');
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const session = await getSession();
    if (!session) {
      router.push('/');
      return;
    }

    const user = await getCurrentUser();
    if (user) {
      const { data } = await getProfile(user.id);
      setProfile(data);
    }

    setLoading(false);
  }

  async function handleSignOut() {
    await signOut();
    router.push('/');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Crisis Banner */}
      <div className="bg-red-600 text-white py-2 px-4 text-center text-xs">
        ⚠️ IN CRISIS? Call 988 or Text HOME to 741741
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{profile?.avatar || '😊'}</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{profile?.nickname || 'User'}</h1>
              <p className="text-sm text-gray-500">OpenMindWell by ZenYukti</p>
            </div>
          </div>
          <button onClick={handleSignOut} className="text-sm text-gray-600 hover:text-gray-900">
            Sign Out
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="flex gap-8">
            <TabButton active={activeTab === 'rooms'} onClick={() => setActiveTab('rooms')}>
              💬 Rooms
            </TabButton>
            <TabButton active={activeTab === 'journal'} onClick={() => setActiveTab('journal')}>
              📝 Journal
            </TabButton>
            <TabButton active={activeTab === 'habits'} onClick={() => setActiveTab('habits')}>
              ✅ Habits
            </TabButton>
            <TabButton active={activeTab === 'resources'} onClick={() => setActiveTab('resources')}>
              📚 Resources
            </TabButton>
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'rooms' && <RoomsTab />}
        {activeTab === 'journal' && <JournalTab />}
        {activeTab === 'habits' && <HabitsTab />}
        {activeTab === 'resources' && <ResourcesTab />}
      </main>
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
        active
          ? 'border-primary-600 text-primary-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`}
    >
      {children}
    </button>
  );
}

function RoomsTab() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRooms();
  }, []);

  async function loadRooms() {
    try {
      const data = await roomsApi.getAll();
      setRooms(data);
    } catch (error) {
      console.error('Error loading rooms:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading rooms...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Support Rooms</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <div key={room.id} className="card hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="text-lg font-semibold mb-2">{room.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{room.description}</p>
            <button className="btn-primary w-full text-sm">Join Room →</button>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          💡 <strong>Tip:</strong> Chat functionality coming soon! For now, you can view available rooms.
        </p>
      </div>
    </div>
  );
}

function JournalTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Journal</h2>
        <button className="btn-primary">+ New Entry</button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <p className="text-yellow-900">
          📝 <strong>Journal feature coming soon!</strong> Track your thoughts, moods, and reflections.
        </p>
        <p className="text-sm text-yellow-800 mt-2">
          All journal entries are completely private and only visible to you.
        </p>
      </div>
    </div>
  );
}

function HabitsTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Habits</h2>
        <button className="btn-primary">+ New Habit</button>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <p className="text-green-900">
          ✅ <strong>Habit tracking coming soon!</strong> Build positive daily routines.
        </p>
        <p className="text-sm text-green-800 mt-2">
          Track streaks, log completions, and celebrate your progress.
        </p>
      </div>
    </div>
  );
}

function ResourcesTab() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    loadResources();
  }, [filter]);

  async function loadResources() {
    try {
      const data = await resourcesApi.getAll(filter || undefined);
      setResources(data);
    } catch (error) {
      console.error('Error loading resources:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading resources...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Mental Health Resources</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="input-field max-w-xs"
        >
          <option value="">All Categories</option>
          <option value="hotline">Crisis Hotlines</option>
          <option value="article">Articles</option>
          <option value="exercise">Exercises</option>
          <option value="video">Videos</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {resources.map((resource) => (
          <div key={resource.id} className="card">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold">{resource.title}</h3>
              <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                {resource.category}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
            {resource.url && (
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Learn More →
              </a>
            )}
          </div>
        ))}
      </div>

      {resources.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No resources found in this category.
        </div>
      )}
    </div>
  );
}
