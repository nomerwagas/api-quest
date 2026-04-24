import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Share,
  Dimensions, 
  ActivityIndicator,
  Linking
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function PictureDetailScreen() {
  const route = useRoute();
  const { picture } = route.params;
  const [imageLoading, setImageLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    setImageLoading(true);
  }, [picture?.url]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this amazing NASA picture: ${picture.title}\n\n${picture.url}`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const openInBrowser = () => {
    if (picture.hdurl) {
      Linking.openURL(picture.hdurl);
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        {imageLoading && (
          <View style={styles.imageLoader}>
            <ActivityIndicator size="large" color="#60a5fa" />
          </View>
        )}
        <Image
          source={{ uri: picture.url }}
          style={styles.image}
          resizeMode="cover"
          onLoad={() => setImageLoading(false)}
        />
        <View style={styles.imageOverlay} />
      </View>

      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>{picture.title}</Text>
          
          <View style={styles.metadataTags}>
            <View style={styles.tag}>
              <Ionicons name="calendar" size={14} color="#60a5fa" />
              <Text style={styles.tagText}>{picture.date}</Text>
            </View>
            <View style={styles.tag}>
              <Ionicons name="image" size={14} color="#60a5fa" />
              <Text style={styles.tagText}>{picture.media_type}</Text>
            </View>
          </View>
        </View>

        <View style={styles.explanationContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={20} color="#cbd5e1" />
            <Text style={styles.sectionTitle}>About this image</Text>
          </View>
          <Text style={styles.explanation}>
            {showFullDescription 
              ? picture.explanation 
              : truncateText(picture.explanation, 220)}
          </Text>
          {picture.explanation.length > 220 && (
            <TouchableOpacity 
              onPress={() => setShowFullDescription(!showFullDescription)}
              style={styles.readMoreButton}
            >
              <Text style={styles.readMoreText}>
                {showFullDescription ? 'Show Less' : 'Read Full Description'}
              </Text>
              <Ionicons name={showFullDescription ? "chevron-up" : "chevron-down"} size={16} color="#60a5fa" />
            </TouchableOpacity>
          )}
        </View>

        {picture.copyright && (
          <View style={styles.copyrightContainer}>
            <Ionicons name="camera" size={16} color="#64748b" />
            <Text style={styles.copyrightText}>
              <Text style={styles.copyrightLabel}>Copyright: </Text>
              {picture.copyright}
            </Text>
          </View>
        )}

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={22} color="#f8fafc" />
            <Text style={styles.actionText}>Share Image</Text>
          </TouchableOpacity>
          
          {picture.hdurl && (
            <TouchableOpacity style={[styles.actionButton, styles.actionButtonPrimary]} onPress={openInBrowser}>
              <Ionicons name="expand-outline" size={22} color="#ffffff" />
              <Text style={styles.actionTextPrimary}>View HD</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05050f',
  },
  imageContainer: {
    width: width,
    height: width * 0.85,
    backgroundColor: '#0f0f1f',
    position: 'relative',
  },
  imageLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'transparent',
  },
  content: {
    padding: 24,
    marginTop: -20,
    backgroundColor: '#05050f',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  headerSection: {
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#f8fafc',
    marginBottom: 16,
    lineHeight: 34,
  },
  metadataTags: {
    flexDirection: 'row',
    gap: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e2e',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  tagText: {
    color: '#e2e8f0',
    fontSize: 13,
    fontWeight: '600',
  },
  explanationContainer: {
    backgroundColor: '#131320',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1e1e2e',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#cbd5e1',
  },
  explanation: {
    fontSize: 15,
    color: '#94a3b8',
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingVertical: 8,
    gap: 4,
  },
  readMoreText: {
    color: '#60a5fa',
    fontSize: 14,
    fontWeight: '600',
  },
  copyrightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f0f1f',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    gap: 8,
  },
  copyrightLabel: {
    color: '#64748b',
  },
  copyrightText: {
    color: '#94a3b8',
    fontSize: 13,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    backgroundColor: '#1e1e2e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2d2d3f',
    gap: 8,
  },
  actionButtonPrimary: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  actionText: {
    color: '#f8fafc',
    fontSize: 15,
    fontWeight: '600',
  },
  actionTextPrimary: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});