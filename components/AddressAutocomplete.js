import React, { useState, useEffect } from "react";
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import { Icon } from '@rneui/themed';
import { TouchableWithoutFeedback } from 'react-native';
import * as Location from "expo-location";
import { MAPS_API_KEY } from "@env";

// const movies = [
//   { title: 'Star Wars' },
//   { title: 'Back to the Future' },
//   { title: 'The Matrix' },
//   { title: 'Inception' },
//   { title: 'Interstellar' },
// ];

const filter = (item, query) => item.title.toLowerCase().includes(query.toLowerCase());

export default function AddressAutocomplete ({ onChangeLocation }) {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  const [location, setLocation] = useState(null);
  const [status, requestPermission] = Location.useForegroundPermissions();

  useEffect(() => {
    // getLocation();
  }, []);

  async function verifyPermissions() {
    try {
      if (!status?.granted) {
        const result = await requestPermission();
        if (!result.granted) {
          Alert.alert(
            "Insufficient permissions!",
            "You need to grant location permissions to use this app.",
            [{ text: "Okay" }]
          );
          return false;
        }
        return true;
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async function getLocation() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return; // return early if no permission
    }
    try {
      console.log("Getting location...");
      let result = await Location.getCurrentPositionAsync();
      console.log(result);
      let location = { longitude: result.coords.longitude, latitude: result.coords.latitude }
      setLocation(location);
      return location;
    } catch (error) {
      console.log(error);
    } 
  }

  async function getPlaceAutocompleteResults(query) {
    let currentLocation;
    // If the location is not set, get the current location
    if (!location) {
      currentLocation = await getLocation();
    } else {
      currentLocation = location;
    }
    let url = encodeURI(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&location=${currentLocation.latitude},${currentLocation.longitude}&radius=1000&key=${MAPS_API_KEY}`);
    // console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    const results = data["predictions"].map(item => ({title: item["description"]}));
    // console.log(results);
    setOptions(results);
    
  }

  const onSelect = (index) => {
    setValue(options[index].title);
  };

  const onChangeText = (query) => {
    getPlaceAutocompleteResults(query);

    onChangeLocation(query);

    setValue(query);
    setOptions(options.filter(item => filter(item, query)));
  };

  const renderOption = (item, index) => (
    <AutocompleteItem
      key={index}
      title={item.title}
    />
  );

  const renderCloseIcon = (props) => {
    return (
      <>
        {value.length > 0 && (
          <Icon {...props} type="antdesign" name="close" onPress={clearInput} />
        )}
      </>
    );
  };

  const clearInput = () => {
    setValue('');
    setOptions([]);
  };

  return (
    <Autocomplete
      style={{width: 300}}
      placeholder='Enter a location'
      accessoryRight={renderCloseIcon}
      value={value}
      onSelect={onSelect}
      onChangeText={onChangeText}>
      {options.map(renderOption)}
    </Autocomplete>
  );
};