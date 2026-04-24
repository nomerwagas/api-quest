import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Space Explorer</Text>
          <Text style={styles.subtitle}>Discover the Cosmos</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.heroContainer}>
             <Ionicons name="planet" size={80} color="#60a5fa" />
          </View>

          <Text style={styles.description}>
            Explore stunning images from NASA's Astronomy Picture of the Day (APOD) archive.
            Journey through space and witness breathtaking nebulae, galaxies, planets, and more.
          </Text>

          <View style={styles.features}>
            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="telescope-outline" size={28} color="#60a5fa" />
              </View>
              <Text style={styles.featureText}>Daily Images</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="images-outline" size={28} color="#60a5fa" />
              </View>
              <Text style={styles.featureText}>Curated Gallery</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="scan-outline" size={28} color="#60a5fa" />
              </View>
              <Text style={styles.featureText}>HD Quality</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.exploreButton}
            onPress={() => navigation.navigate('Gallery')}
            activeOpacity={0.8}
          >
            <Text style={styles.exploreButtonText}>Start Exploring</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Powered by NASA Open APIs</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#05050f',
  },
  container: {
    flex: 1,
    backgroundColor: '#05050f',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  heroContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.3)',
    shadowColor: '#60a5fa',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  description: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 40,
    fontWeight: '400',
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 50,
  },
  featureItem: {
    alignItems: 'center',
    width: width / 3 - 25,
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1e1e2e',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    fontWeight: '500',
  },
  exploreButton: {
    flexDirection: 'row',
    backgroundColor: '#2563eb',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  exploreButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonIcon: {
    marginLeft: 10,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '500',
  },
});