export function slugify(text = '') {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // remove special chars
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-') // collapse multiple dashes
    .replace(/^-|-$/g, '') // trim leading/trailing dashes
}
