import { Link } from 'react-router-dom';

export const HomePage = () => {
	return (
		<div style={{ height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
			<div style={{ fontSize: '80px', marginBottom: '20px' }}>🎁</div>
			<h1 style={{ fontSize: '4rem', marginBottom: '10px', textShadow: '3px 3px 0px #ffb6c1' }}>WishList</h1>
			<p style={{ fontSize: '1.5rem', maxWidth: '500px', marginBottom: '40px' }}>
				Создай вишлист и сохрани его в браузере!
			</p>
			<Link to="/dashboard" className="btn-primary btn-pink" style={{ textDecoration: 'none', fontSize: '20px' }}>
				МОЙ СПИСОК ЖЕЛАНИЙ ➜
			</Link>
		</div>
	)
}