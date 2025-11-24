import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

function PlaceOrder() {

  const [method, setMethod] = useState('cod')
  const {navigate} = useContext(ShopContext)

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'Delivery'} text2={'Information'}/>
        </div>
        <div className='flex gap-3'>
          <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='first name' />
          <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='last name' />
        </div>
        <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='email address' />
        <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='street' />
        <div className='flex gap-3'>
          <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='city' />
          <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='state' />
        </div>
        <div className='flex gap-3'>
          <input type="number" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='zip-code' />
          <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='country' />
        </div>
        <input type="number" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='phone' />
      </div>

      {/* right side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'Payment'} text2={'Method'}/>
          {/* payment methods */}
          <div className='flex gap-3 flex-col lg:flex-row  '>
            <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 cursor-pointer px-3'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400': ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 cursor-pointer px-3'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400': ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 cursor-pointer px-3'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400': ''}`}></p>
              <p className='text-sm text-gray-500 font-medium mx-4'>Cash on Delivery</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button onClick={()=>navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm'>Place order</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder