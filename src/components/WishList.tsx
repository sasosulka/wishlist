import type { IWish } from "../types";

interface Props {
	items: IWish[];
	onDelete: (id: number) => void;
}

export const WishList = ({ items, onDelete }: Props) => {
	if (items.length === 0) return <p style={{ fontSize: '18px', marginTop: '20px' }}>Список пока пуст...</p>;

	const formatDate = (dateString?: string) => {
		if (!dateString) return "";
		return new Date(dateString).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
	};

	return (
		<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px', marginTop: 0 }}>
			{items.map((item) => {
				return (
					<div key={item.id} className="card-brutal" style={{ position: 'relative', padding: '20px', background: 'white', display: 'flex', flexDirection: 'column' }}>

						{/* Крестик */}
						<button
							onClick={() => onDelete(item.id)}
							style={{
								position: 'absolute', top: '-15px', right: '-15px',
								background: '#ff4d4d', color: 'white', border: '3px solid black',
								borderRadius: '50%', width: '40px', height: '40px',
								cursor: 'pointer', fontWeight: 'bold', zIndex: 10, fontSize: '18px'
							}}
						>
							X
						</button>

						{/* Картинка */}
						{item.image_url && (
							<div style={{
								width: '100%',
								height: '300px',
								border: '3px solid black',
								borderRadius: '10px',
								marginBottom: '15px',
								overflow: 'hidden',
								backgroundColor: 'white',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}>
								<img
									src={item.image_url}
									alt={item.title}
									style={{
										maxWidth: '100%',
										maxHeight: '100%',
										objectFit: 'contain',
										display: 'block'
									}}
								/>
							</div>
						)}

						<h3 style={{ margin: '0 0 10px 0', fontSize: '1.5rem', wordWrap: 'break-word' }}>{item.title}</h3>
						<p style={{ fontWeight: 'bold', fontSize: '24px', color: '#ff1493', margin: '0 0 5px 0' }}>{item.price} ₽</p>
						<p style={{ fontSize: '14px', color: 'gray', marginBottom: '20px' }}>{formatDate(item.created_at)}</p>

						<div style={{ marginTop: 'auto' }}>
							{item.link && (
								<a href={item.link} target="_blank" rel="noopener noreferrer"
									className="btn-primary"
									style={{ display: 'block', textAlign: 'center', fontSize: '16px', padding: '12px 0', background: 'black', textDecoration: 'none' }}>
									КУПИТЬ 🛒
								</a>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};