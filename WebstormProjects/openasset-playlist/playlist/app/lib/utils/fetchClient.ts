import { camelCase } from 'change-case/keys';

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

type InitType = RequestInit & { next: { revalidate: number } };

// Custom error class to include HTTP status
class FetchError extends Error {
  status: number;
  response: any;

  constructor(message: string, status: number, response: any) {
    super(message);
    this.name = 'FetchError';
    this.status = status;
    this.response = response;
  }
}

async function Fetch(endpoint: string, options?: Partial<InitType>) {
  let apiKeySearchParams: string;
  if (endpoint.includes('?')) apiKeySearchParams = `&key=${API_KEY}`;
  else apiKeySearchParams = `?key=${API_KEY}`;
  return handleFetch(`${YOUTUBE_BASE_URL}${endpoint}${apiKeySearchParams}`, {
    ...options,
    cache: 'no-store',
  });
}

async function ssgFetch(endpoint: string, options?: Partial<InitType>) {
  return handleFetch(`${YOUTUBE_BASE_URL}${endpoint}?key=${API_KEY}`, {
    ...options,
    cache: 'force-cache',
  });
}

async function isrFetch(
  endpoint: string,
  time = 0,
  tags?: string[],
  options?: Partial<InitType>,
) {
  return handleFetch(`${endpoint}`, {
    ...options,
    next: { revalidate: time, tags },
  });
}

async function handleFetch(
  url: string,
  options?: Partial<InitType>,
): Promise<any> {
  const isServer = typeof window === 'undefined';
  let headers: HeadersInit = {
    // 'Content-Type': 'application/json',
    ...options?.headers,
  };

  if (isServer) {
    // (headers as Record<string, string>)['Cookie'] =
    //   `access_token=${accessToken.value}`;
  }

  try {
    const response = await fetch(url, {
      credentials: 'include',
      ...options,
      headers,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new FetchError(
        `fetch 에러, status: ${response.status}`,
        response.status,
        errorData,
      );
    }

    return camelCase(await response.json(), 3);
  } catch (error) {
    console.error('fetch 에러:', error);

    if (error instanceof FetchError) {
      if (isServer) {
        if (error.status === 401) {
        } else {
        }
      } else {
        if (error.status === 401) {
        } else if (error.status === 500) {
        }
      }
    }

    throw error;
  }
}

export { Fetch, ssgFetch, isrFetch };
