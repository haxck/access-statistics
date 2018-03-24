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
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          refreshControl={
            <RefreshControl 
              refreshing ={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.fields.count}:{item.fields.link}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
