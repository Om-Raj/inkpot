import SignUpForm from '@/components/form/SignUpForm';

const page = () => {
  return (
    <div className='grid place-content-center'>
      <div className='my-10 p-6 border-solid rounded-md border-2 w-full max-w-md'>
        <h2 className='mb-3'><center>Sign Up</center></h2>
        <SignUpForm />
      </div>
    </div>
  );
};

export default page;
