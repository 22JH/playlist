const THUMBNAIL_KEYS = ['default', 'medium', 'standard', 'maxres'] as const;

interface PlaylistThumbnailType {
  url: string;
  width: number;
  height: number;
}

interface PlaylistSnippetType {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string | TrustedHTML;
  thumbnails: Record<(typeof THUMBNAIL_KEYS)[number], PlaylistThumbnailType>;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: {
    kind: string;
    videoId: string;
  };
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
}

export interface PlaylistItemType {
  kind: string;
  etag: string;
  snippet: PlaylistSnippetType;
}

export interface FetchGetPlaylistResponseType {
  kind: string;
  etag: string;
  items: PlaylistItemType[];
}
