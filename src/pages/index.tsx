import Link from 'next/link'
import { ArrowRight, Film, MapPin, Star, Users } from 'lucide-react'
import Head from 'next/head'
import { AuthForm } from '@/components/auth-form'

export default function Home() {
  // if (!session) {
  //   console.log('Session data: ', session)
  //   return <div>No session</div>
  // }

  return (
    <div>
      <Head>
        <title>DVD Rental</title>
        <meta property="og:title" content="Home" key="title" />
      </Head>
      <section className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Your Gateway to Endless Entertainment
          </h2>
          <p className="text-xl mb-8">
            Discover thousands of movies from classics to the latest
            blockbusters
          </p>
          <Link
            href="/dashboard"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-full text-lg font-semibold inline-flex items-center"
          >
            Start Browsing <ArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">
            Why Choose DVDRental?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Film className="mx-auto h-12 w-12 text-primary mb-4" />
              <h4 className="text-xl font-semibold mb-2">Vast Selection</h4>
              <p>Access to thousands of titles across multiple genres</p>
            </div>
            <div className="text-center">
              <MapPin className="mx-auto h-12 w-12 text-primary mb-4" />
              <h4 className="text-xl font-semibold mb-2">
                Convenient Locations
              </h4>
              <p>Multiple stores to serve you better</p>
            </div>
            <div className="text-center">
              <Star className="mx-auto h-12 w-12 text-primary mb-4" />
              <h4 className="text-xl font-semibold mb-2">Top Rated Service</h4>
              <p>Friendly staff and excellent customer support</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">
            Featured Categories
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Action', 'Comedy', 'Drama', 'Sci-Fi'].map((category) => (
              <Link
                key={category}
                href="#"
                className="bg-background shadow-md rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
              >
                <h4 className="font-semibold">{category}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* <section id="signin-section" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center">
            Join Our Community of Film Fans
          </h3>
          <AuthForm />
        </div>
      </section> */}
    </div>
  )
}
