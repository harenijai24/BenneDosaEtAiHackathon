import { useRef, useState, type KeyboardEvent } from 'react';
import { analyzeMessage } from '../api/mockApi';
import type { AnalysisResult, ChatMessage } from '../types';
import AnalysisResultCard from './AnalysisResultCard';
import LoadingSpinner from './LoadingSpinner';

interface ChatEntry {
  message: ChatMessage;
  result?: AnalysisResult;
  loading?: boolean;
}

export default function ScamShield() {
  const [input, setInput] = useState('');
  const [entries, setEntries] = useState<ChatEntry[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const handleAnalyze = async () => {
    const text = input.trim();
    if (!text || isAnalyzing) return;

    const message: ChatMessage = {
      id: crypto.randomUUID(),
      text,
      timestamp: new Date(),
    };

    const entryId = message.id;
    setEntries((prev) => [...prev, { message, loading: true }]);
    setInput('');
    setIsAnalyzing(true);
    scrollToBottom();

    try {
      const result = await analyzeMessage(text);
      setEntries((prev) =>
        prev.map((entry) =>
          entry.message.id === entryId
            ? { ...entry, result, loading: false }
            : entry,
        ),
      );
    } finally {
      setIsAnalyzing(false);
      scrollToBottom();
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAnalyze();
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex h-full flex-col">
      {/* Chat area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4">
        {entries.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-whatsapp-light/10">
              <span className="text-3xl" aria-hidden="true">
                🛡️
              </span>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Scam Shield</h2>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-500">
              Paste a call transcript, WhatsApp message, or SMS below. We'll
              analyze it for scam patterns in real time.
            </p>
            <div className="mt-4 rounded-xl bg-white/80 px-4 py-3 text-left text-xs text-gray-400 shadow-sm">
              <p className="font-medium text-gray-500">Try pasting:</p>
              <p className="mt-1 italic">
                "This is CBI officer Sharma. Your Aadhaar is linked to a money
                laundering case. Do not tell anyone. Share your OTP now or we
                will arrest you today."
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {entries.map(({ message, result, loading }) => (
            <div key={message.id} className="flex flex-col gap-2">
              {/* User bubble */}
              <div className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-whatsapp-bubble px-3.5 py-2.5 shadow-sm">
                  <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-gray-900">
                    {message.text}
                  </p>
                  <p className="mt-1 text-right text-[10px] text-gray-500">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>

              {/* Analysis result */}
              {loading && (
                <div className="self-start">
                  <LoadingSpinner label="Analyzing message…" size="sm" />
                </div>
              )}
              {result && <AnalysisResultCard result={result} />}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input bar */}
      <div className="border-t border-gray-200 bg-white px-3 py-3">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste message or transcript…"
            rows={2}
            disabled={isAnalyzing}
            className="flex-1 resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-whatsapp-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-whatsapp-light/30 disabled:opacity-60"
          />
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={!input.trim() || isAnalyzing}
            className="flex h-11 min-w-[5.5rem] shrink-0 items-center justify-center rounded-full bg-whatsapp-light px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-whatsapp-dark active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isAnalyzing ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              'Analyze'
            )}
          </button>
        </div>
        <p className="mt-1.5 text-center text-[10px] text-gray-400">
          Press Enter to analyze · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
