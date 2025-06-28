import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'
import { WelcomeEmail } from '@/lib/email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)
const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/HXQnlpYjI1tELYU2zUgCe7'

export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json()

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      )
    }

    // First get the application details including the temporary password
    const { data: application, error: fetchError } = await supabase
      .from('applications')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError) {
      console.error('Error fetching application:', fetchError)
      return NextResponse.json(
        { error: 'Failed to fetch application' },
        { status: 500 }
      )
    }

    // Update the status
    const { data: updatedApplication, error } = await supabase
      .from('applications')
      .update({ 
        status,
        last_updated: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating application:', error)
      return NextResponse.json(
        { error: 'Failed to update application status' },
        { status: 500 }
      )
    }

    // Create Supabase auth user and send welcome email if application is approved
    if (status === 'approved' && application) {
      try {
        // Create Supabase auth user using signUp
        const { data: authUser, error: authError } = await supabase.auth.signUp({
          email: application.email,
          password: application.temp_password || 'OpenGeek@2024', // Fallback password if temp_password is not set
          options: {
            data: {
              username: application.username,
              full_name: application.name,
              phone: application.phone.replace('+91 ', '') // Remove +91 prefix and space
            }
          }
        })

        if (authError) {
          console.error('Error creating auth user:', authError)
          // Don't return error here, continue with email sending
        } else {
          console.log('Created auth user:', authUser)
        }

        // Send welcome email
        await resend.emails.send({
          from: 'OpenGeek Community <community@noreply.opengeek.in>',
          to: application.email,
          subject: 'Welcome to OpenGeek Community! 🎉',
          react: WelcomeEmail({
            name: application.name,
            username: application.username,
            password: application.temp_password || 'Please contact support for your password'
          })
        });

        // Update email sent status
        const { error: emailUpdateError } = await supabase
          .from('applications')
          .update({ 
            is_email_sent: true,
            email_sent_at: new Date().toISOString()
          })
          .eq('id', id)

        if (emailUpdateError) {
          console.error('Error updating email sent status:', emailUpdateError);
        }
      } catch (emailError) {
        console.error('Error sending welcome email:', emailError);
        // Don't return error response here as the status update was successful
      }
    }

    return NextResponse.json({
      success: true,
      application: updatedApplication
    })
  } catch (error) {
    console.error('Error updating application status:', error)
    return NextResponse.json(
      { error: 'Failed to update application status' },
      { status: 500 }
    )
  }
} 