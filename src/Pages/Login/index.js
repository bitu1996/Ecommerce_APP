import React from "react";
import styles from "./login.module.css";
class Login extends React.Component{
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      Token: window.sessionStorage.getItem('token') ||'',

    }
  }
  Tokencheack=()=>{
    
    if(this.state.Token){
      console.log("token",this.state.Token)
      this.props. onclick()
    }
  }
  handlechange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  handleclick=()=>{
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCNswzrzHE198RO5e4jlCrHZtXT-Qr536U',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        returnSecureToken: true

    })
    
  }).then((res)=> {
    return res.json()
  }).then((result)=>{
    console.log(result)
    if(!result.error){
      window.sessionStorage.setItem('token',result.idToken)
    }
  })
}
  
  render(){
        return(
            <div className={`${styles.container} ${this.props.Data? styles.active:''}`}>
              <div className={styles.container1}>
           <div className={styles.content1}>
             <div className={styles.headingbox}>
              <h1>Login</h1>
             </div>
             <div className={styles.parabox}>
             <p className={styles.para}>Get access to your Orders, Wishlist and Recommendations</p>
             </div>
             <div className={styles.backimg}>
              <img className={styles.img} src="http://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png"/>
             </div>
           </div>
           <div className={styles.content2}>
             <div className={styles.emailbox}>
              <input onChange={this.handlechange} value={this.state.email} name="email" className={styles.email} type='text' placeholder="Enter Email/Mobile number"autoFocus/>
             </div>
             <div className={styles.passwordbox}>
              <input onChange={this.handlechange} className={styles.password} name="password" value={this.state.password} type="password" placeholder="Enter password"/>
             </div>
             <div className={styles.buttonbox}>
             <button onClick={()=> { this.handleclick() ; this.Tokencheack();}} className={styles.button}>Login</button>
             </div>
           </div>
           <div className={styles.crosbox}>
           <button onClick={()=>this.props. onclick()} className={styles.cros}>x</button>
           </div>
           </div>
            </div>
        )
        }
}
export default Login;