import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllTasks from './Components/AllTasks';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/rootReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';


const reduxStore = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

function App() {
  return (
    <Provider store={reduxStore}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<AllTasks />} />
        </Routes>
      </BrowserRouter>
    </Provider>

  );
}

export default App;
