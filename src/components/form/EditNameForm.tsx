'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
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
    name: z.string().min(1, 'Name is required').max(100),
  });

const EditNameForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch('/api/user/name', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: values.name,
      })
    })

    if (response.status === 201) {
      toast({
        title: 'Success',
        description: 'User name changed successfully',
        variant: 'default'
      })
      const data = await signOut({
        redirect: false,
        callbackUrl: '/sign-in'
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
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>New name</FormLabel>
                <FormControl>
                  <Input placeholder='Your name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-6' type='submit'>
            Submit
        </Button>
      </form>
    </Form>
  );
};

export default EditNameForm;