import React from 'react';
import { StyleSheet, Text, View, FlatList,ActivityIndicator,RefreshControl } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      refreshing: false,
    }
  }
  _onRefresh() {
    this.setState({refreshing: true})
    return fetch('http://192.168.0.106:8000/api/g/')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          dataSource: responseJson,
          refreshing: false,
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }
  _renderItems({item}) {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>Count:{item.fields.count}</Text>
        <Text>{item.fields.link}</Text>
      </View>
    )
  }
  componentDidMount(){
    return fetch('http://192.168.0.106:8000/api/g/')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }


  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={styles.container}>
        <FlatList
          refreshControl={
            <RefreshControl 
              refreshing ={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          data={this.state.dataSource}
          renderItem={this._renderItems}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'red',
  },
  item: {
    marginTop: 5,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor: '#EEE'
  }
});
