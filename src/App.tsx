import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { QueryClient, QueryClientProvider } from "react-query";
import { prefixer } from "stylis";
import ThemeProvider from "./mui-configs";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { faIR } from "@mui/material/locale";
import SwitchTheme from "./components/switchTheme";
import FormLayout from "./components/FormLayout";

import "./App.scss";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const queryClient = new QueryClient();

function App() {
  const theme = createTheme(
    {
      direction: "rtl",
      typography: {
        fontFamily: `iranyekan, "Helvetica", "Arial", sans-serif`,
        fontSize: 12,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
      },
      palette: {
        mode: "dark",
      },
    },
    faIR
  );

  return (
    <CacheProvider value={cacheRtl}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="App">
            <Container maxWidth="md">
              <FormLayout />
            </Container>
          </div>
          <SwitchTheme />
        </ThemeProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}

export default App;
