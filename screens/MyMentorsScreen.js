import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { getMyMentors, findNewMentors } from "../Firebase/firestoreHelper";
import { Button, Icon } from "@rneui/themed";
import { Header } from "../components/Header";
import MyMentorsFlatList from "../components/MyMentorsFlatList";
import NewMentorsFlatList from "../components/NewMentorsFlatList";

const MyMentorsScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [viewStyle, setViewStyle] = useState("list");
  const [myMentors, setMyMentors] = useState([]);
  const [newMentors, setNewMentors] = useState([]);
  const [myMentorsFilter, setMyMentorsFilter] = useState(true);
  const [newMentorsFilter, setNewMentorsFilter] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    async function fetchMyMentors() {
      const mentors = await getMyMentors();
      setMyMentors(mentors);
    }

    fetchMyMentors();
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
          onPress={() => setViewStyle(viewStyle === "list" ? "grid" : "list")}
          icon={
            <Icon name={viewStyle === "list" ? "view-module" : "view-list"} />
          }
          type="clear"
        />
      </View>
      <View style={styles.filterContainer}>
        <Button
          title="My Mentors"
          onPress={() => setMyMentorsFilter(!myMentorsFilter)}
          type={myMentorsFilter ? "solid" : "outline"}
        />
        <Button
          title="New Mentors"
          onPress={() => setNewMentorsFilter(!newMentorsFilter)}
          type={newMentorsFilter ? "solid" : "outline"}
        />
      </View>
      {myMentorsFilter && (
        <MyMentorsFlatList
          data={filteredMyMentors}
          viewStyle={viewStyle}
          navigation={navigation}
          onFindNewMentorsPress={onFindNewMentorsPress}
          myMentors={myMentors}
          setMyMentors={setMyMentors}
        />
      )}
      {newMentorsFilter && (
        <NewMentorsFlatList
          data={newMentors}
          viewStyle={viewStyle}
          navigation={navigation}
          renderList={({ item }) => <MentorListItem item={item} />}
          renderGridItem={({ item }) => <MentorGridItem item={item} />}
          myMentors={myMentors}
          setMyMentors={setMyMentors}
          newMentors={newMentors}
          setNewMentors={setNewMentors}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginRight: 10,
  },
  switchButton: {
    padding: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
});

export default MyMentorsScreen;
