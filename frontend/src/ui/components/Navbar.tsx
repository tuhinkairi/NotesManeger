import { Link } from 'react-router-dom'
import { Button as PrimaryBtn } from '../others/PrimaryBtn'

export default function Navbar() {
  return (
    <nav className='grid grid-cols-5 items-center justify-around font-semibold py-4'>
      <i className=''>NoteHost</i>
      <ul className='col-span-3 flex gap-8 mx-auto '>
        <Link to={"/"} className='inline-block w-fit mx-4 py-3 capitalize border-b-4 hover:border-primary-500 border-transparent'>home</Link>
        <Link to={"/"} className='inline-block w-fit mx-4 py-3 capitalize border-b-4 hover:border-primary-500 border-transparent'>product</Link>
        <Link to={"/"} className='inline-block w-fit mx-4 py-3 capitalize border-b-4 hover:border-primary-500 border-transparent'>about</Link>
        <Link to={"/"} className='inline-block w-fit mx-4 py-3 capitalize border-b-4 hover:border-primary-500 border-transparent'>product</Link>
      </ul>
      <div className='space-x-6 '>
        <PrimaryBtn>
          Sign Up
        </PrimaryBtn>
        <PrimaryBtn>
          Log In
        </PrimaryBtn>
      </div>
    </nav>
  )
}
