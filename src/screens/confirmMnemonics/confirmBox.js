import { View, Text, StyleSheet,Dimensions,TouchableOpacity } from 'react-native'
import React,{useState,useEffect,useImperativeHandle, forwardRef} from 'react';
import _ from 'lodash';
const windowWidth = Dimensions.get('window').width;

const ConfirmBox = ({navigation,mnemonic},ref) => {
    const [state, setState] = useState({
        selectable:mnemonic,
        selected:[], 
      });
     
      useEffect(() => {
          setState({
              ...state,
              selectable:_.shuffle([...state.selectable])
          });
      }, [])
    const isValidSequence = ()=>{
        return _.isEqual(state.selected,mnemonic);
      }

    useImperativeHandle(ref, () => ({
        isValidSequence: () => { return isValidSequence() }
      }))
      
      const onPressMnemonic = (mnemonic, isSelected)=> {
        if (isSelected) setState({
            selectable: state.selectable.filter(m => m !== mnemonic),
            selected: state.selected.concat([mnemonic])
        });

        else setState({
            selectable: state.selectable.concat([mnemonic]),
            selected: state.selected.filter(m => m !== mnemonic)
        });
    }

      const renderMnemonic = (mnemonic, index,selected) => (
        <TouchableOpacity key={index} onPress={() =>onPressMnemonic(mnemonic, selected)}>
        <View style={{margin: 4}} key={index}>
          <View style={styles.renderMnemonic}>
            <Text style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
              {mnemonic}
            </Text>
          </View>
        </View>
        </TouchableOpacity>
      );
  return (
      <>
    <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'column',
          padding: 8,
          backgroundColor: '#14213D',
        }}>
            <Text style={{color:"#fff",fontSize:20}}>Sequence</Text>
            <View style={{backgroundColor:'transparent',height:'30%',width:'90%',flexDirection:'row',justifyContent:"center",alignItems:"center"}}>
                <View style={{flexDirection:"row",flexWrap:"wrap",flex:1,justifyContent:"center"}}> 
            {state.selected.map((mnemonic, index) =>
                renderMnemonic(mnemonic, index,false),
              )}
                </View>
            </View>
          <View style={styles.mnemonicsContainer}>
              {state.selectable.map((mnemonic, index) =>
                renderMnemonic(mnemonic, index,true),
              )}
            </View>
      </View>
      </>
  )
}

export default forwardRef(ConfirmBox);
const styles = StyleSheet.create({
    mnemonicsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      maxWidth: '100%',
      marginTop:'40%',
      // backgroundColor:"blue"
    },
    renderMnemonic:{
      backgroundColor: 'lightblue',
      padding: 8,
      borderWidth: 1,
      borderColor: '#1E1E1E',
      borderRadius: 4,
      width:windowWidth/4,
      justifyContent:'center',
      alignItems:"center"
    },
    button: {
      height: 48,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      // borderWidth: 2,
      backgroundColor: '#fca311',
      // borderColor: '#fff',
      padding: 8,
      borderRadius: 4,
      width: '95%',
      alignSelf: 'center',
    },
    title: {
      color: '#fff',
      fontSize: 16,
    },
  });
  