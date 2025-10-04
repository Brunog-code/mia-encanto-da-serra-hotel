import { AppRouters } from "./routes";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";

const theme = createTheme(); // tema padrão do MUI

function App() {
  return (
    <div className="bg-white-gost-500 text-bistre-600">
      <AuthProvider>
        <ThemeProvider theme={theme}>
          {/* Toaster global */}
          <Toaster position="top-right" />

          {/* Rotas */}
          <RouterProvider router={AppRouters} />
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
