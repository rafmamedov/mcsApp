import { useFocusEffect, useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

const MapScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text>Map Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MapScreen;
