import { getNoteVerdictStyle } from '../api/mockApi';
import type { NoteCheckResult } from '../types';

interface NoteResultCardProps {
  result: NoteCheckResult;
}

export default function NoteResultCard({ result }: NoteResultCardProps) {
  const style = getNoteVerdictStyle(result.verdict);

  return (
    <div className="animate-fade-in overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
      {/* Verdict banner */}
      <div className={`border-b px-4 py-4 ${style.bg} ${style.border}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">
              {result.verdict === 'likely_genuine'
                ? '✅'
                : result.verdict === 'likely_fake'
                  ? '🚫'
                  : '❓'}
            </span>
            <span className={`text-lg font-bold ${style.text}`}>{style.label}</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Confidence</p>
            <p className={`text-2xl font-bold tabular-nums ${style.text}`}>
              {result.confidence}%
            </p>
          </div>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/60">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              result.verdict === 'likely_genuine'
                ? 'bg-green-500'
                : result.verdict === 'likely_fake'
                  ? 'bg-red-500'
                  : 'bg-amber-500'
            }`}
            style={{ width: `${result.confidence}%` }}
          />
        </div>
      </div>

      {/* Notes */}
      <div className="px-4 py-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Analysis Notes
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-gray-700">{result.notes}</p>
      </div>
    </div>
  );
}
