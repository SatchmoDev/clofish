export const imager = (path: string) =>
  "https://kc21xaah5de38ehp.public.blob.vercel-storage.com/" + path

export const domain = () =>
  process.env.NODE_ENV === "production"
    ? "https://clofish.amspaceseth.net/"
    : "http://localhost:3000/"
