import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'
import { AcceptanceEmail } from '@/lib/email-templates'

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

    // Send acceptance email if application is approved
    if (status === 'approved' && updatedApplication) {
      try {
        await resend.emails.send({
          from: 'OpenGeek Community <onboarding@resend.dev>',
          to: updatedApplication.email,
          subject: 'Welcome to OpenGeek Community! 🎉',
          react: AcceptanceEmail({
            name: updatedApplication.name,
            email: updatedApplication.email,
            password: updatedApplication.password,
            whatsappLink: WHATSAPP_GROUP_LINK
          })
        });
      } catch (emailError) {
        console.error('Error sending acceptance email:', emailError);
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