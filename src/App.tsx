import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { Navbar } from './components/Navbar';

function App() {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/dashboard" element={<DashboardPage />} />
			</Routes>
		</div>
	)
}

export default App