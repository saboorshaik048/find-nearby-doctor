import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <AppRoutes />
      </main>
    </BrowserRouter>
  );
}

export default App;
