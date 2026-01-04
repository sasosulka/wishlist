import { Link } from 'react-router-dom';

export const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="nav-container">
				<Link to="/" className="nav-logo">🎁 WishList</Link>
				<div className="nav-links">
					<Link to="/" className="nav-item">Главная</Link>
					<Link to="/dashboard" className="nav-item">Мой Вишлист</Link>
				</div>
			</div>
		</nav>
	);
};