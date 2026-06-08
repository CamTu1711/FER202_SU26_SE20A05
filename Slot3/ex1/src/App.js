import Hello from "./components/Hello";
import People from "./components/People";
import Subject from "./components/Subject"; // Phải có dòng này

function App() {
  return (
    <div>
      <Hello />
      <hr />
      <People />
      <hr />
   
      <Subject /> 
    </div>
  );
}

export default App;