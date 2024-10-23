import { Fetch } from '@/app/lib/utils/fetchClient';
import { FetchGetPlaylistResponseType } from '@/app/lib/types/api/PlaylistType';

const PLAY_LIST_ID = 'PLUT8xjkR6HxpAXHNIbj-0UEdlFrdOJtoE';

export const fetchGetPlayList =
  async (): Promise<FetchGetPlaylistResponseType> => {
    return Fetch(
      `/playlistItems?part=snippet&maxResults=50&status=&playlistId=${PLAY_LIST_ID}`,
    );
  };

export const fetchInsertPlaylist = async (videoUrl: string) => {
  console.log(videoUrl);
  const url = new URL(videoUrl);
  const videoId = url.searchParams.get('v');
  if (!videoId) throw new Error('url 이상함');

  return Fetch(`/playlistItems?part=contentDetails,id,snippet,status`, {
    method: 'POST',
    body: JSON.stringify({
      snippet: {
        playlistId: PLAY_LIST_ID,
        resourceId: {
          kind: 'youtube#video',
          videoId,
        },
      },
    }),
  });
};
