
import { Link } from "react-router-dom"

type NewsItem = {
  id: string
  title: string
  date: string
  type: string
  icon?: string
}

type EventItem = {
  id: string
  title: string
  date: string
  time: string
  month: string
  day: string
  color: string
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    title: '12 Cool Coding Project Ideas',
    date: 'Jun 18th',
    type: 'Blog',
    icon: '📝'
  },
  {
    id: '2',
    title: 'Codédex Update - May 2025',
    date: 'Jun 7th',
    type: 'Blog',
    icon: '⚖️'
  },
  {
    id: '3',
    title: "What to Do When You Don't Have a Tech Internship",
    date: 'May 27th',
    type: 'Blog',
    icon: '⭐'
  }
]

const events: EventItem[] = [
  {
    id: '1',
    title: 'Resume Review Workshop',
    date: 'Wed Jul 16th',
    time: '3:00pm ET',
    month: 'JUL',
    day: '16',
    color: 'bg-amber-500'
  },
  {
    id: '2',
    title: 'Intro to p5.js workshop',
    date: 'Wed Jul 23rd',
    time: '1:00pm ET',
    month: 'JUL',
    day: '23',
    color: 'bg-green-500'
  },
  {
    id: '3',
    title: 'Club LinkedIn Profile Reviews',
    date: 'Wed Aug 13th',
    time: '2:00pm ET',
    month: 'AUG',
    day: '13',
    color: 'bg-red-500'
  }
]

export function AdsSection() {
  return (
    <div className="space-y-8">
      {/* News Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-zinc-100">OPENGEEK News</h3>
          <Link 
            to="/news" 
            className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            See all
          </Link>
        </div>
        <div className="space-y-4">
          {newsItems.map((item) => (
            <Link 
              key={item.id}
              to={`/blog/${item.id}`}
              className="block group"
            >
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 flex items-center justify-center text-xl bg-zinc-900/80 rounded-md shadow-inner">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-zinc-200 group-hover:text-emerald-400 transition-colors truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1">
                    {item.date} | {item.type}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Events Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-zinc-100">Upcoming Events</h3>
        <div className="space-y-4">
          {events.map((event) => (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              className="block group"
            >
              <div className="flex gap-3 items-start">
                <div className={`w-10 h-12 ${event.color} rounded-md shadow-lg flex flex-col items-center justify-center text-black font-mono`}>
                  <span className="text-[10px] font-medium opacity-90">{event.month}</span>
                  <span className="text-lg font-bold leading-none">{event.day}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-zinc-200 group-hover:text-emerald-400 transition-colors truncate">
                    {event.title}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1">
                    {event.date} @ {event.time}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 