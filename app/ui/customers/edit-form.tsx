'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { StateCustomerCreation, updateCustomer } from '@/app/lib/actions';
import { useActionState } from 'react';
import { CustomerForm } from '@/app/lib/definitions';

export default function EditCustomerForm({customer} : {customer: CustomerForm}) {
  const initialState: StateCustomerCreation = { message: null, errors: {} };
  const updateCustomerWithID = updateCustomer.bind(null, customer.id);
  const [state, formAction] = useActionState(updateCustomerWithID, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer name */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Set customer's name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="string"
                defaultValue={customer.name}
                placeholder="Enter customer's name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
              />
            </div>
          </div>
        </div>

        {/* Customer email */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Set customer's email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="string"
                defaultValue={customer.email}
                placeholder="Enter customer's email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
              />
            </div>
          </div>
        </div>

    

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Customer</Button>
      </div>
    </form>
  );
}
