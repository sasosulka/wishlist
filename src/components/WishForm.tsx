import { useForm } from "react-hook-form";
import type { IWish } from "../types";
import { convertFileToBase64 } from "../utils";

interface IFormInput {
	title: string;
	price: number;
	imageFile: FileList;
	imageLink: string;
	shopLink: string;
}

export const WishForm = ({ onAddWish }: { onAddWish: (wish: IWish) => void }) => {
	const { register, handleSubmit, reset } = useForm<IFormInput>();

	const onSubmit = async (data: IFormInput) => {
		let finalImage = "";

		if (data.imageFile?.[0]) {
			finalImage = await convertFileToBase64(data.imageFile[0]);
		} else {
			finalImage = data.imageLink || "";
		}

		onAddWish({
			id: Date.now(),
			created_at: new Date().toISOString(),
			title: data.title,
			price: Number(data.price),
			image_url: finalImage,
			link: data.shopLink,
		});

		reset(); 
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="card-brutal" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
			<h3 style={{ textAlign: 'center' }}>Чего я хочу?</h3>

			<div className="input-group">
				<label>Название:</label>
				<input {...register("title", { required: true })} className="input-brutal" placeholder="Напр. Клавиатура" />
			</div>

			<div className="input-group">
				<label>Цена (₽):</label>
				<input {...register("price", { required: true })} type="number" className="input-brutal" placeholder="Напр. 5000" />
			</div>

			<div style={{ border: '2px dashed black', padding: '10px', borderRadius: '8px' }}>
				<p style={{ marginBottom: '10px', fontSize: '14px', fontWeight: 'bold' }}>🖼️ Картинка:</p>
				<input {...register("imageFile")} type="file" accept="image/*" style={{ fontSize: '12px', width: '100%' }} />
				<div style={{ textAlign: 'center', margin: '5px 0', opacity: 0.5 }}>или</div>
				<input {...register("imageLink")} className="input-brutal" placeholder="Ссылка на фото..." />
			</div>

			<div className="input-group">
				<label>🛒 Где купить:</label>
				<input {...register("shopLink")} className="input-brutal" placeholder="Ссылка на маркетплейс..." />
			</div>

			<button type="submit" className="btn-primary">ДОБАВИТЬ В СПИСОК</button>
		</form>
	);
};