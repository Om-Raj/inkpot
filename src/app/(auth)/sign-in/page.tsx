import SignInForm from '@/components/form/SignInForm';

const page = () => {
  return (
    <div className='grid place-content-center'>
      <div className='my-10 p-6 border-solid rounded-md border-2 w-full max-w-md'>
        <h2 className='mb-3'><center>Sign In</center></h2>
        <SignInForm />
      </div>
    </div>
  );
};

export default page;
