import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashComment from '~/components/DashComment'
import DashPosts from '~/components/DashPosts'
import DashProfile from '~/components/DashProfile'
import DashSidebar from '~/components/DashSidebar'
import DashUsers from '~/components/DashUsers'
import DashboardComponent from '~/components/DashboardComponent'


function Dashboard() {
  const location = useLocation()
  const [tab, setTab] = useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  },[location])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* SideBar */}
      <div>
        <DashSidebar />
      </div>
      {/* Dashboard */}
      {tab === 'dash' && <DashboardComponent />}
      {/* Profile */}
      {tab === 'profile' && <DashProfile />}
      {/* Posts */}
      {tab === 'posts' && <DashPosts />}
      {/* Users */}
      {tab === 'users' && <DashUsers />}
      {/* Comments */}
      {tab === 'comments' && <DashComment />}
    </div>
  )
}

export default Dashboard