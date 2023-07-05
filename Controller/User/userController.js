

const home = ((req, res) => {
    try {
        res.render("home")

    } catch (error) {
        console.log(error);
    }
})

const profile = (async (req, res) => {
    try {
        const user = req.session.user
        res.render("profile", { user: user })

    } catch (error) {
        console.log(error);
    }

})

export default {
    home,
    profile
}