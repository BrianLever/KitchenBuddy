import React, {useState,useLayoutEffect} from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity,ScrollView} from 'react-native';
import { useDispatch } from 'react-redux';
import store from '../../data/store';


function IngredientUpdateScreen(props) {
  useLayoutEffect(() => {
    navigation.setOptions({
        title: "Ingredient Data Update",
        headerRight: () => <View />,            
    });
  }, []);
  const { navigation, route } = props;
  const item = route.params?.category;  
  const id = item.id;
  const [ingredientName, setIngredientName] = useState(item.ingredientName);
  const [categoryName, setCategoryName] = useState(item.categoryName);
  const [ingredientLocation, setIngredientLocation] = useState(item.ingredientLocation);
  const [confectionType, setConfectionType] = useState(item.confectionType);
  const [expirationDate, setExpirationDate] = useState(item.expirationDate); 
  const [ripeStatus, setRipStatus] = useState(item.ripeStatus); 
  const [frozenStatus, setFrozenStatus] = useState(item.frozenStatus); 
  const [openStatus, setOpenStatus] = useState(item.openStatus); 
  const dispatch = useDispatch();  
  const onUpdate = () => {         
    console.log(openStatus);   
    dispatch({ type: 'UPDATE_OBJECT', payload: {id:id,ingredientName: ingredientName,
       categoryName: categoryName, ingredientLocation:ingredientLocation,confectionType:confectionType,
       expirationDate:expirationDate,ripeStatus:ripeStatus,frozenStatus:frozenStatus,openStatus:openStatus}});      
   navigation.navigate('Category');   
   const state = store.getState()
   console.log(state.ingredientArray);    
  };
  const openStatusValueChange = (value) => {
    setOpenStatus(value);    
  };

  return (
    <ScrollView>
      <View style={styles.container}>      
        <View style={styles.InputContainer}>
            <TextInput
                style={styles.body}
                placeholder="Ingredient Name"
                onChangeText={setIngredientName}
                value={ingredientName}
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
            />
        </View>
        <View style={styles.InputContainer}>
            <TextInput
            style={styles.body}
            placeholder="Category Name"
            onChangeText={setCategoryName}
            value={categoryName}
            placeholderTextColor="grey"
            underlineColorAndroid="transparent"
            />
        </View>        
      <View style={styles.InputContainer}>
        <TextInput
            style={styles.body}
            placeholder="Ingredient Location"
            onChangeText={setIngredientLocation}
            value={ingredientLocation}
            placeholderTextColor="grey"
            underlineColorAndroid="transparent"
        />     
      </View>    
      <View style={{flexDirection: 'row',marginLeft:25, marginRight:25 }}>
        <View style={styles.InputContainerThree}>
            <TextInput
                style={styles.body}
                placeholder="Confection Type"
                onChangeText={setConfectionType}
                value={confectionType}
                placeholderTextColor="grey"
                underlineColorAndroid="transparent"
            />   
        </View>
        <View style={styles.InputContainerThree}>
            <TextInput
              style={styles.body}
              editable = {confectionType=="Fresh" ? true : false}
              placeholder="Ripe Satus"              
              onChangeText={setRipStatus}
              value={ripeStatus}
              placeholderTextColor="grey"
              underlineColorAndroid="transparent"
            /> 
            {/* <Picker style={styles.pickerStyle}  
                selectedValue={ripeStatus}  
                onValueChange={(itemValue, itemPosition) =>                   
                setRipStatus(itemValue)}>  
                <Picker.Item label="green" value="green" />  
                <Picker.Item label="ripe" value="ripe" />  
                <Picker.Item label="advanced" value="advanced" />  
                <Picker.Item label="too ripe" value="too ripe" />                  
            </Picker>   */}
        </View>        
        <View style={styles.InputContainerThree}>
            <TextInput
              style={styles.body}
              editable = {confectionType=="Fresh" ? true : false}
              placeholder="Frozen Satus"              
              onChangeText={setFrozenStatus}
              value={frozenStatus}
              placeholderTextColor="grey"
              underlineColorAndroid="transparent"
            />  
            {/* <Picker style={styles.pickerStyle}                
                selectedValue={frozenStatus}  
                onValueChange={(itemValue, itemPosition) =>  
                setFrozenStatus(itemValue)}>  
                <Picker.Item label="frozen" value="frozen" />                                 
            </Picker>   */}
        </View>           
      </View>         
      <View style={styles.InputContainer}>
          <TextInput
              style={styles.body}
              placeholder="2023-04-19"              
              onChangeText={setExpirationDate}
              value={expirationDate}
              placeholderTextColor="grey"
              underlineColorAndroid="transparent"
            />          
        </View>  
        <View style={styles.InputContainer}>
          <TextInput
              style={styles.body}
              placeholder="Open Satus"              
              onChangeText={setOpenStatus}
              value={openStatus}
              placeholderTextColor="grey"
              underlineColorAndroid="transparent"
            />  
          {/* <Picker style={styles.pickerStyle} 
              selectedValue={openStatus}  
              onValueChange={(itemValue, itemPosition) =>                 
              setOpenStatus(itemValue)}>  
              <Picker.Item label="open" value="open" />                           
          </Picker>   */}
      </View>      
      <TouchableOpacity
        style={[styles.buttonContainer, {marginTop: 30}]}
        onPress={() => onUpdate()}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',   
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "green",
    marginTop: 10,
    marginBottom: 10,
  },
  centerTitle: {
    alignSelf: 'stretch',
    textAlign: 'center',   
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: 20,
    color: "#696969",
  },
  InputContainer: {
    width: "80%",
    marginTop: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: "grey",
    borderRadius:25,
  },
  InputContainerTwo: {
    width: "45%",    
    marginTop: 15,
    marginLeft:5,
    marginRight:5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: "grey",
    borderRadius:25,
  },
  InputContainerThree: {
    width: "30%",    
    marginTop: 15,
    marginLeft:5,
    marginRight:5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: "grey",
    borderRadius:25,
  },
  body: {    
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    color: "#696969",
  },
  pickerStyle:{  
    height: 50,  
    width: "100%",  
    color: '#344953',        
    textAlign: 'center',      
  },
  pickerItemStyle: {
    fontSize: 15,    
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',    
  },
  datePickerStyle: {
    height: 50, 
    width: "90%",   
  },
  buttonContainer: {
    alignItems: 'center',
    width: "70%",
    backgroundColor: "#ff5a66",
    borderRadius: 25,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
  },
});

export default IngredientUpdateScreen;
