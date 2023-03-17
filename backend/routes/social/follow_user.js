import { Router } from 'express'
const router = Router()
import User from '../../models/User/User.js'

router.post('/', async (req, res) => {
    const { email, currentUserEmail } = req.body
    try {
        const toFollowUser = await User.findOne({ email: email })
        const currentUser = await User.findOne({ email: currentUserEmail })


        // Check if user is already following
        const currentIsFollowing = currentUser.following.find(
            (user) => user.email === toFollowUser.email
        )

        const isFollowing = toFollowUser.followers.find(
            (user) => user.email === currentUser.email
        )

        const isSelf = currentUser.email === toFollowUser.email

        if (isSelf) {
            return res.status(400).json({
                message: `You can't follow yourself`,
            })
        }



        if (isFollowing && currentIsFollowing) {
            return res.status(400).json({
                message: `${currentUser.name} is already following ${toFollowUser.name}`,
            })
        }


        if (!isFollowing && !currentIsFollowing) {

            currentUser.following.push(toFollowUser)
            toFollowUser.followers.push(currentUser)

            await currentUser.save()
            await toFollowUser.save()


            return res
                .status(200)
                .json({
                    message: `${currentUser.name} followed ${toFollowUser.name}`,
                    targetUser: toFollowUser,
                    currentUser: currentUser,
                    isFollowing: isFollowing,
                    currentIsFollowing: currentIsFollowing,
                })

        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

export default router
