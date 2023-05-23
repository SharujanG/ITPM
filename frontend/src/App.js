import "./App.css";
import { Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import 'bootstrap/dist/css/bootstrap.min.css';
import DonationForm from "./pages/DonationForm";
import Admin from "./pages/Admin";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
} from "@clerk/clerk-react";
const clerkPubKey = "pk_test_bGVnaWJsZS1tYWNhdy00Ni5jbGVyay5hY2NvdW50cy5kZXYk";

function App() {
  return (
    <div className="App">
      <ClerkProvider publishableKey={clerkPubKey}>
      <SignedIn>
      <Route path="/admin" component={Admin} exact />
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      
      </ClerkProvider>
      
      <Route path="/" component={HomePage} exact />
      <Route path="/donation" component={DonationForm} exact />
    </div>
  );
}

export default App;
