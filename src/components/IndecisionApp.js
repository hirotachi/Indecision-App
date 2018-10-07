import React, { Component } from 'react';
import AddOption from "./AddOption";
import Options from "./Options";
import Action from "./Action";
import Header from "./Header";
import OptionModal from "./OptionModal";

class IndecisionApp extends Component {
	state = {
		options: [],
		selectedOption: null
	};

	componentDidMount() {
		try{
			const json = localStorage.options;
			const options = JSON.parse(json);
			if(options){
				this.setState(() => ({options}))
			}
		}catch(e){

		}
	}
	
	componentDidUpdate(prevProps, prevState){
		if(prevState.options.length !== this.state.options.length){
			const json = JSON.stringify(this.state.options);
			localStorage.setItem("options", json);
		}
	}

	handleClearSelectedOption = () =>{
		this.setState(() => ({selectedOption: null}));
	}

	handleRemoveOptions = () => {
		this.setState(() => ( { options: [] } ));
	}
	handlePickOPtion = () => {
		let index = Math.floor(Math.random() * this.state.options.length);
		const option = this.state.options[index];
		this.setState(() => ({
			selectedOption: option
		}));
  }

	handleDeleteOption = (optionToRemove) => {
		this.setState((prevState) => ({
			options: prevState.options.filter(option => option !== optionToRemove)
		}));
	}

	handleAddOption = (option) => {
		if(!option){
			return "Enter a valid text";
		}else if(this.state.options.indexOf(option) !== -1){
			return "the option is already in the list";
		}

		this.setState(prevState => ({
			options: [].concat(prevState.options, option)
		}));
	}
	render(){
		const subTitle = "Put your life in the hands of a computer";
		return (
			<div>
				<Header
					subTitle={subTitle} 
				/>
				<div className="container">
					<Action 
					hasOptions={this.state.options.length === 0} 
					pickOption = {this.handlePickOPtion}
					/>
					<div className="widget">
						<Options
							options={this.state.options} 
							removeOptions={this.handleRemoveOptions}
							deleteOption = {this.handleDeleteOption}
						/>
						<AddOption addOption={this.handleAddOption}/>
					</div>
					
				</div>

					<OptionModal 
					handleClearSelectedOption={this.handleClearSelectedOption}
					selectedOption={this.state.selectedOption}
					/>
			</div>
		);
	}
}


export default IndecisionApp;
