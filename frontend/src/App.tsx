import { useState } from 'react';
import NoteCheck from './components/NoteCheck';
import ScamShield from './components/ScamShield';

type Tab = 'scam-shield' | 'note-check';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('scam-shield');

  return (
    <div className="mx-auto flex h-full max-w-lg flex-col bg-whatsapp-bg shadow-xl">
      {/* Header */}
      <header className="flex shrink-0 items-center gap-3 bg-whatsapp-dark px-4 py-3 text-white shadow-md">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
          <img src="/shield.svg" alt="" className="h-6 w-6" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <h1 className="text-base font-semibold leading-tight">RakshaAI</h1>
          <p className="text-xs text-green-200">Digital Public Safety Shield</p>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-green-400" aria-hidden="true" />
          <span className="text-xs text-green-200">Online</span>
        </div>
      </header>

      {/* Tab bar */}
      <nav
        className="flex shrink-0 border-b border-gray-200 bg-white"
        role="tablist"
        aria-label="Main navigation"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'scam-shield'}
          onClick={() => setActiveTab('scam-shield')}
          className={`flex flex-1 items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors ${
            activeTab === 'scam-shield'
              ? 'border-b-2 border-whatsapp-light text-whatsapp-dark'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span aria-hidden="true">🛡️</span>
          Scam Shield
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'note-check'}
          onClick={() => setActiveTab('note-check')}
          className={`flex flex-1 items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors ${
            activeTab === 'note-check'
              ? 'border-b-2 border-whatsapp-light text-whatsapp-dark'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span aria-hidden="true">💵</span>
          Note Check
        </button>
      </nav>

      {/* Tab content */}
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {activeTab === 'scam-shield' ? <ScamShield /> : <NoteCheck />}
      </main>
    </div>
  );
}
