import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";
import BubblePage from "./components/BubblePage";


const ProtectedRoute = ({component: Component, ...rest}) => {
  // const propsWithoutComponent = {...props, component: undefined};
  return <Route {...rest} render={props => {
    if (localStorage.getItem('token')) {
      return <Component {...props} />;
    } else {
      return <Redirect to="/login"/>;
    }
  }}/>;
};

const protectRoute = Component => props => {
  if (localStorage.getItem('token')) {
    return <Component {...props} />;
  } else {
    return <Redirect to="/login"/>;
  }
};


function App() {
  const [colorList, setColorList] = useState([]);
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <ProtectedRoute path="/api/colors" component={BubblePage}/>
      </div>
    </Router>
  );
}

export default App;
