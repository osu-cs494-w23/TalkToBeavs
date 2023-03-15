import { useEffect, useState } from 'react'
import axios from 'axios'

function useProfile({ onid }) {
    const [profile, setProfile] = useState(null)

    const fetchProfile = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/social/get_profile?onid=${onid}`
            )
            setProfile(response.data.user)
        } catch (err) {
            setProfile(null)
            console.log(err)
        }
    }

    useEffect(() => {
        fetchProfile()

        return () => {
            setProfile(null)
        }
    }, [onid])

    return profile
}

export default useProfile
