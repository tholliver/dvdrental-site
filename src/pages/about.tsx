import { Building2, Clock, Film, Users } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <div className="flex flex-1 justify-center">
      <div className="container px-4 py-12 md:px-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            About DVD Rental
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your trusted destination for movie rentals since 1995. We provide a
            wide selection of films for every taste and occasion.
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Film className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold">1000+</h3>
              <p className="text-muted-foreground">Films Available</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold">5000+</h3>
              <p className="text-muted-foreground">Happy Customers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Building2 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold">3</h3>
              <p className="text-muted-foreground">Store Locations</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Clock className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold">28</h3>
              <p className="text-muted-foreground">Years of Service</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Sections */}
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 1995, DVD Rental has been at the forefront of home
              entertainment. What started as a small local store has grown into
              a beloved institution with multiple locations across the city.
            </p>
            <p className="text-muted-foreground">
              We take pride in our carefully curated selection of films, ranging
              from timeless classics to the latest blockbusters. Our
              knowledgeable staff is always ready to help you find the perfect
              movie for any occasion.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              We believe in making great cinema accessible to everyone. Our
              mission is to provide a wide selection of quality films at
              affordable prices, while delivering exceptional customer service.
            </p>
            <p className="text-muted-foreground">
              {` We're committed to preserving the joy of movie rentals in an
            increasingly digital world, offering a personalized experience that
            online streaming services can't match.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
