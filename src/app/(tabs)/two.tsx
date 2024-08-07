import { FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';

import { View } from '@/components/Themed';
import MovieListItem from '@/components/MovieListItem';
import { fetchWatchList } from '@/api/watchlist';
import { Movie } from '@/types';

export default function WatchList() {
  const {
    data: movies,
    isLoading,
    error,
  }: {
    data?: Movie[];
    isLoading: boolean;
    error: Error | null;
  } = useQuery({
    queryKey: ['watchlist'],
    queryFn: fetchWatchList,
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
        contentContainerStyle={{ padding: 16, gap: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
