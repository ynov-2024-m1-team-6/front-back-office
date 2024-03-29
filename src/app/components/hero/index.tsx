import React from 'react';
import Image from 'next/image';

interface Props {
    img: HTMLImageElement;
    title: string;
}

const Hero = ({img, title}: Props) => {
    return (
        <div className="h-[400px] bg-primary-500 flex flex-col justify-center items-center rounded-2xl p-6">
                <Image src={img} alt="home" width={200} height={400} />
                
                <div className='flex text-white bg-black h-[40px] w-[100px] rounded-xl p-3 m-2'>
                    {title}
                </div>

            
        </div>
    );
};

export default Hero;