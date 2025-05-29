import React,{ useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

const UploadImage = () => {
    const [imagePreview, setImagePreview] = useState(null); 
    const [responseMessage, setResponseMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            image: null,
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('image', values.image);

            try {
                const response = await axios.post('http://localhost:8081/api/birds/identify', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setResponseMessage(response.data); 
            } catch (error) {
                console.error('Error uploading image:', error);
                setResponseMessage('Upload failed');
            }
        },
    });

    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        formik.setFieldValue("image", file);
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl); // Set the preview URL
        }
    };

    return (
        <div className="container mt-5">
            
            <h2 className="text-center"></h2>
            <form onSubmit={formik.handleSubmit} className="mt-4">
                <div className="mb-3">
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="form-control"
                    />
                </div>
                <div className="btn-center">
                    <button type="submit" className="btn btn-primary">Identify</button>
                </div>
            </form>

            {imagePreview && (
                <div className="mt-4 text-center">
                    <h3>Нечто:</h3>
                    <img src={imagePreview} alt="Preview" className="img-fluid rounded" 
                        style={{ maxWidth: '300px', height: 'auto' }}/>
                </div>
            )}
            {responseMessage && (
                <div className={`mt-4 alert ${responseMessage.includes('failed') ? 'alert-danger' : 'alert-success'}`}>
                    {responseMessage}
                </div>
            )}
        </div>
    );
};

export default UploadImage;
