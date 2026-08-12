export const cookieOptions = {
    httpOnly: true,
    secure: true,        // must be true when sameSite is "none" — cookie only sent over HTTPS
    sameSite: "None",    // allows cross-domain (Vercel <-> Render) cookie sharing
    maxAge: 1000 * 60 * 60
}