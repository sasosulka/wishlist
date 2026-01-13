const toBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = error => reject(error);
	});
};

// СЖАТИЕ КАРТИНКИ 
export const convertFileToBase64 = async (file: File): Promise<string> => {
	// Если меньше 100кб, не сжимаем
	if (file.size < 100000) {
		return toBase64(file);
	}

	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = (event) => {
			const img = new Image();
			img.src = event.target?.result as string;

			img.onload = () => {
				const canvas = document.createElement('canvas');
				const maxWidth = 600;
				const scaleSize = maxWidth / img.width;
				const newWidth = maxWidth;
				const newHeight = img.height * scaleSize;

				canvas.width = newWidth;
				canvas.height = newHeight;

				const ctx = canvas.getContext('2d');
				ctx?.drawImage(img, 0, 0, newWidth, newHeight);

				const compressedData = canvas.toDataURL('image/jpeg', 0.6);
				resolve(compressedData);
			};
		};
		reader.onerror = (error) => reject(error);
	});
};