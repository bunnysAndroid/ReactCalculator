

import React, {Component} from 'react';
import {View, Text, AppRegistry, TouchableHighlight} from 'react-native';
import Style from './Style';
import InputButton from './InputButton';
const inputButtons = [
  [1, 2, 3, '/'],
  [4, 5, 6, '*'],
  [7, 8, 9, '-'],
  [0, '.', '=', '+'],
];

      class AwesomeProject3 extends Component {
  constructor(props) {
        super(props);

        this.state = {
          previousInputValue: 0,
           inputValue: 0,
           selectedSymbol: null,
           showValue:"",
           newCalc:true
        }
    }
  render() {
          return (
              <View style={Style.rootContainer}>
                  <View style={Style.displayContainer}>
                      <Text style={Style.displayText}>{this.state.showValue}</Text>
                  </View>
                  <View style={Style.inputContainer}>
                      {this._renderInputButtons()}
                  </View>
              </View>
          )
      }

      /**
       * For each row in `inputButtons`, create a row View and add create an InputButton for each input in the row.
       */
      _renderInputButtons() {
          let views = [];

          for (var r = 0; r < inputButtons.length; r ++) {
              let row = inputButtons[r];

              let inputRow = [];
              for (var i = 0; i < row.length; i ++) {
                  let input = row[i];

                  inputRow.push(
            <InputButton
                value={input}
                highlight={this.state.selectedSymbol === input}
                onPress={this._onInputButtonPressed.bind(this, input)}
                key={r + "-" + i}/>
              );
              }

              views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
          }

          return views;
      }

      _onInputButtonPressed(input) {

            switch (typeof input) {
                case 'number':
                    return this._handleNumberInput(input)
                case 'string':
                    return this._handleStringInput(input)
            }
        }

        _handleNumberInput(num) {

         showValue=this.state.showValue+""+num

         this.setState({
                    showValue: showValue
                });
            let inputValue = (this.state.inputValue * 10) + num;

            this.setState({
                inputValue: inputValue
            });
            if(this.state.newCalc){
            this.setState({
            showValue:num,
            newCalc:false
            })
            }

        }
        _handleStringInput(str) {

       switch (str) {
           case '/':
           case '*':
           case '+':
           case '-':
           showValue=this.state.showValue+str

               this.setState({
                   selectedSymbol: str,
                   previousInputValue: this.state.inputValue,
                   inputValue: 0,
                   showValue: showValue
               });
               break;
          case '=':
                     let symbol = this.state.selectedSymbol,
                         inputValue = this.state.inputValue,
                         previousInputValue = this.state.previousInputValue;

                     if (!symbol) {
                         return;
                     }

                     this.setState({
                         previousInputValue: 0,
                         inputValue: 0,
                         selectedSymbol: null,
                         showValue:eval(previousInputValue + symbol + inputValue),
                         newCalc: true

                     });


                     break;
       }
   }
}

AppRegistry.registerComponent('AwesomeProject3', () => AwesomeProject3);
