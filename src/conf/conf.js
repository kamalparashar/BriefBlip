const conf = {
    nhost_region: String(import.meta.env.VITE_NHOST_REGION),
    nhost_subdomain: String(import.meta.env.VITE_NHOST_SUBDOMAIN),
    backend_url: String(import.meta.env.VITE_BACKEND_URL),
}
export default conf;