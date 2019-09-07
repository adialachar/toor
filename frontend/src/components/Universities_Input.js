import React from "react";
import Autosuggest from 'react-autosuggest';
import './Universities_Input.css'

class Universities_Input extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            universities: [],
            value: '',
            suggestions: '',
        };

        this.getSuggestions= this.getSuggestions.bind(this);
        this.getSuggestionValue= this.getSuggestionValue.bind(this);
        this.escapeRegexCharacters = this.escapeRegexCharacters.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
    }

    componentDidMount() {
		this.readTextFile(this.props.txt);
	}

	readTextFile = file => {
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", file, false);
		rawFile.onreadystatechange = () => {
			if (rawFile.readyState === 4) {
				if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    var joined = [];
                    console.log("Universities..", allText);
                    
                    {allText.split("\n").map((item) => {
                        console.log("itme is ", item);
                        joined.push(item);
                    })}
                    console.log("joined is ", joined);
                    this.setState({
                        universities: joined
                    });
				}
			}
		};
		rawFile.send(null);
	};

    escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    getSuggestions(value) {
        const escapedValue = this.escapeRegexCharacters(value.trim());
        
        if (escapedValue === '') {
        return [];
        }
    
        const regex = new RegExp('^' + escapedValue, 'i');
    
        return this.state.universities.filter(university => regex.test(university));
    }
    
    getSuggestionValue(suggestion) {
        return suggestion;
    }
    
    renderSuggestion(suggestion) {
        return (
        <span>{suggestion}</span>
        );
    }
    
    onChange = (event, { newValue, method }) => {
    this.setState({
        value: newValue
    });
    };
      
    onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
        suggestions: this.getSuggestions(value)
    });
    };

    onSuggestionsClearRequested = () => {
    this.setState({
        suggestions: []
    });
    };

	render() {
        const { value, suggestions } = this.state;
        const inputProps = {
        placeholder: "Find your university",
        value,
        onChange: this.onChange
        };
        console.log("Universities in render: ", this.state.universities);
		return (
			<div>

                <Autosuggest 
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={this.getSuggestionValue}
                        renderSuggestion={this.renderSuggestion}
                        inputProps={inputProps} />
			</div>
		);
	}
}

export default Universities_Input;