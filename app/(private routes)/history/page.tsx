import { redirect } from 'next/navigation';

export default function HistoryRootPage() {
  redirect('/transactions/history/expenses');
}
