import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const W = Dimensions.get("window").width;

export default function BackgroundHeader({style}) {
  return (
    <>  
      <LinearGradient
        start = {{x:0,y:0}}
        start = {{x:1,y:0}}
        
        colors={["#5D0E7F", "#7A007E","#9C007F"]}
        style={[styles.linearGradient,style]}
      >
          <View style = {styles.line} />

          <View style = {[styles.line, {top:130,left:-150}]} />
          <View style = {[styles.line, {top:160,left:0}]} />
          </LinearGradient>

    </>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    height: (W * 3) / 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    borderBottomRightRadius:50,
    borderBottomLeftRadius:50
   
  },
  line:{
    height: 80,
    width: W,
    position: "absolute",
    left: -300,
    
    top: 100,
    backgroundColor:'rgba(255,255,255,0.1)',
    transform:[
        {
            rotate:'-35deg',
        }
    ],
    borderRadius:60,
  }
});
