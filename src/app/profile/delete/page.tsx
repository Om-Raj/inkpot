import DeleteUserForm from "@/components/form/DeleteUserForm";
import { getCurrentUsser } from "@/lib/session";
import prisma from "@/lib/db";

const page = async () => {
  const user = await getCurrentUsser();
  if (!user || !user.email) {
    return (
        <h3><center>Your are not authorised to access this page.</center></h3>
    )
  }
  const password = await prisma.user.findUnique({
    where: {
        email: user.email
    },
    select: {
        password: true
    }
  })
  return (
    <div className='grid place-content-center'>
      <div className='my-10 p-6 border-solid rounded-md border-2 w-full max-w-md'>
        <h2 className="mb-3"><center>Delete Account</center></h2>
        {(!password) ? (
            <p><center>You need to set an account password before you can delete this account.</center></p>
        ): (
            <>
                <p className="mb-5"><center>Are you sure you want to delete your account? All data will be lost.</center></p>
                <DeleteUserForm />
            </>
        )}
      </div>
    </div>
  );
};

export default page;