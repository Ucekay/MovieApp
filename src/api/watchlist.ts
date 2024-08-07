export const addMovieToWatchList = async (movieId) => {
  const url = 'https://api.themoviedb.org/3/account/21428603/watchlist';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDAxMzUxNTlmNTVlYWI0ZGUxZjM3YWM3MjI4NGMwNiIsIm5iZiI6MTcyMzA0MTA2MC4yMTg0NjIsInN1YiI6IjY2YjM3ZjQ0ZjdhMDYzMDZkODZmNmZkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QIZmElqVpv_fBJy_Lv06drAdemIMPxJZPXPzNIRpAf8',
    },
    body: JSON.stringify({
      media_type: 'movie',
      media_id: movieId,
      watchlist: true,
    }),
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Failed to fetch watch list');
  }
  const json = await res.json();
  return json;
};
