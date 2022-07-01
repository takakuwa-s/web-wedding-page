export interface SlideShow {
	id: string;
	name: string;
	contentUrl: string;
	thumbnailUrl: string;
	mimeType: string;
	selected: boolean;
	createdAt: Date;
	updatedAt: Date;
}