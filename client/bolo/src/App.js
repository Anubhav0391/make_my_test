import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import { AllRoutes } from "./routes/AllRoutes";

function App() {
  
  return (
    <div>
      <nav className=" shadow-md h-20 flex align-items-center justify-between px-7 bg-white">
        <Link to={'/'}><img src="https://boloforms-internal-images.s3.ap-south-1.amazonaws.com/website/assets/boloforms/logo.svg" width={'80vh'}/></Link>
        <div className=" flex align-items-center justify-between w-[30%]" style={{fontSize:'20px'}}>
          <Link className=" m-auto" to={'/create'}>Create</Link>
          <Link className=" m-auto" to={'/tests'}>Tests</Link>
          <p className=" m-auto">About</p>
          <p className=" m-auto">Login</p>
        </div>
      </nav>
      <AllRoutes />
    </div>
  );
}

export default App;
