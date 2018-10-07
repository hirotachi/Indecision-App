class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.handleRemoveOptions = this.handleRemoveOptions.bind(this);
        this.handlePickOPtion = this.handlePickOPtion.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: []
        }
    }

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

    handleRemoveOptions(){
        this.setState(() => ( { options: [] } ));
    }
    handlePickOPtion(){
        let index = Math.floor(Math.random() * this.state.options.length);
        console.log(this.state.options[index]);
    }

    handleDeleteOption(optionToRemove){
        this.setState((prevState) => ({
            options: prevState.options.filter(option => option !== optionToRemove)
        }));
    }

    handleAddOption(option){
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

                <Action 
                hasOptions={this.state.options.length === 0} 
                pickOption = {this.handlePickOPtion}
                />

                <Options
                    options={this.state.options} 
                    removeOptions={this.handleRemoveOptions}
                    deleteOption = {this.handleDeleteOption}
                 />
                <AddOption addOption={this.handleAddOption}/>
            </div>
        );
    }
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subTitle && <h2>{props.subTitle}</h2>}
        </div>
    );
}

Header.defaultProps = {
    title: "Indecision App"
}

const Action = (props) => {
    return (
        <div>
        <button
            onClick={props.pickOption}
            disabled={props.hasOptions}
        >
            What should i do?</button>                
        </div>
    );
}

const Options = (props) => {
    return (
        <div>
            <button onClick={props.removeOptions}>Remove All</button>
            {props.options.length === 0 && <p>There is no Options at the moment</p>}
            <ol>
                {props.options.map((option,index) => 
                <Option 
                    key={index}
                    option={option}
                    index={index}
                    deleteOption={props.deleteOption}
                />)}
            </ol>
        </div>
    );
}

const Option = (props) => {
    return (
        <div>
            <li>
            {props.option} 
            <button onClick={() => 
                props.deleteOption(props.option)
            }>Remove</button>
            </li>
        </div>
    );
}

class AddOption extends React.Component {
    constructor(props){
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
    }
    handleAddOption(e){
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.addOption(option);
        

        this.setState(() => ({error}))
        if(!error){
            e.target.elements.option.value = "";
        }
    }
    render(){
        return (
            <div>
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"/>
                    <button>Add Option</button>
                </form>
                {this.state.error && <p>{this.state.error}</p>}
            </div>
        );
    }
}

const root = document.getElementById("app");

ReactDOM.render(<IndecisionApp />, root);