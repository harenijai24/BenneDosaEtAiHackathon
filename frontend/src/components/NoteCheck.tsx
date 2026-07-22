import { useRef, useState } from 'react';
import { checkNote } from '../api/mockApi';
import type { NoteCheckResult } from '../types';
import LoadingSpinner from './LoadingSpinner';
import NoteResultCard from './NoteResultCard';

export default function NoteCheck() {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<NoteCheckResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (preview) URL.revokeObjectURL(preview);
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile || isAnalyzing) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      const analysis = await checkNote(selectedFile);
      setResult(analysis);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setSelectedFile(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="flex-1 px-4 py-6">
        {/* Header info */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp-light/10">
            <span className="text-2xl" aria-hidden="true">
              💵
            </span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Note Check</h2>
          <p className="mt-1 text-sm text-gray-500">
            Upload a photo of a currency note to check security features
          </p>
        </div>

        {/* Upload area */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click();
          }}
          className="relative cursor-pointer rounded-2xl border-2 border-dashed border-gray-300 bg-white p-6 text-center transition-colors hover:border-whatsapp-light hover:bg-green-50/30"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />

          {preview ? (
            <div className="flex flex-col items-center gap-3">
              <img
                src={preview}
                alt="Currency note preview"
                className="max-h-48 w-auto max-w-full rounded-xl object-contain shadow-md"
              />
              <p className="text-xs text-gray-500">
                {selectedFile?.name} · Tap to change
              </p>
            </div>
          ) : (
            <div className="py-4">
              <span className="text-4xl" aria-hidden="true">
                📷
              </span>
              <p className="mt-3 text-sm font-medium text-gray-700">
                Tap to upload or take a photo
              </p>
              <p className="mt-1 text-xs text-gray-400">
                JPG, PNG · Use good lighting for best results
              </p>
            </div>
          )}
        </div>

        {/* Action buttons */}
        {selectedFile && (
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp-light py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-whatsapp-dark active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Analyzing…
                </>
              ) : (
                'Analyze Note'
              )}
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={isAnalyzing}
              className="rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50"
            >
              Clear
            </button>
          </div>
        )}

        {/* Loading */}
        {isAnalyzing && (
          <div className="mt-4">
            <LoadingSpinner label="Checking security features…" />
          </div>
        )}

        {/* Result */}
        {result && !isAnalyzing && (
          <div className="mt-4">
            <NoteResultCard result={result} />
          </div>
        )}

        {/* Disclaimer */}
        <p className="mt-6 text-center text-[10px] leading-relaxed text-gray-400">
          Prototype heuristic check only — not a forensic classifier. Always
          verify with a bank or RBI guidelines for high-value transactions.
        </p>
      </div>
    </div>
  );
}
