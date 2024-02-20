import React from 'react'

export const HeroSection = () => {
  return (
    <section className='w-clampHero h-heightHero bg-surfaceContainer p-6 flex gap-8 laptop:m-16 tablet1:m-28 tablet2:m-5 mobile2:h-'>
      <div className='px-6 py-7 w-clampHeroBody bg-red-400 flex flex-col gap-10 justify-center' >
        <p>Nuestro equipo de expertos se encarga minuciosamente de cada detalle para garantizar la perfección en tu proyecto. <span className='hidden'>Calidad en cada paso, para un resultado que superará tus expectativas.</span></p>
        <button className='p-4 bg-buttonPrimary rounded w-40'>
        Contáctanos
        </button>
      </div>
      <div className='bg-yellow-300 w-sliderHero h-full flex flex-col gap-2'>
        <div className='bg-blue-200 w-full h-sliderHero'></div>
        <nav className='h-1.5 bg-red-600 w-full'></nav>

      </div>
      
    </section>
  )
}
