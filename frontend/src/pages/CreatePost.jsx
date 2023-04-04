import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
import axios from 'axios';

function CreatePost() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImage, setGeneratingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImage(true);
        const response = await axios.post(
          'https://my-dalle-clone.onrender.com/api/v1/dalle',
          { prompt: form.prompt }
        );
        setForm({
          ...form,
          photo: `data:image/jpeg;base64,${response.data.photo}`,
        });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImage(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('https://my-dalle-clone.onrender.com/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });
        await response.json();
        navigate('/');
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter a prompt and generate an image');
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleClear = () => {
    setForm({
      ...form,
      prompt: '',
    });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({
      ...form,
      prompt: randomPrompt,
    });
  };

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-3xl'>Create</h1>
        <p className='mt-2 text-[#666e75] text-sm max-w-[500px]'>
          Create imaginative and visually stunning images through by DALL-E AI
          and share them with the community
        </p>
      </div>
      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            labelName='Your name'
            type='text'
            name='name'
            placeholder='John Doe'
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName='Prompt'
            type='text'
            name='prompt'
            placeholder='an oil pastel drawing of an annoyed cat in a spaceship'
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
            handleClear={handleClear}
          />
          {/* Контейнер для карточки  */}
          <div className='relative bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 h-64 p-3 flex justify-center items-center'>
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className='w-full h-full object-contain'
              />
            ) : (
              <img
                src={preview}
                alt='preview'
                className='w-9/12 h-9/12 object-contain opacity-40'
              />
            )}
            {/* Loader */}
            {generatingImage && (
              <div className='absolute top-0 right-0 bottom-0 left-0 z-0 flex justify-center items-center bg-black bg-opacity-50 rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className='mt-5 flex gap-5'>
          {/* {GENERATE-BUTTON} */}
          <button
            type='button'
            onClick={generateImage}
            className='btn-generate-primary'
          >
            {generatingImage ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-sm'>
            Once you have created the image you want, you can shere it with
            others in the community
          </p>
          {/* {SHARE-BUTTON} */}
          <button type='submit' className='btn-share-primary'>
            {loading ? 'Sharing...' : 'Share with the community'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatePost;
