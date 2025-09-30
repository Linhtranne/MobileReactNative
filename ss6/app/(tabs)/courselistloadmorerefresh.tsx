import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';

const INITIAL_COURSES = [
  { id: '1', name: 'HTML' },
  { id: '2', name: 'CSS' },
  { id: '3', name: 'JavaScript' },
  { id: '4', name: 'Java' },
];

const MORE_COURSES = [
  { id: '5', name: 'Python' },
  { id: '6', name: 'PHP' },
  { id: '7', name: 'C#' },
];

const ALL_COURSES = [...INITIAL_COURSES, ...MORE_COURSES];

const CourseListLoadMoreRefresh: React.FC = () => {
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);

  const handleLoadMore = () => {
    if (!loadingMore && !loadedAll) {
      setLoadingMore(true);
      setTimeout(() => {
        setCourses(ALL_COURSES);
        setLoadingMore(false);
        setLoadedAll(true);
      }, 1000);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setCourses(INITIAL_COURSES);
      setLoadedAll(false);
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
        ListHeaderComponent={
          <View style={styles.headerBox}>
            <Text style={styles.headerText}>Danh sách khóa học</Text>
          </View>
        }
        ListFooterComponent={
          !loadedAll ? (
            <View style={styles.footerBox}>
              <TouchableOpacity
                style={styles.loadButton}
                onPress={handleLoadMore}
                disabled={loadingMore}
              >
                <Text style={styles.loadText}>{loadingMore ? 'Đang tải...' : 'Tải thêm'}</Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  headerBox: {
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  footerBox: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  loadButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
  },
  loadText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CourseListLoadMoreRefresh;
