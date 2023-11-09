import React from 'react'
import { useNavigate } from 'react-router-dom'
const Food = () => {
   
    const navigate = useNavigate()

  const gainWeight = () => {
    navigate('/user/weightgain')
  }
  
  const loseWeight = () => {
    navigate('/user/weightlose')
  }


  return (
    <div className='p-3'>

      <section className="dark:bg-gray-600 dark:text-gray-100 mb-3 hover:bg-slate-700">
	<div className="container flex flex-col mx-auto lg:flex-row">
		<div className="w-full lg:w-1/3 p-3"  ><img className="h-full w-full" src='https://img.freepik.com/free-photo/front-view-young-female-sport-outfit-measuring-her-sizes-waist_140725-85472.jpg?size=626&ext=jpg&uid=R111094517&ga=GA1.2.2114328019.1690522243&semt=ais'/></div>
		<div className="flex flex-col w-full p-6 lg:w-2/3 md:p-8 lg:p-12">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 mb-8 dark:text-green-400">
				<path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
			</svg>
			<h2 className="text-3xl font-semibold leadi">Foods to weight lose</h2>
			<p className="mt-4 mb-8 text-sm">Herbal Nutrition food formula for weight lose .This will help you to fast relief from over weight</p>
			<button className="self-start px-10 py-3 text-lg font-medium rounded-3xl dark:bg-green-400 hover:bg-green-500 dark:text-gray-900" onClick={() =>{loseWeight()}}>Get started</button>
		</div>
	</div>
</section>

<section className="dark:bg-slate-600 dark:text-gray-100 hover:dark:bg-gray-800">
	<div className="container flex flex-col mx-auto lg:flex-row">
		<div className="w-full lg:w-1/3 p-3" ><img className="h-full w-full" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStDv-LIZJCN_8QMku1qjhLAzf5clHGV19nnw&usqp=CAU'/></div>
		<div className="flex flex-col w-full p-6 lg:w-2/3 md:p-8 lg:p-12">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 mb-8 dark:text-green-400">
				<path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
			</svg>
			<h2 className="text-3xl font-semibold leadi">Foods to gain weight</h2>
			<p className="mt-4 mb-8 text-sm">Herbal Nutrition food formula for weight gain .This will help you to imporove your weight </p>
			<button className="self-start px-10 py-3 text-lg font-medium rounded-3xl dark:bg-green-400  hover:bg-green-500 dark:text-gray-900" onClick={() =>{gainWeight( )}}>Get started</button>
		</div>
	</div>
</section>

    </div>
  )
}

export default Food
