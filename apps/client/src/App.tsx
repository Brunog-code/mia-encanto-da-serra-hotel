import { AppRouters } from "./routes";
import { RouterProvider } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme(); // tema padrão do MUI

function App() {
  return (
    <div className="bg-white-gost-500 text-bistre-600">
      <ThemeProvider theme={theme}>
        <RouterProvider router={AppRouters} />
      </ThemeProvider>
    </div>
  );
}

export default App;
