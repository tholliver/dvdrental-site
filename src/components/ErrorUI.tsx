import { AlertCircle, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

interface ErrorUIProps {
  error?: Error
  reset?: () => void
  fullPage?: boolean
  className?: string
}

export function ErrorUI({ error, reset, fullPage, className }: ErrorUIProps) {
  if (fullPage) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center text-center">
          <AlertCircle className="h-10 w-10 text-destructive" />
          <h2 className="mt-4 text-2xl font-bold tracking-tight">
            Something went wrong!
          </h2>
          <p className="mt-2 text-muted-foreground">
            {error?.message ||
              'We encountered an error while loading the data.'}
          </p>
          {reset && (
            <Button onClick={reset} className="mt-4" variant="outline">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Try again
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <Alert
      variant="destructive"
      className={cn(
        'flex flex-col items-start gap-4 sm:flex-row sm:items-center',
        className
      )}
    >
      <div className="flex-1">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error?.message || 'An error occurred while fetching the data.'}
        </AlertDescription>
      </div>
      {reset && (
        <Button
          variant="outline"
          size="sm"
          onClick={reset}
          className="bg-destructive-foreground text-destructive hover:bg-destructive-foreground/90"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      )}
    </Alert>
  )
}
