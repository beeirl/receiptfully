import { logEvent } from '@/util/analytics'
import { z } from '@/util/zod'
import { Dialog, useDialogRootContext } from '@beeirl/ui/dialog'
import { useForm } from '@beeirl/ui/form'
import { AlertTriangleIcon, LightbulbIcon, QuestionIcon } from '@beeirl/ui/line-icons'
import { cn } from '@beeirl/ui/styles'
import { TextArea } from '@beeirl/ui/text-area'
import { TextInput } from '@beeirl/ui/text-input'
import { REST } from '@discordjs/rest'
import { createServerFn } from '@tanstack/react-start'
import { useStore } from '@tanstack/react-store'
import { Routes } from 'discord-api-types/v10'
import React from 'react'
import { Resource } from 'sst'
import { snackbarManager } from './snackbar'

const sendFeedback = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      category: z.string().min(1),
      email: z.email().or(z.literal('')),
      location: z.string().optional(),
      message: z.string().min(1),
      name: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const client = new REST().setToken(Resource.DISCORD_FEEDBACK_BOT_TOKEN.value)
    await client.post(Routes.channelMessages('1447661761116242063'), {
      body: {
        content: [
          `**Name:** ${data.name || 'Anonymous'}`,
          `**Email:** ${data.email || 'Anonymous'}`,
          `**Category:** ${data.category}`,
          `**Location:** ${data.location || 'unknown'}`,
          `**Message:**\n${data.message}`,
        ].join('\n'),
      },
    })
    return { success: true }
  })

function SupportDialogRoot({ children }: { children: React.ReactNode }) {
  return <Dialog.Root>{children}</Dialog.Root>
}

const SupportDialogTrigger = Dialog.Trigger

function SupportDialogPopup({
  defaultCategory = 'problem',
  location,
}: {
  defaultCategory?: 'problem' | 'question' | 'feedback'
  location: string
}) {
  const { open, setOpen } = useDialogRootContext()

  React.useEffect(() => {
    if (open) {
      logEvent('support_dialog_opened', { location })
    }
  }, [open, location])

  const form = useForm({
    defaultValues: {
      category: defaultCategory,
      email: '',
      name: '',
      message: '',
    },
    validators: {
      onSubmit: z.object({
        category: z.enum(['problem', 'question', 'feedback']),
        email: z.email('Invalid email address').or(z.literal('')),
        name: z.string().or(z.literal('')),
        message: z.string().min(1, 'Please write a message before sending'),
      }),
    },
    onSubmit: async ({ formApi, value }) => {
      sendFeedback({ data: { ...value, location } })
      logEvent('support_message_sent', { location })
      formApi.reset()
      setOpen(false)
      snackbarManager.add({
        title: 'Message sent',
        description: 'Message was sent to the Receiptfully team!',
      })
    },
  })

  const formStore = useStore(form.store, (state) => ({
    category: state.values.category,
  }))

  return (
    <Dialog.Popup className="max-w-lg">
      <Dialog.Header>
        <Dialog.Title>
          {
            {
              problem: 'Contact us',
              question: 'Ask a question',
              feedback: 'Send feedback',
            }[formStore.category]
          }
        </Dialog.Title>
        <Dialog.Description>
          {
            {
              problem:
                "What is the issue? If you're reporting a bug, what are the steps you took so we can reproduce the behaviour?",
              question: 'How can we help? Please share any relevant information we may need to answer your question.',
              feedback:
                "How can we improve Receiptfully? If you have a feature request, can you also share how you would use it and why it's important to you?",
            }[formStore.category]
          }
        </Dialog.Description>
      </Dialog.Header>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <form.Field name="category">
          {(field) => (
            <div className="flex rounded-lg border border-gray-200 p-1 max-sm:flex-col">
              <button
                className={cn(
                  'flex w-full cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium sm:justify-center',
                  field.state.value === 'problem' && 'bg-gray-100',
                )}
                type="button"
                onClick={() => field.setValue('problem')}
              >
                <AlertTriangleIcon className="size-4" />
                Problem
              </button>
              <button
                className={cn(
                  'flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium sm:justify-center',
                  field.state.value === 'question' && 'bg-gray-100',
                )}
                type="button"
                onClick={() => field.setValue('question')}
              >
                <QuestionIcon className="size-4" />
                Question
              </button>
              <button
                className={cn(
                  'flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium sm:justify-center',
                  field.state.value === 'feedback' && 'bg-gray-100',
                )}
                type="button"
                onClick={() => field.setValue('feedback')}
              >
                <LightbulbIcon className="size-4" />
                Feedback
              </button>
            </div>
          )}
        </form.Field>
        <form.AppField name="name">
          {(field) => (
            <field.Root>
              <field.Label>
                Name <span className="text-gray-500">(optional)</span>
              </field.Label>
              <field.Control render={<TextInput />} />
              <field.Error />
            </field.Root>
          )}
        </form.AppField>
        <form.AppField name="email">
          {(field) => (
            <field.Root>
              <field.Label>
                Email <span className="text-gray-500">(optional)</span>
              </field.Label>
              <field.Control render={<TextInput />} />
              <field.Error />
            </field.Root>
          )}
        </form.AppField>
        <form.AppField name="message">
          {(field) => (
            <field.Root>
              <field.Label>Message</field.Label>
              <field.Control
                render={
                  <TextArea
                    autoFocus
                    placeholder={
                      {
                        problem: 'Something seems wrong...',
                        question: 'How do I...',
                        feedback: 'What if...',
                      }[formStore.category]
                    }
                    minRows={4}
                    maxRows={4}
                  />
                }
              />
              <field.Error />
            </field.Root>
          )}
        </form.AppField>
        <form.AppForm>
          <form.SubmitButton className="w-full" size="lg">
            {
              {
                problem: 'Send message',
                question: 'Send question',
                feedback: 'Send feedback',
              }[formStore.category]
            }
          </form.SubmitButton>
        </form.AppForm>
      </form>
      <Dialog.Footer className="-mb-1 text-center">
        <span className="text-sm text-gray-500">
          You can also email us at{' '}
          <a
            className="text-gray-900"
            href={`mailto:hello@receiptfully.com?subject=${
              {
                problem: 'Problem',
                question: 'Question',
                feedback: 'Feedback',
              }[formStore.category]
            }`}
          >
            hello@receiptfully.com
          </a>
          .
        </span>
      </Dialog.Footer>
    </Dialog.Popup>
  )
}

export const SupportDialog = {
  Root: SupportDialogRoot,
  Trigger: SupportDialogTrigger,
  Popup: SupportDialogPopup,
}
