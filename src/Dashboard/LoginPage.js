import { SupabaseClient } from "./supabaseClient"


async function Login(email, password) {
    const { data, error } = await SupabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    })

    if (error) {
        alert('Wrong email or password')
        return
    }
    // Login worked - redirect to events page
    window.location.href = '/events'
}

// To log out:
async function Logout() {
    await SupabaseClient.auth.signOut()
    window.location.href = '/'
}
