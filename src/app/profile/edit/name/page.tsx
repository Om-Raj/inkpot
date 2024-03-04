import EditNameForm from '@/components/form/EditNameForm';

const page = () => {
  return (
    <div className='my-20 grid place-content-center '>
        <div className='p-6 border-solid rounded-md border-2 w-full max-w-md'>
            <h2 className='mb-5'><center>Edit Name</center></h2>
            <EditNameForm />
        </div>
    </div>
  );
};

export default page;