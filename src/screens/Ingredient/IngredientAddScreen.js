import React, {useState,useLayoutEffect} from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity,ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import store from '../../data/store';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';


function IngredientAddScreen() {
  const [ingredientName, setIngredientName] = useState('');
  const [categoryName, setCategoryName] = useState('Fruit');
  const [ingredientLocation, setIngredientLocation] = useState('Fridge');
  const [confectionType, setConfectionType] = useState('Fresh');
  const [expirationDate, setExpirationDate] = useState(''); 
  const [expirationWDM, setExpirationWDM] = useState('Week'); 
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Home",
      headerRight: () => <View />,
    });
  }, []);
  const dispatch = useDispatch();  
  const onAdd = () => {   
    if (!ingredientName.trim()) {
      alert('Please Enter Ingredient Name');
      return;
    }
    if (!expirationDate.trim()) {
      alert('Please Enter Expiration Date');
      return;
    }
    if (expirationDate.trim()=="0") {
      alert('Please Enter Correct Date');
      return;
    }
    let dateStr = expirationDate.trim();    
    const isValidDate = moment(dateStr, 'YYYY-MM-DD', true).isValid();
    if (!isValidDate) {      
      if(expirationWDM.includes("Day")){
        const myInt = parseInt(dateStr, 10);
        const currentDate = moment();
        const newDate = moment(currentDate).add(myInt, 'days');
        const formattedDate = newDate.format('YYYY-MM-DD');
        dateStr = formattedDate;
      } 
      else if(expirationWDM.includes("Week")){
        const myInt = parseInt(dateStr, 10);
        const currentDate = moment();
        const newDate = moment(currentDate).add(myInt*7, 'days');
        const formattedDate = newDate.format('YYYY-MM-DD');
        dateStr = formattedDate;
      }   
      else if(expirationWDM.includes("Month")){
        const myInt = parseInt(dateStr, 10);
        const currentDate = moment();
        const newDate = moment(currentDate).add(myInt*30, 'days');
        const formattedDate = newDate.format('YYYY-MM-DD');
        dateStr = formattedDate;
      }                                         
    }    
    else{
      dateStr = expirationDate;
    }   
    dispatch({ type: 'ADD_OBJECT', payload: {id:uuid.v4(),ingredientName: ingredientName,
       categoryName: categoryName, ingredientLocation:ingredientLocation,confectionType:confectionType,
       expirationDate:dateStr,ripeStatus:"",frozenStatus:"",openStatus:""}});  
    setIngredientName('');
    setExpirationDate('');   
    const state = store.getState()
    console.log(state.ingredientArray);  
    
  };

  return (
    <ScrollView>
      <View style={styles.container}>
      <Text style={[styles.title, styles.centerTitle]}>Add new Ingredient</Text>
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
        <Picker style={styles.pickerStyle}  
            selectedValue={categoryName}  
            onValueChange={(itemValue, itemPosition) =>  
            setCategoryName(itemValue)}>  
            <Picker.Item label="Fruit" value="Fruit" />  
            <Picker.Item label="Vegetable" value="Vegetable" />  
            <Picker.Item label="Dairy" value="Dairy" />  
            <Picker.Item label="Fish" value="Fish" />  
            <Picker.Item label="Meat" value="Meat" />
            <Picker.Item label="Liquid" value="Liquid" />
        </Picker>  
      </View>
      <View style={styles.InputContainer}>
        <Picker style={styles.pickerStyle} 
            selectedValue={ingredientLocation}  
            onValueChange={(itemValue, itemPosition) =>  
            setIngredientLocation(itemValue)}>  
            <Picker.Item label="Fridge" value="Fridge" />  
            <Picker.Item label="Freezer" value="Freezer" />  
            <Picker.Item label="Pantry" value="Pantry" />              
        </Picker>  
      </View>
      <View style={styles.InputContainer}>
        <Picker style={styles.pickerStyle} 
            selectedValue={confectionType}  
            itemStyle ={styles.pickerItemStyle}
            onValueChange={(itemValue, itemPosition) =>  
            setConfectionType(itemValue)}>  
            <Picker.Item label="Fresh" value="Fresh" />  
            <Picker.Item label="Canned" value="Canned" />  
            <Picker.Item label="Frozen" value="Frozen" />    
            <Picker.Item label="Cured" value="Cured" />           
        </Picker>  
      </View>
      <View style={{flexDirection: 'row',marginLeft:25, marginRight:25 }}>
        <View style={styles.InputContainerTwo}>
          <TextInput
              style={styles.body}
              placeholder="2023-04-19"
              keyboardType = 'numeric'
              onChangeText={setExpirationDate}
              value={expirationDate}
              placeholderTextColor="grey"
              underlineColorAndroid="transparent"
            />          
        </View>
        <View style={styles.InputContainerTwo}>
          <Picker style={styles.pickerStyle} 
              selectedValue={expirationWDM}  
              itemStyle ={styles.pickerItemStyle}
              onValueChange={(itemValue, itemPosition) =>  
              setExpirationWDM(itemValue)}>  
              <Picker.Item label="Week" value="Week" />  
              <Picker.Item label="Day" value="Day" />  
              <Picker.Item label="Month" value="Month" />                          
          </Picker>  
        </View>        
      </View>      
      <TouchableOpacity
        style={[styles.buttonContainer, {marginTop: 50}]}
        onPress={() => onAdd()}>
        <Text style={styles.buttonText}>Add</Text>
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

export default connect()(IngredientAddScreen);
