import ChangePasswordForm from '@/components/form/ChangePasswordForm';

const page = () => {
  return (
    <div className='grid place-content-center'>
      <div className='my-10 py-6 px-8 border-solid rounded-md border-2 w-100 max-w-md'>
        <h2 className='mb-5'><center>Change Password</center></h2>
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default page;