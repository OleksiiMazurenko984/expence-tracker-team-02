export default function TransactionsPage({ params }: { params: { transactionsType: string } }) {
  return <main>Transactions: {params.transactionsType}</main>;
}

