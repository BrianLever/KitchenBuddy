import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Text, View, Image, TouchableHighlight, Pressable } from "react-native";
import styles from "./styles";
import { TextInput } from "react-native-gesture-handler";
import { useSelector } from 'react-redux';
import { getCategoryUrl } from "../../data/MockDataAPI";
import { useNavigation } from '@react-navigation/native';
export default function SearchScreen() {
  const navigation = useNavigation();
  const categoryArray = useSelector(state => state.ingredientArray); 
  const [value, setValue] = useState("");
  const [expiringValue, setExpiringValue] = useState("");
  const [data, setData] = useState([]);
  const [expirationShow, setExpirationShow] = useState(false);
  useEffect(() => {
    console.log(categoryArray);
    if(categoryArray.length ==0){
      alert("No Data");
    }    
  }, [categoryArray]);
  useLayoutEffect(() => {
    navigation.setOptions({     
      title: "Search",
      headerLeft: () => (
        <View style={styles.searchContainer}>
          <Image style={styles.searchIcon} source={require("../../../assets/icons/search.png")} />
          <TextInput
            placeholder="ingredients expiring soon"
            style={styles.searchInputOne}
            onChangeText={expiringSoonHandleSearch}
            value={expiringValue}
          />
          <Pressable onPress={() => expiringSoonHandleSearch("")}>
          <Image style={styles.searchIcon} source={require("../../../assets/icons/close.png")} />
          </Pressable>
        </View>
      ),
      headerRight: () => (
        <View style={styles.searchContainerTwo}>
          <Image style={styles.searchIcon} source={require("../../../assets/icons/search.png")} />
          <TextInput
            style={styles.searchInput}
            onChangeText={handleSearch}
            value={value}
          />
          <Pressable onPress={() => handleSearch("")}>
          <Image style={styles.searchIcon} source={require("../../../assets/icons/close.png")} />
          </Pressable>
        </View>
      ),
    });
  }, [value,expiringValue]);

  // useEffect(() => {}, [value,expiringValue]);   

  const expiringSoonHandleSearch = (text) => {
    //console.log(text);    
    setExpiringValue(text);
    setExpirationShow(true);
    const currentDate = new Date();
    const currentSeconds = Math.floor(currentDate.getTime() / 1000);     
    var expiringSoonSearchArray =[];        
    if(text!=""){
      if(categoryArray.length!=0){
        categoryArray.map(item=>{
          const dateString = item.expirationDate;
          const expiringSeconds = Date.parse(dateString) / 1000;
          //console.log('left search', expiringSeconds,currentSeconds);          
          if((expiringSeconds>currentSeconds && (text.includes("expiring") || text.includes("soon")))){                                               
            expiringSoonSearchArray.push(item);
          }           
        });
      }   
      //console.log('left search', expiringSoonSearchArray); 
      if(expiringSoonSearchArray.length!=0){
        var searchArray = [...new Set(expiringSoonSearchArray)];
        //console.log('left search', searchArray);
        setData(searchArray);             
      }  
    }  
    else{
      setData([]);
    }         
  };

  const handleSearch = (text) => {
    //console.log(text);
    setValue(text);   
    setExpirationShow(false);
    var categoryNameSearchArray =[];
    var confectionTypeSearchArray =[];
    var ingredientLocationSearchArray =[];
    var missingDataSearchArray = [];
    if(text!=""){
      if(categoryArray.length!=0){
        categoryArray.map(item=>{
          if(item.categoryName==text){
            categoryNameSearchArray.push(item);
          }
          else if(item.confectionType==text){
            confectionTypeSearchArray.push(item);
          }
          else if(item.ingredientLocation==text){
            ingredientLocationSearchArray.push(item);
          }
          else if((item.ripeStatus=="" || item.frozenStatus=="" || item.openStatus=="") && (text=="missing")){
            missingDataSearchArray.push(item);
          }
          
        });
      }    
      if(categoryNameSearchArray.length!=0){
        var searchArray = [...new Set(categoryNameSearchArray)];
        setData(searchArray);
      }
      else if(confectionTypeSearchArray.length!=0){
        var searchArray = [...new Set(confectionTypeSearchArray)];
        setData(searchArray);
      }
      else if(ingredientLocationSearchArray.length!=0){
        var searchArray = [...new Set(ingredientLocationSearchArray)];
        setData(searchArray);
      }
      else if(missingDataSearchArray.length!=0){
        var searchArray = [...new Set(missingDataSearchArray)];
        setData(searchArray);
      }

    }   
    else{
      setData([]);
    }  
  };

  const onPressCategory = (item) => {    
    const category = item;
    navigation.navigate('Update', { category});
  };

  const renderCategory = ({ item }) => (          
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressCategory(item)}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: getCategoryUrl(item.categoryName) }} />
        <Text style={styles.categoriesName}>{item.ingredientName}</Text>        
        <Text style={styles.categoriesInfo}>{item.expirationDate}</Text>       
        <Text style={styles.categoriesInfo}>{expirationShow?getExpirationDate(item.expirationDate):""}</Text>   
      </View>      
    </TouchableHighlight>
  );
  const getExpirationDate =(dateString) =>{
    const currentDate = new Date();
    const currentSeconds = Math.floor(currentDate.getTime() / 1000); 
    const expiringSeconds = Date.parse(dateString) / 1000;
    let expirationDate = '';
    let date =0;
    //console.log(dateString, currentDate)
    if((expiringSeconds>currentSeconds)){
      date = Math.ceil((expiringSeconds-currentSeconds)/(24*3600));
      if(date<=1){
        expirationDate ="This product is expired after" + date+" day";
      }
      else{
        expirationDate ="This product is expired after"+ date+" days";
      }
    }   
    return expirationDate;
  }

  return (
    <View>       
      <FlatList data={data} renderItem={renderCategory} keyExtractor={(item) => `${item.id}`} />
    </View>
  );
}
