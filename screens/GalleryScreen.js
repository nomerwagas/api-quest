import React, { useState, useEffect, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  TextInput,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchAPODPictures } from '../services/nasaApi';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function GalleryScreen() {
  const navigation = useNavigation();
  const [pictures, setPictures] = useState([]);
  const [filteredPictures, setFilteredPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const loadPictures = useCallback(async () => {
    const result = await fetchAPODPictures(30);
    if (result.success) {
      const validPictures = result.data.filter(pic => pic.media_type === 'image');
      setPictures(validPictures);
      setFilteredPictures(validPictures);
      setError(null);
    } else {
      setError(result.error);
    }
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    loadPictures();
  }, [loadPictures]);

  useEffect(() => {
    let filtered = pictures;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(pic => 
        pic.title?.toLowerCase().includes(query) ||
        pic.explanation?.toLowerCase().includes(query)
      );
    }
    
    if (filterType !== 'all') {
      filtered = filtered.filter(pic => {
        if (filterType === 'image') return pic.media_type === 'image';
        if (filterType === 'video') return pic.media_type === 'video';
        if (filterType === 'today') {
          const today = new Date().toISOString().split('T')[0];
          return pic.date === today;
        }
        return true;
      });
    }
    
    setFilteredPictures(filtered);
  }, [searchQuery, filterType, pictures]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPictures();
  }, [loadPictures]);

  const openDetail = (picture) => {
    navigation.navigate('PictureDetail', { picture });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => openDetail(item)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: item.url }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.cardDateContainer}>
          <Ionicons name="calendar-outline" size={12} color="#64748b" />
          <Text style={styles.cardDate}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#60a5fa" />
        <Text style={styles.loadingText}>Loading cosmic images...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle-outline" size={60} color="#ef4444" style={styles.errorIcon} />
        <Text style={styles.errorText}>Oops! Something went wrong</Text>
        <Text style={styles.errorDetail}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadPictures}>
          <Ionicons name="refresh" size={18} color="#fff" />
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#64748b" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search the universe..."
            placeholderTextColor="#64748b"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearIcon}>
              <Ionicons name="close-circle" size={20} color="#64748b" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={[styles.filterButton, filterType === 'all' && styles.filterButtonActive]}
            onPress={() => setFilterType('all')}
          >
            <Text style={[styles.filterText, filterType === 'all' && styles.filterTextActive]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filterType === 'today' && styles.filterButtonActive]}
            onPress={() => setFilterType('today')}
          >
            <Text style={[styles.filterText, filterType === 'today' && styles.filterTextActive]}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filterType === 'image' && styles.filterButtonActive]}
            onPress={() => setFilterType('image')}
          >
            <Text style={[styles.filterText, filterType === 'image' && styles.filterTextActive]}>Images</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredPictures}
        renderItem={renderItem}
        keyExtractor={item => item.date}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={['#60a5fa']}
            tintColor="#60a5fa"
          />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="telescope-outline" size={60} color="#334155" />
            <Text style={styles.emptyText}>No pictures found</Text>
            <Text style={styles.emptySubText}>Try adjusting your search</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05050f',
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#05050f',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  headerContainer: {
    backgroundColor: '#0f0f1f',
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1e1e2e',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e2e',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#2d2d3f',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#f8fafc',
    fontSize: 16,
    height: '100%',
  },
  clearIcon: {
    padding: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1e1e2e',
    borderWidth: 1,
    borderColor: '#2d2d3f',
  },
  filterButtonActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  filterText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#131320',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1e1e2e',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 140,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    color: '#f8fafc',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  cardDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardDate: {
    color: '#64748b',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  loadingText: {
    color: '#94a3b8',
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  errorIcon: {
    marginBottom: 16,
  },
  errorText: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorDetail: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 24,
    textAlign: 'center',
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: '#cbd5e1',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubText: {
    color: '#64748b',
    fontSize: 14,
    marginTop: 8,
  },
});