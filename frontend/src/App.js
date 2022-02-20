import './App.css';
import { useDropzone } from 'react-dropzone';
import { useCallback, useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [images, setImages] = useState([]);

  function handleUpload() {
    console.log('Uploading files...');
    axios
      .post('/upload', { images })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevState) => [...prevState, reader.result]);
      };
      reader.readAsDataURL(file);
    });
    console.log('acceptedFiles', acceptedFiles);
    console.log('rejectedFiles', rejectedFiles);
  }, []);

  useEffect(() => {
    console.log(images);
  }, [images]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/png',
  });

  return (
    <div className='App'>
      <div className='dropzone' {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? 'Drag Active' : 'You can drop your files here.'}
      </div>
      {images.length > 0 && (
        <div>
          {images.map((image, index) => (
            <img
              className='selected-images'
              src={image}
              key={index}
              alt={`img ${index}`}
            />
          ))}
        </div>
      )}
      {images.length > 0 && (
        <button onClick={handleUpload}>Upload images</button>
      )}
    </div>
  );
}

export default App;
