// import React, { useEffect } from "react";
// import './App.css';
// import Header from "./Header";
// import Home from "./Home";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Checkout from "./Checkout";
// import Login from "./Login";
// import { auth } from "./firebase";
// import { useStateValue } from "./StateProvider";
// import Payment from "./Payment";
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import Orders from "./Orders";
// import ProductDetail from './ProductDetail';
// // Load Stripe promise
// const promise = loadStripe("pk_test_51QN1m6Dy1t2pszvKWFsL8sN4W8ossrKiSCJ7P4rz2NnzoMVmq0rrpaB2hGfly6tB9WJDYThJwyAEir32XcqGO73k00oLsQtWDm");

// function App() {
//   const [{}, dispatch] = useStateValue();

//   useEffect(() => {
//     auth.onAuthStateChanged(authUser => {
//       console.log('The User is >>>', authUser);

//       if (authUser) {
//         // User is logged in
//         dispatch({
//           type: 'SET_USER',
//           user: authUser
//         });
//       } else {
//         // User is logged out
//         dispatch({
//           type: 'SET_USER',
//           user: null
//         });
//       }
//     });
//   }, []);

//   return (
//     <Router>
//       <div className="app">
//         <Switch>
//         <Route path="/orders">
//           <Header />
//             <Orders />

//           </Route>
//           <Route path="/login">
//             <Login />
//           </Route>
//           <Route path="/checkout">
//             <Header />
//             <Checkout />
//           </Route>
//           <Route path="/payment">
//             <Header />
//             {/* Wrap Payment with Elements */}
//             <Elements stripe={promise}>
//               <Payment />
//             </Elements>
//           </Route>
//           <Route path="/">
//             <Header />
//             <Home />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;



// import React, { useEffect } from "react";
// import './App.css';
// import Header from "./Header";
// import Home from "./Home";
// import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// import Checkout from "./Checkout";
// import Login from "./Login";
// import { auth } from "./firebase";
// import { useStateValue } from "./StateProvider";
// import Payment from "./Payment";
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import Orders from "./Orders";
// import ProductDetail from './ProductDetail';  // Make sure this is your Product Detail page component

// // Load Stripe promise
// const promise = loadStripe("pk_test_51QN1m6Dy1t2pszvKWFsL8sN4W8ossrKiSCJ7P4rz2NnzoMVmq0rrpaB2hGfly6tB9WJDYThJwyAEir32XcqGO73k00oLsQtWDm");

// function App() {
//   const [{ user }, dispatch] = useStateValue();

//   useEffect(() => {
//     auth.onAuthStateChanged(authUser => {
//       console.log('The User is >>>', authUser);

//       if (authUser) {
//         // User is logged in
//         dispatch({
//           type: 'SET_USER',
//           user: authUser
//         });
//       } else {
//         // User is logged out
//         dispatch({
//           type: 'SET_USER',
//           user: null
//         });
//       }
//     });
//   }, [dispatch]);

//   return (
//     <Router>
//       <div className="app">
//         <Switch>
//           {/* Protected Routes */}
//           <Route path="/orders">
//             {user ? (
//               <>
//                 <Header />
//                 <Orders />
//               </>
//             ) : (
//               <Redirect to="/login" />
//             )}
//           </Route>

//           {/* Login Route */}
//           <Route path="/login">
//             <Login />
//           </Route>

//           {/* Checkout Route */}
//           <Route path="/checkout">
//             {user ? (
//               <>
//                 <Header />
//                 <Checkout />
//               </>
//             ) : (
//               <Redirect to="/login" />
//             )}
//           </Route>

//           {/* Payment Route */}
//           <Route path="/payment">
//             {user ? (
//               <>
//                 <Header />
//                 <Elements stripe={promise}>
//                   <Payment />
//                 </Elements>
//               </>
//             ) : (
//               <Redirect to="/login" />
//             )}
//           </Route>

//           {/* Dynamic Product Detail Route */}
//           <Route path="/product/:id">
//             <Header />
//             <ProductDetail />
//           </Route>

//           {/* Default Route (Home Page) */}
//           <Route exact path="/">
//             <Header />
//             <Home />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useEffect } from "react";
import './App.css';
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"; // No need to change imports for v5
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from "./Orders";
import ProductDetail from './ProductDetail';  // Make sure this is your Product Detail page component

// Load Stripe promise
const promise = loadStripe("pk_test_51QN1m6Dy1t2pszvKWFsL8sN4W8ossrKiSCJ7P4rz2NnzoMVmq0rrpaB2hGfly6tB9WJDYThJwyAEir32XcqGO73k00oLsQtWDm");

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('The User is >>>', authUser);

      if (authUser) {
        // User is logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        });
      } else {
        // User is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        });
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <Switch>
          {/* Protected Routes */}
          <Route path="/orders">
            {user ? (
              <>
                <Header />
                <Orders />
              </>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          {/* Login Route */}
          <Route path="/login">
            <Login />
          </Route>

          {/* Checkout Route */}
          <Route path="/checkout">
            {user ? (
              <>
                <Header />
                <Checkout />
              </>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          {/* Payment Route */}
          <Route path="/payment">
            {user ? (
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          {/* Dynamic Product Detail Route */}
          <Route path="/product/:id">
            <Header />
            <ProductDetail />
          </Route>

          {/* Default Route (Home Page) */}
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

