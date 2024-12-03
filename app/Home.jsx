import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import Gif1 from "../assets/images/gif1.gif";
import Gif2 from "../assets/images/gif2.gif";
import Gif3 from "../assets/images/gif3.gif";
import AppStore from "../assets/images/AppStore.png";
import GooglePlay from "../assets/images/GooglePlay.png";
// import Selection from './Selection';
import Hero from "./Hero";
import HomeHero from "../assets/images/HomeHero.jpeg";
import Status from "./Status";

// Get the screen width
const screenWidth = Dimensions.get('window').width;

const Home = () => {
  // Define mobile styles that will be applied for screens smaller than 768px
  const isMobile = screenWidth <= 768;

  return (
    <ScrollView style={styles.home}>
      <Status />
      <Hero image={HomeHero} title="Quick Reliable Convenient" />
      
      <View style={[styles.container, isMobile && styles.mobileContainer]}>
        <View style={[styles.homeBanner, isMobile && styles.mobileHomeBanner]}>
          <View style={styles.bannerDetails}>
            <Text style={[styles.bannerHeading, isMobile && styles.mobileBannerHeading]}>Easy and Effortless Delivery</Text>
            <Text style={[styles.bannerDescription, isMobile && styles.mobileBannerDescription]}>
              Get your essentials delivered at lightning speed. Pay conveniently with card or cash upon arrival. Tracking made easy, from order to doorstep.
            </Text>
            <View style={[styles.downloadSection, isMobile && styles.mobileDownloadSection]}>
              <TouchableOpacity>
                <Image style={[styles.downloadIcon, isMobile && styles.mobileDownloadIcon]} source={AppStore} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image style={[styles.downloadIcon, isMobile && styles.mobileDownloadIcon]} source={GooglePlay} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.gifWrapper}>
            <Image style={styles.singleGif} source={Gif1} />
            <Image style={styles.singleGif} source={Gif3} />
            <Image style={styles.singleGif} source={Gif2} />
          </View>
        </View>

        {/* <View style={styles.selections}>
          <View style={styles.selectionSection}>
            <Text style={styles.selectionTitle}>🍕 Popular Italian Choices</Text>
            <Selection typeFilter="Italian" location="" count={5} />
          </View>

          <View style={styles.selectionSection}>
            <Text style={styles.selectionTitle}>📍 Kaslik Favorites</Text>
            <Selection typeFilter="" location="Kaslik" count={5} />
          </View>

          <View style={styles.selectionSection}>
            <Text style={styles.selectionTitle}>🍔 American Classics</Text>
            <Selection typeFilter="American" location="" count={5} />
          </View>
        </View> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  /* General Styles */
  home: {
    marginHorizontal: 40,
  },

  container: {
    padding: 20,
  },

  homeBanner: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingVertical: 20,
    color: '#333',
  },

  bannerDetails: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },

  bannerHeading: {
    fontSize: 40,
    color: '#00b391',
    fontWeight: 'bold',
  },

  bannerDescription: {
    fontSize: 18,
    lineHeight: 1.6,
    color: '#555',
    textAlign: 'center',
  },

  downloadSection: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },

  downloadIcon: {
    width: 160,
    height: 60,
    resizeMode: 'contain',
  },

  gifWrapper: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },

  singleGif: {
    width: 220,
    height: 220,
    borderRadius: 10,
    resizeMode: 'contain',
  },

  selections: {
    marginTop: 40,
  },

  selectionSection: {
    marginBottom: 40,
  },

  selectionTitle: {
    fontSize: 24,
    marginBottom: 10,
    color: '#333',
    textAlign: 'left',
  },

  /* Mobile Styles (for screens smaller than 768px) */
  mobileContainer: {
    marginHorizontal: 20,
  },

  mobileHomeBanner: {
    flexDirection: 'column',
    textAlign: 'center',
  },

  mobileBannerHeading: {
    fontSize: 32,
  },

  mobileBannerDescription: {
    fontSize: 14,
  },

  mobileDownloadSection: {
    justifyContent: 'center',
  },

  mobileDownloadIcon: {
    width: 140,
  },

  gifWrapper: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },

  singleGif: {
    width: 120,
    height: 120,
  },
});

export default Home;