'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/ui/button';
import { useState } from 'react';
import { useCreateContactUsRequest } from '@/lib/api/contact-us/create-contact-us-request';
import { Checkbox, CheckboxIndicator } from '@/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import { useToast } from '@/ui/use-toast';

const contactUsFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  message: z.string().min(1, { message: 'Message is required' }),
  checked: z
    .boolean()
    .refine((value) => value, 'You must agree to the terms and conditions'),
});
type ContactUsFormSchema = z.infer<typeof contactUsFormSchema>;

export const ContactUsForm = () => {
  const { createContactUsRequestAsync } = useCreateContactUsRequest();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const contactUsForm = useForm<ContactUsFormSchema>({
    resolver: zodResolver(contactUsFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      checked: false,
    },
  });

  const onSubmit = async ({ message, name, email }: ContactUsFormSchema) => {
    try {
      setSubmitting(true);
      
      // 1) Отправляем на backend (сохранить заявку)
      try {
        await createContactUsRequestAsync({ name, email, message });
      } catch (e) {
        // Backend error is not critical, continue with email sending
        console.warn('Backend request failed:', e);
      }

      // 2) Отправляем email через API route
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: 'Success!',
          description: 'Your message has been sent successfully.',
        });
        // Reset form after successful submission
        contactUsForm.reset();
      } else {
        throw new Error(data.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send your message. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="border-primary flex w-full max-w-[620px] flex-col gap-4 rounded-[16px] border-2 bg-white p-4 shadow-sm md:gap-[24px] md:p-[24px]">
      <div className="text-[20px] font-semibold text-slate-800 md:text-[24px]">Contact us</div>
      <Form {...contactUsForm}>
        <form
          onSubmit={contactUsForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-[16px]"
        >
          <FormField
            control={contactUsForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-full rounded-[8px] border border-slate-300 bg-slate-100 px-3 py-3 text-slate-800 placeholder:text-slate-500 focus:bg-white focus:border-primary md:px-[14px] md:py-[13px]"
                    placeholder="Your name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-slate-800" />
              </FormItem>
            )}
          />
          <FormField
            control={contactUsForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-full rounded-[8px] border border-slate-300 bg-slate-100 px-3 py-3 text-slate-800 placeholder:text-slate-500 focus:bg-white focus:border-primary md:px-[14px] md:py-[13px]"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-slate-800" />
              </FormItem>
            )}
          />
          <FormField
            control={contactUsForm.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="w-full min-h-[120px] rounded-[8px] border border-slate-300 bg-slate-100 px-3 py-3 text-slate-800 placeholder:text-slate-500 focus:bg-white focus:border-primary md:min-h-[154px] md:px-[14px] md:py-[10px]"
                    placeholder="What we can help you with?"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-slate-800" />
              </FormItem>
            )}
          />
          <FormField
            control={contactUsForm.control}
            name="checked"
            render={() => (
              <FormItem>
                <div className="flex items-center gap-[10px]">
                  <FormControl>
                    <Checkbox
                      className="flex min-h-[20px] min-w-[20px] items-center justify-center disabled:cursor-not-allowed"
                      onCheckedChange={(state) => {
                        const isChecked = state.valueOf().toString() === 'true';
                        contactUsForm.setValue('checked', isChecked);
                        if (isChecked) {
                          contactUsForm.clearErrors('checked');
                        }
                      }}
                    >
                      <CheckboxIndicator />
                    </Checkbox>
                  </FormControl>
                  <div className="m-0 text-[11px] leading-relaxed text-slate-800/80 md:text-[12px]">
                    By submitting this form, I read the{' '}
                    <Link
                      href="/privacy-policy"
                      className="text-primary underline-offset-2 hover:underline"
                    >
                      Privacy Policy
                    </Link>{' '}
                    and agree with{' '}
                    <Link
                      href="/terms-and-conditions"
                      className="text-primary underline-offset-2 hover:underline"
                    >
                      Terms and Conditions
                    </Link>
                  </div>
                </div>
                <FormMessage className="text-slate-800" />
              </FormItem>
            )}
          />
          <div className="mt-4 flex flex-col gap-4 md:mt-[16px] lg:flex-row lg:items-center lg:justify-end lg:gap-[24px]">
            <div className="block text-center text-[12px] font-medium text-slate-800/80 lg:hidden">
              Ask our moderators and community on Discord
            </div>
            <div className="flex w-full items-center gap-[8px] lg:hidden">
              <div className="h-[1px] w-full bg-slate-300" />
              <div className="text-[12px] font-medium text-slate-500">or</div>
              <div className="h-[1px] w-full bg-slate-300" />
            </div>
            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              className="h-full w-full px-6 py-3 md:px-[48px] md:py-[10px] lg:w-fit disabled:opacity-60"
            >
              {submitting ? 'Sending…' : 'Send Request'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
