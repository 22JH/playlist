'use client';

import { useState } from 'react';
import { fetchInsertPlaylist } from '@/app/lib/api/fetchPlaylist';

export function AddPlaylist() {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const handleInsert = async () => {
    try {
      await fetchInsertPlaylist(videoUrl);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <section className="flex flex-row h-fit gap-2">
      <input
        className="min-w-[150px] h-fit border border-black"
        onBlur={(e) => setVideoUrl(e.target.value)}
      />
      <button onClick={handleInsert}>등록</button>
    </section>
  );
}
