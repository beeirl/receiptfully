import { Header } from '@/components/header'
import {
  DownloadIcon,
  HeartIcon,
  MaximizeIcon,
  PackageIcon,
  PenIcon,
  SettingsIcon,
  UserIcon,
} from '@beeirl/ui/line-icons'
import { createFileRoute } from '@tanstack/react-router'
import { BrowserFrame } from './-components/browser-frame'
import { Button } from './-components/button'
import { FAQ } from './-components/faq'
import { FeatureCard } from './-components/feature-card'
import { Footer } from './-components/footer'
import { SectionHeading } from './-components/section-heading'
import { Separator } from './-components/separator'
import { StepCard } from './-components/step-card'

export const Route = createFileRoute('/')({
  component: IndexRoute,
})

const faqItems = [
  {
    question: 'Is Receiptfully really free?',
    answer:
      'Yes, Receiptfully is completely free to use. There are no hidden costs, premium tiers, or usage limits. Create as many receipts as you need at no cost.',
  },
  {
    question: 'Do I need to create an account?',
    answer:
      'No account required. You can start creating receipts immediately without signing up or providing any personal information. Just open the app and start designing.',
  },
  {
    question: 'What formats can I export to?',
    answer:
      'Receipts are exported as high-quality PNG images. This format works great for printing, emailing to customers, or including in digital documents.',
  },
  {
    question: 'Can I add my business logo?',
    answer:
      'Absolutely. You can upload your business logo and it will appear on your receipt. The image component supports various formats including PNG, JPG, and SVG.',
  },
  {
    question: 'Is my data stored anywhere?',
    answer:
      'Your privacy is important to us. All receipt generation happens in your browser. We do not store your receipt data, business information, or any files you upload on our servers.',
  },
]

function IndexRoute() {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Header />

      <main className="flex-1 space-y-20 pt-12 sm:pt-24">
        {/* Hero Section */}
        <section className="custom-container">
          <div className="mx-auto max-w-4xl text-center">
            <SectionHeading
              eyebrow="Stop wasting time on receipt templates"
              title="Generate professional receipts in seconds"
              subtitle="Create beautiful, customizable receipts for your business. Add your logo, line items, payment details, and more. Free to use, no signup required."
              highlight="Free to use, no signup required"
            />
            <div className="mt-12 flex flex-col items-center justify-center">
              <Button to="/generate">Get Started Free</Button>
              <p className="mt-4 text-sm text-gray-500">No credit card required. No signup needed.</p>
            </div>
            <BrowserFrame className="mt-12 w-full">
              <div className="aspect-video bg-gray-50" />
            </BrowserFrame>
          </div>
        </section>

        <Separator />

        {/* Steps Section */}
        <section className="custom-container">
          <SectionHeading
            title="Create receipts in three simple steps"
            subtitle="From design to download in under a minute. No complicated setup, no learning curve."
            highlight="under a minute"
          />
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StepCard
              step={1}
              title="Design Your Receipt"
              description="Choose from components like text, line items, payment details, and barcodes. Customize every detail to match your brand."
              icon={<PenIcon className="h-full w-full" />}
              color="purple"
            />
            <StepCard
              step={2}
              title="Preview in Real-Time"
              description="See your receipt update instantly as you make changes. What you see is exactly what you'll get when you export."
              icon={<MaximizeIcon className="h-full w-full" />}
              color="blue"
            />
            <StepCard
              step={3}
              title="Download & Share"
              description="Export as a high-quality image with one click. Ready to print, email, or share with your customers."
              icon={<DownloadIcon className="h-full w-full" />}
              color="green"
            />
          </div>
        </section>

        <Separator />

        {/* Features Section */}
        <section className="custom-container">
          <SectionHeading
            title="Everything you need, nothing you don't"
            subtitle="Professional receipts without the complexity. Built for simplicity, designed for results."
            highlight="Built for simplicity"
          />
          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FeatureCard
              title="No Account Required"
              description="Start creating receipts immediately. No signup, no email verification, no friction."
              icon={<UserIcon className="h-full w-full" />}
              color="rose"
            />
            <FeatureCard
              title="Fully Customizable"
              description="Add your logo, customize fonts, colors, and layout. Make every receipt match your brand."
              icon={<SettingsIcon className="h-full w-full" />}
              color="purple"
            />
            <FeatureCard
              title="Multiple Components"
              description="Line items, payment details, barcodes, dates, images, and separators. Everything you need in one place."
              icon={<PackageIcon className="h-full w-full" />}
              color="blue"
            />
            <FeatureCard
              title="Free Forever"
              description="No hidden costs, no premium tiers, no usage limits. Professional receipts at absolutely no cost."
              icon={<HeartIcon className="h-full w-full" />}
              color="green"
            />
          </div>
        </section>

        <Separator />

        {/* FAQ Section */}
        <section className="custom-container">
          <div className="mx-auto max-w-xl">
            <SectionHeading title="Frequently asked questions" />
            <FAQ items={faqItems} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
