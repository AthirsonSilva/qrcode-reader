import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    title:{
      color:'#000',
      fontSize:25,
      textAlign:'center',
      marginTop:25,
      marginBottom:10
    },

    listTitle: {
      fontSize: 24,
      textAlign: 'center',
    },
  
    textInputs:{
      borderWidth:1,
      borderColor:'#000',
      color:'#000',
      borderRadius:40,
      paddingLeft: 25,
      height:60    
    },
  
    answer:{
      color:'#000',
      fontSize:25,
      textAlign:'center',
      marginTop:30
    },
    lilMargin: {
      margin: 15
    },
    button: {
      alignItems: "center",
      backgroundColor: "#ddd",
      padding: 10,
      marginVertical: 10,
      marginHorizontal: 15,
      borderRadius: 10
    },
    item: {
      backgroundColor: '#ddd',
      padding: 5,
      paddingVertical: 10,
      marginVertical: 5,
      marginHorizontal: 15,
      borderRadius: 10,
    },
    image: {
      width: '60vw',
      height: '25vh',
      marginLeft: '20vw'
    }, 
    bgimage: {
      height: '100%',
      width: '100%'
    },

    headerText: {
      fontSize: 16,
      textAlign: 'center',
      margin: 10,
      fontWeight: 'bold',
    },

    headStyle: {
      height: 50,
      backgroundColor: '#f1f8ff',
      alignContent: 'center',
    },
    cellStyle: {
      margin: 10,
      textAlign: 'center',
      height: 40,
    },

    rowText: {
      textAlign: 'center',
      margin: 10,
    }
});

export default styles