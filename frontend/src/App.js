import './App.css';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import { Redirect, Route, Switch} from 'react-router-dom';
import Profile from './components/Profile';
import ProblemsListView from './components/ProblemListView';
import {  useSelector } from 'react-redux';
import AddProblemView from './components/AddProblemView';
import SingleProblem from './components/SingleProblem';
import UsersList from './components/UsersList';
import Home from './components/Home';
import About from './components/About';


function App() {
  const {user, loading} = useSelector(state => state.userState)
 
  return (
    <div className="App">
      <Navbar user={user}></Navbar>
      <Switch>
        <Route path="/login" component = { LoginForm}/>
        <Route path="/signup" component = { SignUpForm}/>
        <Route path="/users" component= {user?UsersList:LoginForm}/>
        <Route path="/problems/:id" component={user? SingleProblem:LoginForm}/>
        <Route path="/problems" component = { user? ProblemsListView: LoginForm}/>
        <Route path="/profile" component = { user? Profile: LoginForm}/>
        <Route path="/addProblem" component={user?AddProblemView:LoginForm}/>
        <Route path="/about" component={About}/>
        <Route path="/" component = {user? Home: LoginForm}/>
      </Switch>
    </div>
  );
}

export default App;
