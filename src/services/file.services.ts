import { API_UPLOAD_FILE } from './_const';
import { fetchApp } from './_fetchApp';

export const postFile = (formData: FormData) => fetchApp.postFile(API_UPLOAD_FILE, formData);
