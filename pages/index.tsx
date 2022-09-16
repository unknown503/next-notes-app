import type { NextPage } from 'next'
import { Form } from '../components/Form';
import { Notes } from '../components/Notes';

const Home: NextPage = () => {

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="py-0 hero-content flex-col lg:flex-row w-full">
        <Form />
        <Notes />
      </div>
    </div>
  )
}

export default Home
