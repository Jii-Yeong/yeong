import supabaseAdmin from "@/supabase/init.ts"
import { getTodoListPage } from "@/utils/page.utils"

export const signUpWithPassword = async (email: string, password: string) => {
  try {
    const { error } = await supabaseAdmin.auth.signUp({
      email,
      password,
    })
    if (error) console.log(error)
  } catch (e) {
    console.log(e)
  }
}

export const signInWithPassword = async (email: string, password: string) => {
  try {
    const { error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      return new Error()
    }
  } catch (e) {
    console.log(e)
  }
}

export const signInWithGoogle = async () => {
  try {
    const { error } = await supabaseAdmin.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${
          import.meta.env.VITE_SUPABASE_REDIRECT_URL
        }${getTodoListPage()}`,
      },
    })
    if (error) console.log(error)
  } catch (e) {
    console.log(e)
  }
}

export const singOutForSite = async () => {
  try {
    const { error } = await supabaseAdmin.auth.signOut()
    if (error) console.log(error)
  } catch (e) {
    console.log(e)
  }
}
