import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { getMyMentors } from "../Firebase/firestoreHelper";
import { ListItem, Avatar, Button, Icon, Card, Text } from "@rneui/themed";
import { Header } from "../components/Header";

const MyMentorsScreen = ({ navigation }) => {
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
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ClickedProfile", {
          userData: item,
        });
      }}
    >
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
    <TouchableOpacity style={styles.gridItem}>
      <Avatar size="large" source={{ uri: item.profilePictureUrl }} />
      <ListItem.Content>
        <ListItem.Title>{`${item.firstName} ${item.lastName}`}</ListItem.Title>
        <ListItem.Subtitle>{`${item.jobTitle}`}</ListItem.Subtitle>
      </ListItem.Content>
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <Card>
      <Card.Title h4>You have no mentors</Card.Title>
      <Card.Divider />
      <Text style={styles.emptyText}>
        It seems you don't have any mentors yet. Click the button below to
        search for new mentors.
      </Text>
      <Button
        title="Find Mentors"
        onPress={() => navigation.navigate("MentorsSearch")}
        containerStyle={styles.findMentorsButton}
      />
    </Card>
  );

  return (
    <View style={styles.container}>
      <Header title="My Mentors" />
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
        keyExtractor={(item) => item.id}
        numColumns={viewStyle === "list" ? 1 : 2}
        key={viewStyle}
        ListEmptyComponent={renderEmptyList}
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

  emptyText: {
    marginBottom: 10,
    textAlign: "center",
  },

  findMentorsButton: {
    alignSelf: "center",
    marginBottom: 10,
  },
});

export default MyMentorsScreen;
