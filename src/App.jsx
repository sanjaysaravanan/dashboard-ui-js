import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import LoadingIndicator from './Components/Loader/Loader';
import SnackBarMessage from './Components/SnackBarMessage/SnackBarMessage';
import Store from './state/store';
import Layout from './Pages/Layout';
import Home from './Pages/Home';
import Reports from './Pages/Reports';
import Charts from './Pages/Charts';

const theme = createTheme({});

function App() {
  return (
    <Provider store={Store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="dashboards" element={<h1>dashboards</h1>} />
                <Route path="reports" element={<Reports />} />
                <Route path="Charts" element={<Charts />} />
              </Route>
            </Routes>
            <SnackBarMessage />
            <LoadingIndicator />
          </Router>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
}

export default App;
