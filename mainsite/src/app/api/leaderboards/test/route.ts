import { supabaseAdmin } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const { data, error } = await supabaseAdmin
      .from('leaderboards')
      .insert([
        {
          name: 'Sarah Chen',
          tier: 'Luminary',
          rank: 1,
          avatar_url: 'https://github.com/sarah.png',
          github_url: 'https://github.com/sarah',
          points: 2500,
          tag: 'AI Specialist',
          achievements: [
            {
              title: 'Project Lead',
              description: 'Successfully led major project initiatives',
              date_achieved: new Date().toISOString()
            },
            {
              title: 'Mentor',
              description: 'Mentored 10+ junior developers',
              date_achieved: new Date().toISOString()
            }
          ]
        },
        {
          name: 'Alex Kumar',
          tier: 'Virtuoso',
          rank: 1,
          avatar_url: 'https://github.com/alex.png',
          github_url: 'https://github.com/alex',
          points: 1500,
          tag: 'Full Stack Dev',
          achievements: [
            {
              title: 'Code Reviewer',
              description: 'Reviewed 100+ pull requests',
              date_achieved: new Date().toISOString()
            }
          ]
        },
        {
          name: 'Emma Wilson',
          tier: 'Apprentice',
          rank: 1,
          avatar_url: 'https://github.com/emma.png',
          github_url: 'https://github.com/emma',
          points: 500,
          tag: 'Frontend Dev',
          achievements: [
            {
              title: 'First PR',
              description: 'Made first open source contribution',
              date_achieved: new Date().toISOString()
            }
          ]
        }
      ])
      .select()

    if (error) {
      console.error('Error creating test entries:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 