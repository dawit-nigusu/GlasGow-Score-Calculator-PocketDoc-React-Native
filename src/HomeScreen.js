import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Row } from "native-base";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";

const W = Dimensions.get("window").width;
const Face = ({ icon, title, color, full }) => {
  return (
    <View style={styles.faceGroup}>
      {full ? (
        <View style={{ backgroundColor: color, borderRadius: 40 }}>
          <AntDesign
            name={icon}
            size={36}
            color={"#fff"}
            style={{ margin: 5 }}
          />
        </View>
      ) : (
        <MaterialIcons
          name={icon}
          size={36}
          color={color}
          style={{ margin: 5 }}
        />
      )}

      <Text style={[styles.faceText, { color }]}>{title}</Text>
    </View>
  );
};

export default function HomeScreen() {
  const [eyeData, seteyeData] = useState([]);
  const [verbalData, setVerbalData] = useState([]);
  const [motorData, setMotorData] = useState([]);
  const [P, setP] = useState(0);
  const [P1, setP1] = useState(0);
  const [P2, setP2] = useState(0);
  const [mortality, setMortality] = useState(0);
  const [total, setTotal] = useState(0);
  const [hinge, setHinge] = useState('');

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/eye_openings/").then(({ data }) => {
      seteyeData(data);
      console.log(data);
    });
  }, []);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/verbal_responses/")
      .then(({ data }) => {
        setVerbalData(data);
        console.log(data);
      });
  }, []);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/motor_responses/").then(({ data }) => {
      setMotorData(data);
      console.log(data);
    });
  }, []);

  useEffect(() => {
    setTotal(P + P1 + P2);
    if (total == 3 || total == 4) {
      setMortality(34);
    }
    if (total == 5 || total == 6) {
      setMortality(53);
    }
    if (total == 8 || total == 9 || total == 10) {
      setMortality(27);
    }
    if (total > 10) {
      setMortality(12);
    }
    if(total == 7){
      setHinge('7 IS A HINGE VALUE BELOW WHICH LIES A STATE OF SEVERE COMA')
    }
    else{
      setHinge('')
    }
  });

  const eyeDroppingData = [
    {
      label: "Spontaneous",
      selected: false,
      value: 4,
    },
    { label: "On Verbal Command", selected: true, value: 3 },
    {
      label: "To pain",
      selected: false,
      value: 2,
    },
    { label: "Nothing", selected: false, value: 1 },
  ];
  const verbalResponseData = [
    {
      label: "Appropraited,oriented",
      selected: false,
      value: 5,
    },
    { label: "Confused", selected: false, value: 4 },
    {
      label: "Inconsistent",
      selected: true,
      value: 3,
    },
    {
      label: "incomprehensible",
      selected: false,
      value: 2,
    },

    {
      label: "Nothing",
      selected: false,
      value: 1,
    },
  ];

  const motorResponseData = [
    {
      label: "Obdience to veerbal orders",
      selected: false,
      value: 6,
    },

    {
      label: "Pain-oriented reaction",
      selected: false,
      value: 5,
    },

    {
      label: "Non-oriented pain response",
      selected: false,
      value: 4,
    },
    {
      label: "With decortication type",
      selected: true,
      value: 3,
    },
    {
      label: "type of decerebration",
      selected: false,
      value: 2,
    },
    {
      label: "Nothig",
      selected: false,
      value: 1,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Glasgow Score</Text>
        <Text style={styles.desc}>How are you feeling today ?</Text>
      </View>
      <View >
        <Text style = {{color:'white'}}>Eye Opening (Y)</Text>
      </View>
      <DropDownPicker
        items={eyeDroppingData}
        onChangeItem={(item) => setP(item.value)}
        containerStyle={{ width: 300 }}
        style={{
          backgroundColor: "#fafafa",
          marginVertical: 10,
          borderRadius: 20,
        }}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        placeholder="select Eye Opening (Y)"
      />
      <View >
        <Text style = {{color:'white'}}>Verbal response (V)</Text>
      </View>
      <DropDownPicker
        items={verbalResponseData}
        onChangeItem={(item) => setP1(item.value)}
        containerStyle={{ width: 300 }}
        style={{ backgroundColor: "#fafafa", marginVertical: 10 }}
        itemStyle={{
          justifyContent: "flex-start",
        }}
      />
      <View >
        <Text style = {{color:'white'}}>Motor response (M)</Text>
      </View>
      <DropDownPicker
        items={motorResponseData}
        onChangeItem={(item) => setP2(item.value)}
        containerStyle={{ width: 300 }}
        style={{ backgroundColor: "#fafafa", marginVertical: 10 }}
        itemStyle={{
          justifyContent: "flex-start",
        }}
      />
      <View style={styles.resultContainer}>
        <View style={styles.left}>
          <Text style={styles.title}>Result</Text>
          <Text style={styles.num}>{total}</Text>
          <Text style={styles.hinge}>{hinge}</Text>
        </View>
        <View style={styles.right}>
          <View style={styles.itemRight}>
            <AntDesign name="arrowdown" color="#E35757" />
            <View style={styles.itemRightFill}>
              <Text style={styles.itemRightFillTitle}>{mortality}%</Text>
              <Text style={styles.itemRightFillDesc}>Mortality</Text>
            </View>
          </View>
          <View style={styles.itemRight}>
            <AntDesign name="arrowup" color={"#6AB276"} />
            <View style={styles.itemRightFill}>
              <Text style={styles.itemRightFillTitle}>{100 - mortality}%</Text>
              <Text style={styles.itemRightFillHealth}>Recovery</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rating: {
    flexDirection: "row",
    marginTop: 5,
  },
  tag: {
    color: "#B066A4",
  },

  margin: {
    height: 1,
    backgroundColor: "#F0F1F2",
    width: "100%",
    marginVertical: 10,
  },

  faceGroup: {
    justifyContent: "center",
    alignItems: "center",
    // flexDirection:'row',
    // justifyContent: 'space-between',
  },
  faceContainer: {
    backgroundColor: "#fff",
    padding: 10,
    paddingHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 20,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 30,
  },
  faceText: {
    fontSize: 16,
    marginTop: 6,
  },

  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 20,
    paddingHorizontal: 30,
    marginTop: 12,
    marginLeft: -30,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  desc: {
    fontSize: 15,
    fontWeight: "400",
    color: "#fff",
    marginTop: 5,
  },
  buttonBooks: {
    flexDirection: "row",
    marginTop: 20,
  },
  btnGradient: {
    padding: 10,
    borderRadius: 40,
  },
  btnBookText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  //   ------------------------
  resultContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 10,
    margin: 10,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: 10,
  },

  title: {
    fontSize: 15,
    color: "gray",
    fontWeight: "500",
  },
  itemRightFill: {
    marginLeft: 6,
  },
  num: {
    fontSize: 42,
    fontWeight: "500",
    color:"#613F7E"
  },
  hinge: {
    fontSize: 10,
    fontWeight: "100",
    color:'red'
  },
  left: {
    flex: 2,
    justifyContent: "center",
    marginLeft: 30,
    marginRight:10
  },
  right: {
    flex: 1,
    marginRight: 20,
  },

  itemRight: {
    flexDirection: "row",
    marginTop: 10,
  },
  itemRightFillTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemRightFillDesc: {
    color: "red",
    marginTop: 5,
  },
  itemRightFillHealth: {
    color: "green",
    marginTop: 5,
  },
});
