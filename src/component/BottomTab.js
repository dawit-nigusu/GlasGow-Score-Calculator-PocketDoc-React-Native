import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const menus = ["laptop", "search1", "hearto", "user"];
export default function BottomTab() {
  const [eyeValue, setEyeValue] = useState(0);
  return (
    <View style={styles.bottoms}>
     
      {menus.map((e, i) => {
        return (
          <TouchableOpacity key={e} onPress={() => setEyeValue(i) } style = {{color:'white'}}>
            <AntDesign
              name={e}
              size={20}
              color='white'
              
              style={{ marginLeft: 30, marginRight: 30 }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottoms: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginLeft:0,
    paddingHorizontal: 50,
    backgroundColor: "#89127E",
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    paddingBottom: 10,
  },
});
