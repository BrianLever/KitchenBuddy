import React, { useEffect, useLayoutEffect } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";
import { getCategoryUrl} from "../../data/MockDataAPI";
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

function CategoriesScreen() {  
  const categoryArray = useSelector(state => state.ingredientArray);  
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Categories",
      headerRight: () => <View />,
    });
  }, []);
  
  useEffect(() => {
    console.log(categoryArray);
  }, [categoryArray]);

  const onPressCategory = (item) => {    
    const category = item;
    navigation.replace('Update', { category});
  };

  const renderCategory = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressCategory(item)}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: getCategoryUrl(item.categoryName) }} />
        <Text style={styles.categoriesName}>{item.ingredientName}</Text>        
        <Text style={styles.categoriesInfo}>{item.expirationDate}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>       
      <FlatList data={categoryArray} renderItem={renderCategory} keyExtractor={(item) => `${item.id}`} />
    </View>
  );
}
export default CategoriesScreen;

