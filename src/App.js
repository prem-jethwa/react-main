import React from 'react';
import './App.css';
import axios from 'axios';

const CardList = (props) =>(
	<div>
		{props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}         
	</div>       
);

    //little dout}
		/* <Card {...testData[0]} />
		<Card {...testData[1]} />  </div> */

class Card extends React.Component {
	render() {
		const profile = this.props;
  	return (
    	<div className="github-profile">
    	  <img src={profile.avatar_url}  alt="" />
        <div className="info"  style={{ margin:'1rem ' , marginLeft:10}}>
	  <div className="name" style={{fontSize:'125%' }}>{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
    	</div>
    );
  }
}


class Form extends React.Component{
	state = { userName: '' };
        handleSubmit = async (event) => {
	    event.preventDefault();
		const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
		this.props.onSubmit(resp.data);
		this.setState({ userName: ""})
	};

	render(){
		return (
		<form onSubmit= {this.handleSubmit} action="">

			<input 
			  type="text" 
			  placeholder="GitHub Username"
			 className="input-field"
			 value = {this.state.userName}
			 onChange={ evnt => this.setState({ userName : evnt.target.value})}
			  required />
			<button className="btn"> Add Card</button>


		</form>
		
		
		);
	}
}

class App extends React.Component {

	// constructor(props){
	// 	super()
	// 	this.state={
	// 		profiles:testData,
	// 	};
	// } or down
	state ={
		profiles:[],   //upper code or this works same But this not the official js code
	};

	addNewProfile = (profileData) => {
		this.setState(prevState => ({
			profiles: [...prevState.profiles, profileData],
		}))
	};
  
	render() {
  	return (
      
    	<div>
    	  <div className="header" style={{fontSize:'150%', textAlign:"center"}} >{this.props.title}</div>
          <Form onSubmit= { this.addNewProfile} />
		  <CardList profiles={this.state.profiles} />
    	</div>
    );
  }	
}

export default App;

// {
// 	"predeploy": "npm run build",
// 	"deploy": "gh-pages -d build"
// 	"homepage": "https://prem-jethwa.github.io/react-main/",
// }
