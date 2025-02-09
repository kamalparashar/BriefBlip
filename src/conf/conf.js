const conf = {
    nhost_region: String(import.meta.env.VITE_NHOST_REGION),
    nhost_subdomain: String(import.meta.env.VITE_NHOST_SUBDOMAIN),
    hasura_url: String(import.meta.env.VITE_HASURA_URL),
    hasura_secret: String(import.meta.env.VITE_HASURA_SECRET)
}
export default conf;