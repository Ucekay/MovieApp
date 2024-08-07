import { Pressable, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import type { Movie } from '@/types';
import { Link } from 'expo-router';

interface MovieListItemProps {
  movie: Movie;
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
    maxWidth: '50%',
    flex: 1,
    gap: 8,
    borderRadius: 16,
    borderCurve: 'continuous',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 16,
    borderCurve: 'continuous',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
