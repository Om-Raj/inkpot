import SignOutButton from "@/components/SignOutButton"

const SignOutPage = () => {
    return (
        <div className='grid place-content-center'>
            <div className='my-20 p-6 border-solid rounded-md border-2 w-full max-w-md'>
                <h2><center>Sign Out</center></h2>
                <p className="mt-3">Are you sure you want to sign out?</p>
                <SignOutButton />
            </div>
        </div>
    )
}
export default SignOutPage