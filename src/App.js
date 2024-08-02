import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import './App.css';
import Landing from './componants/Landing';
import Navbar from './componants/Navbar';
import store from './redux/store';
import {Provider} from 'react-redux';
import Register from './componants/Users/Register';
import {transitions,poistions,Provider as AlertProvider, positions} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Alert from './componants/Alert'
import Login from './componants/Users/Login';
import Home from './componants/Home';
import Private from './componants/Private';
import ProfileForm from './componants/ProfileForms/ProfileForm';
import { addEducation } from './redux/modules/profiles';
import AddEducation from './componants/ProfileForms/AddEducation';
import AddExperience from './componants/ProfileForms/AddExperience';
import { setAuthToken } from './utils';
import { loadUser } from './redux/modules/users';
import Developers from './componants/Developers';
import Profile from './componants/Profile';
import Settings from './componants/Settings';
import Posts from './componants/Posts/Posts';
import PostItem from './componants/Posts/PostItem';
import Post from './componants/Posts/Post';


const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  transitions: transitions.SCALE
};

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
   <BrowserRouter>
   <AlertProvider template={AlertTemplate} {...options}>
   <Fragment>
    <Alert/>
    <Navbar/>
    <Routes>
      <Route exact path='/' element={<Landing/>}/>
      <Route exact path='/register' element={<Register/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/home' element={<Private component={Home}/>}/>
      <Route exact path='/create-profile' element={<Private component={ProfileForm}/>}/>
      <Route exact path='/add-education' element={<Private component={AddEducation}/>}/>
      <Route exact path='/add-experience' element={<Private component={AddExperience}/>}/>
      <Route exact path='/developers' element={<Private component={Developers}/>}/>
      <Route exact path='/profile/:id' element={<Private component={Profile}/>}/>
      <Route exact path='/settings' element={<Private component={Settings}/>}/>
      <Route exact path='/edit-profile' element={<Private component={ProfileForm}/>}/>
      <Route exact path='/posts' element={<Private component={Posts}/>}/>
      <Route exact path='/posts/:id' element={<Private component={Post}/>}/>


    </Routes>
   </Fragment>
   </AlertProvider>
   </BrowserRouter>
   </Provider>
  );
}

export default App;
