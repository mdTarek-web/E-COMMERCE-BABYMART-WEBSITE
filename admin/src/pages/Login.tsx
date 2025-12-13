import { Card, CardContent, CardDescription, CardHeader,CardTitle } from '@/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { loginSchema } from '@/lib/validation'
import { motion } from "motion/react"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { useNavigate } from 'react-router'

import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input'

type FormData=z.infer<typeof loginSchema>

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async () => {};

  const form = useForm<FormData>({
    resolver:zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center'>
      <motion.div initial={{opacity:0, y: 20}} animate={{opacity:1, y:0}}
        transition={{duration:0.5, ease: "easeIn"}} className='w-full max-w-md px-4'>
        <Card className='w-full bg-white/95 backdrop-blur-sm shadow-xl border border-gray-200'>
          <CardHeader className='text-center space-y-2'>
            <motion.div initial={{ scale: 0.8}} animate={{scale: 1}} transition={{duration:0.3}}>
              <CardTitle className='text-3xl font-bold text-gray-800'>Admin Dashboard</CardTitle>
              <CardDescription className='text-gray-500'>
                Enter your credentials to sign in 
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} name='email' render={({field})=>( 
                  <FormItem className='text-sm font-medium text-gray-700'>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                       <Input placeholder='you@example.com' type='email' disabled={isLoading}
                       className='border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-sm hoverEffect'
                       {...field}/>
                    </FormControl>
                    <FormMessage className=''/>
                  </FormItem>
               )}>
                </FormField>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Login