import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableHighlight,
  Button } from 'react-native';


const inputButtons = [
  [1,2,3,'/'],
  [4,5,6,'*'],
  [7,8,9,'-'],
  [0,'.','=','+']
];




class InputButton extends Component {

  render() {
    return (
      <TouchableHighlight
        style={[styles.inputButton, this.props.highlight ? styles.inputButtonHighlighted : null]}
        underlayColor='#193441'
        onPress={this.props.onPress}
      >
        <Text style={styles.inputButtonText}>{this.props.value}</Text>
      </TouchableHighlight>
    )
  }
}





export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      previousInputValue: 0,
      inputValue: 0,
      selectedSymbol: null
    }
  }


  render() {
    return (
      <View style={styles.rootContainer}>

        <View style={styles.displayContainer}>
          <Text style={styles.displayText}>{this.state.inputValue}</Text>
        </View>

        <View style={styles.inputContainer}>
          {this._renderInputButtons()}
        </View>

      </View>
    )
  }


  _renderInputButtons() {
    let views = [];

    for (var r = 0; r < inputButtons.length; r++){
      let row = inputButtons[r];

      let inputRow = [];

      for (var i = 0; i < row.length; i++){
        let input = row[i];
        inputRow.push(
          <InputButton 
            value={input} 
            key={r + '-' + i}
            highlight={this.state.selectedSymbol === input}
            onPress={this._onInputButtonPressed.bind(this, input)}
          />
        );
      }
      views.push(<View style={styles.inputRow} key={"row-" + r}>{inputRow}</View>)
    }
    return views
  }


  _onInputButtonPressed(input) {
    switch(typeof input) {
      case 'number': return this._handleNumberInput(input)
      case 'string': return this._handleStringInput(input)
    }
  }


  _handleNumberInput(num) {
    let inputValue = (this.state.inputValue * 10) + num;
    this.setState({inputValue: inputValue})
  }


  _handleStringInput(str) {
    switch(str) {
      case '/':
      case '*':
      case '+':
      case '-':
        this.setState({
          selectedSymbol: str,
          previousInputValue: this.state.inputValue,
          inputValue: 0
        });
        break;
      case '=':
        let symbol = this.state.selectedSymbol,
            inputValue = this.state.inputValue,
            previousInputValue = this.state.previousInputValue;

        if (!symbol) return

        this.setState({
          previousInputValue: 0,
          inputValue: eval(previousInputValue + symbol + inputValue),
          selectedSymbol: null
        });
        break;
    }
  }
}


const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },

    displayContainer: {
        flex: 2,
        backgroundColor: '#193441',
        justifyContent: 'center'
    },

    inputContainer: {
        flex: 8,
        backgroundColor: '#3E606F'
    },

    inputButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0.5,
      borderColor: 'coral'
    },

    inputButtonText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: 'white'
    },

    inputRow: {
      flex: 1,
      flexDirection: 'row'
    },

    displayText: {
      color: 'white',
      fontSize: 38,
      textAlign: 'right',
      padding: 20
    },

    inputButtonHighlighted: {
      backgroundColor: '#193441'
    }
});