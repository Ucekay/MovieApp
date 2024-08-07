import { Text, ActivityIndicator, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { fetchMovie } from '@/api/movie';
import { addMovieToWatchList } from '@/api/watchlist';
import type { MovieDetails } from '@/types';

import { Image } from 'expo-image';
import { View } from '@/components/Themed';

const MovieDetail = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movie,
    isLoading,
    error,
  }: {
    data?: MovieDetails;
    isLoading: boolean;
    error: Error | null;
  } = useQuery({
    queryKey: ['movies', id],
    queryFn: () => fetchMovie(id),
  });

  const { mutate } = useMutation({
    mutationFn: () => addMovieToWatchList(id),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: movie?.id.toString() }} />
      <View style={styles.imageContainer}>
        <Image
          source={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}> {movie?.original_title}</Text>
        <Pressable style={styles.buttonContainer} onPress={() => mutate()}>
          <View style={styles.iconContainer}>
            <FontAwesome6 name='bookmark' size={16} color='black' />
          </View>
          <Text>Add to Watch List</Text>
        </Pressable>
        <Text style={styles.overview}>{movie?.overview}</Text>
      </View>
    </View>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  imageContainer: {
    backgroundColor: 'white',
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
    aspectRatio: 16 / 9,
    borderRadius: 16,
    borderCurve: 'continuous',
  },
  infoContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    gap: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  overview: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 100,
    borderCurve: 'continuous',
    borderColor: 'skyblue',
    borderWidth: 1,
  },
  iconContainer: {
    padding: 4,
    alignSelf: 'flex-start',
  },
});
