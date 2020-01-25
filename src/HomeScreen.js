import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  Image,
  StyleSheet,
  View,
  Animated,
  Platform,
} from 'react-native';

const MAX_HEADER_HEIGHT = 340;
const MIN_HEADER_HEIGHT = 80;
const HEADER_TRANSLATE = MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT;

export default class HomeScreen extends Component {
  state = {
    scrollOffset: new Animated.Value(Platform.OS === 'ios' ? 0 : 0),
  };

  constructor(props) {
    super(props);

    this.titleOffset = 0;
  }

  render() {
    const data = Array.from({length: 200}, (v, i) => i);

    const scollY = Animated.add(
      this.state.scrollOffset,
      Platform.OS === 'ios' ? 0 : 0,
    );
    const topViewHeightInterpolation = scollY.interpolate({
      inputRange: [0, HEADER_TRANSLATE],
      outputRange: [0, -HEADER_TRANSLATE],
      extrapolate: 'clamp',
    });

    const imageTranslation = scollY.interpolate({
      inputRange: [0, HEADER_TRANSLATE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    const imageOpacity = scollY.interpolate({
      inputRange: [0, HEADER_TRANSLATE / 2, HEADER_TRANSLATE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });

    const backgroundColor = scollY.interpolate({
      inputRange: [0, HEADER_TRANSLATE - 50, HEADER_TRANSLATE],
      outputRange: ['#fff', '#fff', 'rgb(40,131,130)'],
      extrapolate: 'clamp',
    });

    const fontSizeInterpolation = scollY.interpolate({
      inputRange: [0, HEADER_TRANSLATE],
      outputRange: [50, 24],
      extrapolate: 'clamp',
    });

    const translateXInterpolation = scollY.interpolate({
      inputRange: [0, HEADER_TRANSLATE],
      outputRange: [0, -100],
      extrapolate: 'clamp',
    });

    return (
      <View>
        <Animated.ScrollView
          contentContainerStyle={{paddingTop: MAX_HEADER_HEIGHT}}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: this.state.scrollOffset}}},
          ])}>
          {data.map((v, i) => {
            return (
              <Text key={i} style={localStyle.textStyle}>
                {i}
              </Text>
            );
          })}
        </Animated.ScrollView>

        <Animated.View
          style={[
            {
              height: MAX_HEADER_HEIGHT,
              transform: [{translateY: topViewHeightInterpolation}],
              backgroundColor: backgroundColor,
              // opacity: imageOpacity,
            },
            localStyle.topViewStyle,
          ]}>
          <Animated.Image
            style={[
              localStyle.imgStyle,
              {
                transform: [{translateY: imageTranslation}],
                opacity: imageOpacity,
              },
            ]}
            source={require('./calm.png')}
          />
          <Animated.Text
            style={[localStyle.titleStyle, {fontSize: fontSizeInterpolation}]}>
            Expandable Bar
          </Animated.Text>
        </Animated.View>
      </View>
    );
  }
}

const localStyle = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    lineHeight: 34,
    textAlign: 'center',
  },

  topViewStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },

  imgStyle: {
    top: 0,
    left: 0,
    right: 0,
    height: MAX_HEADER_HEIGHT,
    width: null,
    resizeMode: 'cover',
  },

  titleStyle: {
    left: 16,
    color: 'white',
    right: 0,
    bottom: 10,
    position: 'absolute',
    // fontSize: 60,
    // textAlign: 'center',
  },
});
