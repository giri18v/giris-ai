import ClientWrapper from './components/ClientWrapper'
import ClientHome from './components/ClientHome'

export default function Home() {
  return (
    <ClientWrapper>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <ClientHome />
        {/* ... rest of your component ... */}
      </main>
    </ClientWrapper>
  )
}
