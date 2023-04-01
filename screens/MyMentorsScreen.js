import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { getMyMentors } from "../Firebase/firestoreHelper";
import { ListItem, Avatar, Button, Icon } from "@rneui/themed";

const MyMentorsScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [viewStyle, setViewStyle] = useState("list");
  const [myMentors, setMyMentors] = useState([]);

  useEffect(() => {
    async function fetchMyMentors() {
      const mentors = await getMyMentors();
      setMyMentors(mentors);
    }

    fetchMyMentors();
  }, []);

  const filteredUsers = myMentors.filter((mentor) =>
    `${mentor.firstName} ${mentor.lastName}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const renderList = ({ item }) => (
    <TouchableOpacity key={item.userId}>
      <ListItem bottomDivider>
        <Avatar source={{ uri: item.profilePictureUrl }} />
        <ListItem.Content>
          <ListItem.Title>{`${item.firstName} ${item.lastName}`}</ListItem.Title>
          <ListItem.Subtitle>{`${item.jobTitle}`}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );

  const renderGridItem = ({ item }) => (
    <TouchableOpacity key={item.userId} style={styles.gridItem}>
      <Avatar size="large" source={{ uri: item.profilePictureUrl }} />
      <ListItem.Content>
        <ListItem.Title>{`${item.firstName} ${item.lastName}`}</ListItem.Title>
        <ListItem.Subtitle>{`${item.jobTitle}`}</ListItem.Subtitle>
      </ListItem.Content>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
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
      <FlatList
        data={filteredUsers}
        renderItem={viewStyle === "list" ? renderList : renderGridItem}
        keyExtractor={(item) => item.userId}
        numColumns={viewStyle === "list" ? 1 : 2}
      />
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
    paddingTop: 50,
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

  gridItem: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default MyMentorsScreen;
