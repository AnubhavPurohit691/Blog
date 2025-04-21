import { handleSubmit } from '@/app/action'
import SubmitButton from '@/components/SubmitButton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

export default function Createpost() {
  return (
    <div>
      <Card className='max-w-lg mx-auto'>
            <CardHeader>
                <CardTitle>Create Post</CardTitle>
                <CardDescription>Create a new post to share with the world</CardDescription>
            </CardHeader>
            <CardContent>
                <form className='flex flex-col gap-4' action={handleSubmit}>
                    <div className='grid gap-4'>
                        <div>
                            <Label htmlFor="title" className='text-sm font-medium'>Title</Label>
                            <Input type="text" id='title' name='title' className='border rounded-md p-2 w-full' />
                        </div>
                        <div>
                            <Label htmlFor="content" className='text-sm font-medium'>Content</Label>
                            <Textarea id='content' name="content"  className='border rounded-md p-2 w-full h-32' />
                        </div>
                    </div>
                    <div className='w-full'>
                    <SubmitButton/>
                    </div>
                </form>
            </CardContent>
      </Card>
    </div>
  )
}
