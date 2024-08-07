const apiKey =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDAxMzUxNTlmNTVlYWI0ZGUxZjM3YWM3MjI4NGMwNiIsIm5iZiI6MTcyMzA0MTA2MC4yMTg0NjIsInN1YiI6IjY2YjM3ZjQ0ZjdhMDYzMDZkODZmNmZkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QIZmElqVpv_fBJy_Lv06drAdemIMPxJZPXPzNIRpAf8';
const headers = {
  accept: 'application/json',
  Authorization: `Bearer ${apiKey}`,
};

export const fetchTopRatedMovie = async () => {
  const url =
    'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers,
  };
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Failed to fetch top rated movies');
  }
  const json = await res.json();
  return json.results;
};

export const fetchMovie = async (id: string | string[]) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const options = {
    method: 'GET',
    headers,
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const json = await res.json();
  return json;
};
