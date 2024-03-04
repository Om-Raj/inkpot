'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import GoogleSignInButton from '../GoogleSignInButton';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import { signOut } from 'next-auth/react';

const FormSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Current password is required')
      .min(8, 'Password must have more than 8 characters'),
  });

const DeleteUserForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch('/api/user', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: values.password,
      })
    })

    if (response.status === 201) {
      toast({
        title: 'Success',
        description: 'Account deleted successfully',
        variant: 'default'
      })
      const data = await signOut({
        redirect: false,
        callbackUrl: '/'
      })
      router.push(data.url)
    } else {
      const data = await response.json();
      toast({
        title: "Error",
        description: data.message,
        variant: "destructive",
      })
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input 
                        type='password' 
                        placeholder='Current password' 
                        {...field} 
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-6' type='submit' variant='destructive'>
            Delete Account
        </Button>
      </form>
    </Form>
  );
};

export default DeleteUserForm;