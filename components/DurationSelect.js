import { View, Text, StyleSheet } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";

const durationOptions = ["15 minutes", "30 minutes", "1 hour"];

export default function DurationSelect({ onSelectDuration }) {
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));

  const displayValue = durationOptions[selectedIndex.row];
  const renderOption = (title, index) => (
    <SelectItem key={index} title={title} />
  );

  return (
    <>
      
      <Select
        style={{ flex: 1 }}
        placeholder="Select duration"
        value={displayValue}
        selectedIndex={selectedIndex}
        onSelect={(index) => {setSelectedIndex(index); onSelectDuration(durationOptions[index.row])}}
      >
        {durationOptions.map(renderOption)}
      </Select>
    </>
  );
}

const styles = StyleSheet.create({});