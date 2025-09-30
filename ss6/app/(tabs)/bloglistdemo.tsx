import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

// Dữ liệu bài viết giả lập
const initialPosts = [
 {
    id: "1",
    title: "React Native là gì?",
    author: "John Doe",
    date: "2021-09-01",
  },
  {
    id: "2",
    title: "Làm quen với Redux",
    author: "Jane Smith",
    date: "2021-09-05",
  },
  {
    id: "3",
    title: "Giới thiệu về JavaScript",
    author: "Alice Johnson",
    date: "2021-09-10",
  },
  {
    id: "4",
    title: "Hướng dẫn CSS Flexbox",
    author: "Bob Brown",
    date: "2021-09-12",
  },
  {
    id: "5",
    title: "Học lập trình web từ đâu?",
    author: "Charlie Davis",
    date: "2021-09-15",
  },
];

const morePosts = [
  {
    id: "6",
    title: "Tìm hiểu về Node.js",
    author: "David Green",
    date: "2021-09-20",
  },
  {
    id: "7",
    title: "JavaScript Asynchronous Programming",
    author: "Eve White",
    date: "2021-09-22",
  },
  {
    id: "8",
    title: "React vs Angular",
    author: "Frank Black",
    date: "2021-09-25",
  },
  {
    id: "9",
    title: "Học lập trình Python",
    author: "Grace Blue",
    date: "2021-09-27",
  },
  {
    id: "10",
    title: "Sử dụng Git hiệu quả",
    author: "Hannah Red",
    date: "2021-09-30",
  },
];

interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
}

const BlogListDemo: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasLoadedMore, setHasLoadedMore] = useState(false);

  const handleLoadMore = () => {
    if (!loadingMore && !hasLoadedMore) {
      setLoadingMore(true);
      setTimeout(() => {
        setPosts(prev => [...prev, ...morePosts]);
        setLoadingMore(false);
        setHasLoadedMore(true);
      }, 1500);
    }
  };

  const renderItem = ({ item }: { item: BlogPost }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>Tác giả: {item.author}</Text>
      <Text style={styles.date}>Ngày đăng: {item.date}</Text>
    </View>
  );

  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>
        Danh sách bài viết ({posts.length})
      </Text>
    </View>
  );

  const ListFooter = () => (
    loadingMore ? (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="small" color="#007AFF" />
        <Text style={styles.footerText}>Đang tải thêm...</Text>
      </View>
    ) : null
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  author: {
    fontSize: 15,
    color: '#444',
    marginTop: 4,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  footerContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    marginTop: 8,
    fontSize: 14,
    color: '#007AFF',
  },
});

export default BlogListDemo;
