import CoundownTimer from "./components/CoundownTimer";

function App() {
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",flexDirection:"column"}} >
      <h1 style={{marginBottom:"1rem"}}>Countdown Timer</h1>
      <CoundownTimer/>
    </div>
  );
}

export default App;
