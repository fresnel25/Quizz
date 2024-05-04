import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Colors from "../../Constants/Colors";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import ImageURL from "../../Constants/Image";

const { width, height } = Dimensions.get("window");

const Welcome = () => {
  const pages = [
    {
      backgroundColor: Colors.blue,
      image: (
        <View style={styles.lottie}>
          <LottieView source={ImageURL.animation3} autoPlay loop />
        </View>
      ),

      title: "Onboarding",
      subtitle: "test le Onboarding"
    },
    {
      backgroundColor: Colors.yellow,
      image: (
        <View style={styles.lottie}>
          <LottieView source={ImageURL.animation2} autoPlay loop />
        </View>
      ),
      title: "Onboarding",
      subtitle: "test le Onboarding"
    }
  ];

  return (
    <View style={styles.container}>
      <Onboarding pages={pages} />
    </View>
  );
};
export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  lottie: {
    width: width * 0.9,
    height: width,
    backgroundColor: Colors.white
  }
});
