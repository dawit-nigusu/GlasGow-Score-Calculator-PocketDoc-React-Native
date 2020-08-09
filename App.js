import React from "react";
import { Text, View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import BottomTab from "./src/component/BottomTab";
import HomeScreen from "./src/HomeScreen";
import BackgroundHeader from "./src/component/BackgroundHeader";

export default class App extends React.Component {
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <Text>Hello</Text>
          <BackgroundHeader style={styles.bg} />
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <HomeScreen />
          </ScrollView>
          <BottomTab />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1ff",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:"#323432"
  },
  bg: {
    position: "absolute",
    width: Dimensions.get("window").width,
  },
  scrollView: {
    flex: 1,
  },
});
