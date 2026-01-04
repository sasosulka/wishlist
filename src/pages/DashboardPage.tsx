import { useEffect, useState } from 'react';
import { WishForm } from '../components/WishForm';
import { WishList } from '../components/WishList';
import type { IWish } from '../types';

export const DashboardPage = () => {
	// Грузим данные из локалстореджа сразу при создании стейта
	const [wishes, setWishes] = useState<IWish[]>(() => {
		const saved = localStorage.getItem('my_wishlist_data');
		return saved ? JSON.parse(saved) : [];
	});

	// Следим за изменениями списка и сохраняем, если что-то поменялось
	useEffect(() => {
		localStorage.setItem('my_wishlist_data', JSON.stringify(wishes));
	}, [wishes]);

	const addWish = (newWish: IWish) => {
		setWishes([newWish, ...wishes]);
	};

	const deleteWish = (id: number) => {
		if (window.confirm('Точно удаляем?')) {
			setWishes(wishes.filter(item => item.id !== id));
		}
	};

	const handleShare = () => {
		if (wishes.length === 0) return alert("Список пуст :(");

		let message = "🎀 МОЙ ВИШЛИСТ 🎀\n\n";

		wishes.forEach((item, index) => {
			message += `${index + 1}. ${item.title} — ${item.price} ₽\n`;

			// Если это ссылка на сайт
			if (item.link) message += `🛒 Купить: ${item.link}\n`;

			// Добавляем картинку, только если это нормальная ссылка, а не base64
			if (item.image_url && item.image_url.startsWith('http')) {
				message += `🖼️ Фото: ${item.image_url}\n`;
			}
			message += "\n";
		});

		const total = wishes.reduce((sum, item) => sum + item.price, 0);
		message += `💰 Итого: ${total.toLocaleString()} ₽`;

		navigator.clipboard.writeText(message)
			.then(() => alert("Скопировано"))
			.catch(() => alert("Ошибка при копировании"));
	};

	const totalPrice = wishes.reduce((sum, item) => sum + item.price, 0);

	return (
		<div className="container">
			<header style={{ marginBottom: '40px', textAlign: 'center' }}>
				<h1 style={{ fontSize: '3rem' }}>Мои хотелки 🎀</h1>

				<div style={{
					display: 'inline-block',
					background: '#e0ffe0',
					border: '3px solid black',
					borderRadius: '10px',
					padding: '10px 20px',
					marginTop: '20px',
					fontWeight: 'bold',
					boxShadow: '4px 4px 0px 0px #000'
				}}>
					Сумма: {totalPrice.toLocaleString()} ₽
				</div>

				<br />

				<button onClick={handleShare} className="btn-primary" style={{ marginTop: '20px', background: '#d1c4e9' }}>
					📤 Скопировать весь список
				</button>
			</header>

			<div className="dashboard-grid">
				<aside className="form-section">
					<WishForm onAddWish={addWish} />
				</aside>
				<main className="list-section">
					<WishList items={wishes} onDelete={deleteWish} />
				</main>
			</div>
		</div>
	);
};