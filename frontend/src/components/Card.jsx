import React from 'react';
import { download } from '../assets';
import { downloadImage } from '../utils';

const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div className='relative rounded-xl group shadow-card hover:shadow-cardhover card'>
      <img
        className='w-full h-auto object-cover rounded-xl'
        src={photo}
        alt={prompt}
      />
      <div className='absolute bottom-0 left-0 right-0 group-hover:flex flex-col max-h-[94.5%] hidden bg-[#10131f] m-2 p-4 rounded-md'>
        <p className='text-white text-sm overflow-y-auto'>{prompt}</p>
        <div className='flex items-center justify-between mt-5 gap-2'>
          <div className='flex items-center gap-2'>
            <div className='w-7 h-7 rounded-full object-cover bg-cyan-500 flex justify-center items-center text-white text-xs font-bold'>
              {name[0]}
            </div>
            <p className='text-white text-sm'>{name}</p>
          </div>
          <button
          type='button'
          onClick={() => downloadImage(_id, photo)}
          className='outline-none bg-transparent border-none'
          >
            <img src={download} alt='download' className='w-6 h-6 object-contain invert'/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
