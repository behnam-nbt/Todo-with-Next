import ProfilePage from '@/components/templates/ProfilePage'
import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

async function Profile() {
    const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }
    return (
        <div><ProfilePage /></div>
    )
}

export default Profile