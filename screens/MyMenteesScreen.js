import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { getMyMentees } from "../Firebase/firestoreHelper";
import { Button, Icon } from "@rneui/themed";
import { Header } from "../components/Header";
import MyMenteesFlatList from "../components/lists/MyMenteesFlatList";

const MyMenteesScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [viewStyle, setViewStyle] = useState("list");
  const [myMentees, setMyMentees] = useState([]);
  const [myMenteesFilter, setMyMenteesFilter] = useState(true);
  const searchInputRef = useRef(null);

  useEffect(() => {
    async function fetchMyMentees() {
      const mentees = await getMyMentees();
      setMyMentees(mentees);
    }

    fetchMyMentees();
  }, []);

  const filteredMyMentees = myMentees.filter((mentee) =>
    `${mentee.firstName} ${mentee.lastName}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Header title="My Mentees" />
      <View style={styles.searchContainer}>
        <TextInput
          ref={searchInputRef}
          style={styles.searchInput}
          onChangeText={setSearchText}
          value={searchText}
          placeholder="Search"
        />
        <Button
          containerStyle={styles.switchButton}
          onPress={() => setViewStyle(viewStyle === "list" ? "grid" : "list")}
          icon={
            <Icon
              size={35}
              name={viewStyle === "list" ? "view-module" : "view-list"}
            />
          }
          type="clear"
        />
      </View>
      {myMenteesFilter && (
        <View>
          <Text style={styles.listTitle}>My current mentees</Text>
          <MyMenteesFlatList
            data={filteredMyMentees}
            viewStyle={viewStyle}
            navigation={navigation}
            myMentees={myMentees}
            setMyMentees={setMyMentees}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8ff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 8,
    marginRight: 1,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  switchButton: {
    padding: 5,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  activeButton: {
    backgroundColor: "#008B8B",
    borderColor: "#008B8B",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  inactiveButton: {
    backgroundColor: "transparent",
    borderColor: "#008B8B",
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  activeButtonText: {
    color: "#ffffff",
  },
  inactiveButtonText: {
    color: "#008B8B",
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10,
  },
});

export default MyMenteesScreen;
