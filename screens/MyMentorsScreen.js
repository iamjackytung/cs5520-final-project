import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import { getMyMentors, findNewMentors } from "../Firebase/firestoreHelper";
import { Button, Icon } from "@rneui/themed";
import { Header } from "../components/Header";
import MyMentorsFlatList from "../components/lists/MyMentorsFlatList";
import NewMentorsFlatList from "../components/lists/NewMentorsFlatList";

const MyMentorsScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [viewStyle, setViewStyle] = useState("list");
  const [myMentors, setMyMentors] = useState([]);
  const [newMentors, setNewMentors] = useState([]);
  const [myMentorsFilter, setMyMentorsFilter] = useState(true);
  const [newMentorsFilter, setNewMentorsFilter] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const unsubscribe = getMyMentors((mentors) => {
      setMyMentors(mentors);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function fetchNewMentors() {
      if (newMentorsFilter) {
        const mentors = await findNewMentors(searchText);
        setNewMentors(mentors);
      }
    }

    fetchNewMentors();
  }, [searchText, newMentorsFilter]);

  const filteredMyMentors = myMentors.filter((mentor) =>
    `${mentor.firstName} ${mentor.lastName}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const onFindNewMentorsPress = () => {
    setMyMentorsFilter(false);
    setNewMentorsFilter(true);
    searchInputRef.current.focus();
    setSearchText("");
  };

  return (
    <View style={styles.container}>
      <Header title="My Mentors" />
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
          style={styles.shadowProp}
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
      <View style={styles.filterContainer}>
        <Button
          title="My Mentors"
          onPress={() => setMyMentorsFilter(!myMentorsFilter)}
          type={myMentorsFilter ? "solid" : "outline"}
          buttonStyle={
            myMentorsFilter ? styles.activeButton : styles.inactiveButton
          }
          titleStyle={
            myMentorsFilter
              ? styles.activeButtonText
              : styles.inactiveButtonText
          }
          style={styles.shadowProp}
        />
        <Button
          title="New Mentors"
          onPress={() => setNewMentorsFilter(!newMentorsFilter)}
          type={newMentorsFilter ? "solid" : "outline"}
          buttonStyle={
            newMentorsFilter ? styles.activeButton : styles.inactiveButton
          }
          titleStyle={
            newMentorsFilter
              ? styles.activeButtonText
              : styles.inactiveButtonText
          }
          style={styles.shadowProp}
        />
      </View>
      <ScrollView>
        {myMentorsFilter && (
          <View style={styles.shadowProp}>
            <Text style={styles.listTitle}>My current mentors</Text>
            <MyMentorsFlatList
              data={filteredMyMentors}
              viewStyle={viewStyle}
              navigation={navigation}
              onFindNewMentorsPress={onFindNewMentorsPress}
              myMentors={myMentors}
              setMyMentors={setMyMentors}
            />
          </View>
        )}
        {newMentorsFilter && (
          <View style={styles.shadowProp}>
            <Text style={styles.listTitle}>Connect with new mentors</Text>
            <NewMentorsFlatList
              data={newMentors}
              viewStyle={viewStyle}
              navigation={navigation}
              renderList={({ item }) => <ListItem item={item} />}
              renderGridItem={({ item }) => <GridItem item={item} />}
              myMentors={myMentors}
              setMyMentors={setMyMentors}
              newMentors={newMentors}
              setNewMentors={setNewMentors}
            />
          </View>
        )}
      </ScrollView>
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
    backgroundColor: "#397af8",
    borderColor: "#397af8",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  inactiveButton: {
    backgroundColor: "transparent",
    borderColor: "#397af8",
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  activeButtonText: {
    color: "#ffffff",
  },
  inactiveButtonText: {
    color: "#397af8",
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10,
  },
  shadowProp: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});

export default MyMentorsScreen;
