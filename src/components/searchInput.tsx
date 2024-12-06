import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import SearchIcon from '../assets/icons/check.svg';

const SearchInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');

  const handleInputChange = (newText: string) => {
    setText(newText);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={[styles.container, isFocused && styles.containerFocused]}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        onChangeText={handleInputChange}
        value={text}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <SearchIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,

    marginLeft: 8,
    width: 343,
  },
  containerFocused: {
    borderColor: '#D2D2D2',
    borderWidth: 1,
    borderRadius: 4,
  },
  input: {
    flex: 1,
    padding: 5,
    fontSize: 14,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginLeft: 10, // Adjust margin as needed
  },
});

export default SearchInput;
