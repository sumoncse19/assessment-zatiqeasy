import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the products page
  redirect('/products');
}