import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Card, Text } from "@rneui/themed";
import ConnectionRequestItem from "../ConnectionRequestItem";

const ConnectionRequestFlatList = ({
  data,
  onAccept,
  onDecline,
  navigation,
}) => {
  const renderEmptyList = () => (
    <Card>
      <Card.Title h4>No Connection Requests</Card.Title>
      <Card.Divider />
      <Text style={styles.emptyText}>
        You don't have any pending connection requests.
      </Text>
    </Card>
  );

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <ConnectionRequestItem
          item={item}
          navigation={navigation}
          onAccept={() => {
            onAccept(item.uid);
          }}
          onDecline={() => {
            onDecline(item.uid);
          }}
        />
      )}
      keyExtractor={(item) => item.uid}
      ListEmptyComponent={renderEmptyList}
    />
  );
};

const styles = StyleSheet.create({
  emptyText: {
    marginBottom: 10,
    textAlign: "center",
  },
});

export default ConnectionRequestFlatList;
