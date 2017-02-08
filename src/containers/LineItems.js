import React, { Component } from 'react';
import SingleInput from '../components/SingleInput';
import Select from '../components/Select';
import CheckboxOrRadioGroup from '../components/CheckboxOrRadioGroup';
import TextArea from '../components/TextArea';

class LineItems extends Component {
  constructor(props){
    super(props);
    this.handleComponentsOnChange = this.handleComponentsOnChange.bind(this);
    this.handleCheckboxSelection = this.handleCheckboxSelection.bind(this);
    this.handleTextAreaOnChange = this.handleTextAreaOnChange.bind(this);
    this.handleRadioOnChange = this.handleRadioOnChange.bind(this);
    this.state = {
      FirstName : "",
      TestSelectOptions : [
        "one","two","three","four","five"
      ],
      TestSelect : "",
      selectedOptions : [],
      Description: "",
      SelectedRadio : []
    }
  }

  handleComponentsOnChange(e){
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  handleRadioOnChange(e){
    this.setState({ SelectedRadio : [e.target.value] })
  }

  handleTextAreaOnChange(e){
    const textArray = e.target.value.split('').filter(x => x !== 'e');
    const filterText = textArray.join('');
    this.setState({ Description: filterText});
  }

  handleCheckboxSelection(e){
    const newSelection = e.target.value;
    let newSelectionArray;

    if( this.state.selectedOptions.indexOf(newSelection) > -1 ){
      newSelectionArray = this.state.selectedOptions.filter(s => s !== newSelection)
    } else {
      newSelectionArray = [...this.state.selectedOptions, newSelection];
    }
    this.setState({selectedOptions : newSelectionArray});
  }
  
  render() {
    return (
      <div className="LineItems">
        <SingleInput
          inputType={"text"}
          title={"First Name"}
          name={"FirstName"}
          controlFunc={this.handleComponentsOnChange}
          content={this.state.FirstName}
          placeholder={"First Name"} />

        <Select
          name={"TestSelect"}
          options={this.state.TestSelectOptions}
          selectedOption={this.state.TestSelect}
          controlFunc={this.handleComponentsOnChange}
          placeholder={"Please pick one"} />

        <CheckboxOrRadioGroup
          title={"Select some options"}
          type={"checkbox"}
          setName={"selectedOptions"}
          options={this.state.TestSelectOptions}
          selectedOptions={this.state.selectedOptions}
          controlFunc={this.handleCheckboxSelection} />

        <CheckboxOrRadioGroup
          title={"Select An Option"}
          type={"radio"}
          setName={"SelectedRadio"}
          options={this.state.TestSelectOptions}
          selectedOptions={this.state.SelectedRadio}
          controlFunc={this.handleRadioOnChange} />

        <TextArea
          title={"This is a text area"}
          rows={12}
          name={"Description"}
          content={this.state.Description}
          resize={false}
          placeholder={"Type something here"}
          controlFunc={this.handleTextAreaOnChange} />
      </div>
    );
  }
}

export default LineItems;
