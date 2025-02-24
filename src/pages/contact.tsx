import { Building, Mail, Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Head from 'next/head'
// import { Textarea } from '@/components/ui/textarea'

// Mock store locations
const storeLocations = [
  {
    id: 1,
    name: 'Downtown Store',
    address: '123 Main Street',
    city: 'New York',
    phone: '(555) 123-4567',
    email: 'downtown@dvdrental.com',
  },
  {
    id: 2,
    name: 'Westside Store',
    address: '456 West Avenue',
    city: 'New York',
    phone: '(555) 234-5678',
    email: 'westside@dvdrental.com',
  },
  {
    id: 3,
    name: 'Eastside Store',
    address: '789 East Boulevard',
    city: 'New York',
    phone: '(555) 345-6789',
    email: 'eastside@dvdrental.com',
  },
]

export default function ContactPage() {
  return (
    <div className="flex flex-1 justify-center">
      <Head>
        <title>Contact Us</title>
      </Head>
      <div className="container px-4 py-12 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {`Have a question or need assistance? We're here to help! Reach out to us through any of our store locations or send us a message.`}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {storeLocations.map((location) => (
            <Card key={location.id}>
              <CardHeader>
                <CardTitle>{location.name}</CardTitle>
                <CardDescription>{location.city}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{location.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{location.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{location.email}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>
              {`Fill out the form below and we'll get back to you as soon as possible.`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="Enter your first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Enter your last name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                {/* <Textarea
                className="min-h-[150px]"
                id="message"
                placeholder="Enter your message"
              /> */}
              </div>
              <Button className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
