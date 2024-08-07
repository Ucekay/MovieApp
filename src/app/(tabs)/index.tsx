import { FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';

import { View } from '@/components/Themed';
import MovieListItem from '@/components/MovieListItem';
import { fetchTopRatedMovies } from '@/api/movie';
import { TVShow } from '@/types';

export default function TabOneScreen() {
  const {
    data: movies,
    isLoading,
    error,
  }: {
    data?: TVShow[];
    isLoading: boolean;
    error: Error | null;
  } = useQuery({
    queryKey: ['movies'],
    queryFn: fetchTopRatedMovies,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieListItem movie={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ gap: 16 }}
        contentContainerStyle={{ gap: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
