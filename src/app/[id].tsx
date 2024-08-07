import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';

import { fetchMovie } from '@/api/movie';
import type { TVShowDetails } from '@/types';

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const {
    data,
    isLoading,
    error,
  }: {
    data?: TVShowDetails;
    isLoading: boolean;
    error: Error | null;
  } = useQuery({
    queryKey: ['movies', id],
    queryFn: () => fetchMovie(id),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <View>
      <Text style={styles.text}> {data.original_name}</Text>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
