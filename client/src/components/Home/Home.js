import React,{useContext} from 'react';
import background from "../../images/help.jpg";
import "../Home/Home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsHelping } from '@fortawesome/free-solid-svg-icons';
import { FaPeopleGroup } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import {UserContext} from "../../App";

// Hero section component
const heroStyle={
  backgroundImage:`url(${background})`,
   backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
     opacity:'0.8',
    color: '#fff',
      textAlign: 'center',
      padding: '100px 0'
  
  }
function HeroSection() {
  const {state,dispatch}= useContext(UserContext);
if(state.role==='user'){

  return (
    <section className="hero" >
      <div className="hero-content">
        
        <h1>Connecting Neighbors. Getting Things Done.</h1>
        <p>Post a task or find someone to help. It's that easy!</p>
        <div className="buttons">
          <button onClick={() => window.location.href='/posttask'} className="btn-primary">Post Task</button>
          <button onClick={() => window.location.href='/helpersignup'}  className="btn-secondary">Become a Helper</button>
        </div>
      </div>
    </section>
  );
}
else if(state.role=="helper"){
  return (
    <section className="hero" >
      <div className="hero-content">
        
        <h1>Connecting Neighbors. Getting Things Done.</h1>
        <p>Post a task or find someone to help. It's that easy!</p>
        <div className="buttons">
          <button onClick={() => window.location.href='/usersignup'} className="btn-primary">Become a User</button>
          <button onClick={() => window.location.href='/findtask'}  className="btn-secondary">Find Task</button>
        </div>
      </div>
    </section>
  );


}
else{
  return (
    <section className="hero" >
      <div className="hero-content">
        
        <h1>Connecting Neighbors. Getting Things Done.</h1>
        <p>Post a task or find someone to help. It's that easy!</p>
        <div className="buttons">
          <button onClick={() => window.location.href='/usersignup'} className="btn-primary">Become a User</button>
          <button onClick={() => window.location.href='/helpersignup'}  className="btn-secondary">Become a Helper</button>
        </div>
      </div>
    </section>
  );

}
}

// Benefits section component
function BenefitsSection() {
  return (
    <section className="benefits">
      <div className="benefits-content">
        <div className="benefit">
        <FontAwesomeIcon icon={faHandsHelping} />
          <p>Need help with errands, chores, or odd jobs? Find a reliable helper in your neighborhood.</p>
        </div>
        <div className="benefit">
        <FaPeopleGroup />
          <p>Offer your skills and help others. Build stronger connections with your neighbors.</p>
        </div>
        <div className="benefit">
        <GiMoneyStack />
          <p>Get tasks done efficiently and affordably. Free to join and post tasks.</p>
        </div>
      </div>
    </section>
  );
}

// Home page component
const Home=()=> {
  return (
    <>
    <div className="home-page " style={heroStyle}>
      <HeroSection />
      <BenefitsSection />
    </div>
    </>
  );
}

export default Home;