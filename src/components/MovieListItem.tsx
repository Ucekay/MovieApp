import { Pressable, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import type { TVShow } from '@/types';
import { Link } from 'expo-router';

interface MovieListItemProps {
  movie: TVShow;
}

const MovieListItem = ({ movie }: MovieListItemProps) => {
  return (
    <Link href={`./${movie.id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          source={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          style={styles.image}
        />
      </Pressable>
    </Link>
  );
};

export default MovieListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    borderRadius: 16,
    overflow: 'hidden',
    borderCurve: 'continuous',
  },
  image: {
    width: '100%',
    aspectRatio: 2 / 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
