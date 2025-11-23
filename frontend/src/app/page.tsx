'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSession } from '../lib/supabase';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    const session = await getSession();
    if (session) {
      router.push('/dashboard');
    } else {
      setLoading(false);
    }
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
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Crisis Banner */}
      <div className="bg-red-600 text-white py-3 px-4 text-center text-sm">
        <strong>⚠️ IN CRISIS?</strong> Call 988 (US) | Text HOME to 741741 | Visit findahelpline.com
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-primary-600">OpenMindWell</span> 🌱
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
          A safe, anonymous space for mental health peer support. Chat, journal, track habits, and find resources.
        </p>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 max-w-3xl mx-auto mb-8">
          <h3 className="font-bold text-yellow-900 mb-2">⚠️ Important Disclaimer</h3>
          <p className="text-sm text-yellow-800">
            OpenMindWell is NOT a substitute for professional mental health care. This platform provides peer support only.
            If you are experiencing a mental health crisis, please contact emergency services or a crisis hotline immediately.
          </p>
        </div>

        <Link href="/onboarding" className="btn-primary inline-block text-lg px-8 py-3">
          Get Started →
        </Link>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What We Offer</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            emoji="💬"
            title="Anonymous Chat Rooms"
            description="Join peer support groups without revealing your identity. 6 rooms for different topics."
          />
          <FeatureCard
            emoji="🤖"
            title="AI Crisis Detection"
            description="Automatic detection of concerning messages with immediate resource suggestions."
          />
          <FeatureCard
            emoji="📝"
            title="Private Journaling"
            description="Track your mood, thoughts, and progress in a completely private journal."
          />
          <FeatureCard
            emoji="✅"
            title="Habit Tracking"
            description="Build positive daily habits with streak tracking and progress visualization."
          />
          <FeatureCard
            emoji="📚"
            title="Resource Library"
            description="Curated mental health resources, crisis hotlines, and coping exercises."
          />
          <FeatureCard
            emoji="🛡️"
            title="Volunteer Moderation"
            description="Community-driven safety with trained peer support volunteers."
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">OpenMindWell is 100% free and open-source</p>
          <p className="text-gray-400 text-sm">
            Remember: Seeking professional help is a sign of strength, not weakness.
          </p>
        </div>
      </footer>

      <Footer />
    </main>
  );
}

function FeatureCard({ emoji, title, description }: { emoji: string; title: string; description: string }) {
  return (
    <div className="card text-center">
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 text-center">
      <p className="text-sm">OpenMindWell is open-source. Together, we can make mental health support accessible to all.</p>
      <p className="text-xs mt-2 text-gray-400">Built with ❤️ by Team ZenYukti</p>
    </footer>
  );
}
