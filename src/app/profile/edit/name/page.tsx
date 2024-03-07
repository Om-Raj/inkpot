import EditNameForm from '@/components/form/EditNameForm';
import { getCurrentUser } from '@/lib/session';

const page = async () => {
  const user = await getCurrentUser();
  return (
    <div className='main'>
      {user?.email ? (
        <div className='my-5 flex justify-center items-center '>
            <div className='p-6 border-solid rounded-md border-2 w-full max-w-md'>
                <h2 className='mb-5'><center>Edit Name</center></h2>
                <p className='mb-3'><center>You will need to re-login after changing your name.</center></p>
                <EditNameForm />
            </div>
        </div>
      ) : (
        <h3>
            <center>You need to sign in to access this page.</center>
        </h3>
      )}
    </div>
  );
};

export default page;