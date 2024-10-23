import { fetchGetPlayList } from '@/app/lib/api/fetchPlaylist';
import Image from 'next/image';
import { AddPlaylist } from '@/app/_component/AddPlaylist';

export default async function Home() {
  const { items } = await fetchGetPlayList();
  return (
    <div className="flex flex-row">
      <AddPlaylist />
      <section className="flex flex-col gap-2">
        {items.map(({ snippet: { thumbnails, title } }) => {
          return (
            <section
              className="flex items-center gap-2"
              key={thumbnails.default.url}
            >
              <Image
                src={thumbnails.default.url}
                alt="thumbnail"
                height={thumbnails.default.height}
                width={thumbnails.default.width}
              />
              <p>{title}</p>
            </section>
          );
        })}
      </section>
    </div>
  );
}
