import React from 'react';
import { Image } from 'react-native';
import shorthash from 'shorthash';
import * as FileSystem from 'expo-file-system';

export default class CacheImage extends React.Component {
  state = {
    source: null
  }
  componentDidMount = async () => {
    const { uri } = this.props;
    const { expires } = this.props;
    console.log(uri);
    const name = shorthash.unique(uri);
    const path = `${FileSystem.cacheDirectory}${name}`;
    const image = await FileSystem.getInfoAsync(path);

    // If image exists in cache, use it, but check age
    if (image.exists) {
      const timeNowInSeconds = Math.floor(Date.now() / 1000);
      const imageAgeInSeconds = timeNowInSeconds - image.modificationTime;
      this.setState({
        source: {
          uri: image.uri,
        }
      })
      // If image is recent, we're done
      if (imageAgeInSeconds < expires) {
        console.log('Using cached image:', image.uri, image.modificationTime, imageAgeInSeconds);
        return;
      }
    }
    // Image doesn't exist in cache or is too old, load it
    //try {
    const newImage = await FileSystem.downloadAsync(uri, path);
    console.log('Updating cache:', newImage.uri);
    this.setState({
      source: {
        uri: newImage.uri,
      }
    })
    //} catch (e) {
    //  console.log('error')
    // }
  }

  render() {
    return (
      <Image style={this.props.style} source={this.state.source} />
    )
  }
}