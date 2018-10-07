class Visibility extends React.Component{
    constructor(props){
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.state = {
            visible: false
        }
    }

    handleShow() {
        this.setState( prevState => {
            return {visible : !prevState.visible};
        })
    }
    
    render(){
        return (
            <div>
                <h1>Visibility Toggle</h1>
                <button 
                    onClick={this.handleShow}
                >{this.state.visible ? "Hide details" : "Show details"}</button>
                {this.state.visible && <p>hey there are some details you can see now</p>}
            </div>
        );
    }
}

ReactDOM.render(<Visibility />, document.getElementById("app"));