import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Metadata } from 'next';
import EditCustomerForm from '@/app/ui/customers/edit-form';
import { fetchCustomerById } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Edit Invoice',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const customer = await fetchCustomerById(id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customer', href: '/dashboard/customers' },
          {
            label: 'Edit Customer',
            href: `/dashboard/customers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditCustomerForm customer={customer}/>
    </main>
  );
}
