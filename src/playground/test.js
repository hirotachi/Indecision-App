const app = {
    title: "indecision App",
    subtitle: "some info right here",
    options :[]
};

const onFormSubmit = (e) => {
    e.preventDefault();
    const option = e.target.elements.option.value;
    if(option) {
        app.options.push(option);
        e.target.elements.option.value = "";
        rerender();
    }
    
}

const removeAll = () => {
    app.options = [];
    rerender();
}

const onMakeDecision = () => {
        const index = Math.floor(Math.random() * app.options.length);
        console.log(app.options[index]);
}


const root = document.querySelector("#app");


const rerender = () => {
    const template = 
    <div>
        <h1>{app.title}</h1>
        <p>{app.subtitle}</p>
        <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should i do ?</button>
        <button onClick={removeAll}>remove all</button>
        <ol>
            {app.options ? 
                app.options.map((option, index) => <li key={index}>{option}</li>) 
                :<p>No items</p>
            }
        </ol>
        <form onSubmit={onFormSubmit}>
            <input type="text" name="option"/>
            <button>Add option</button>
        </form>
    </div>;

    ReactDOM.render(template, root);
}

rerender();
