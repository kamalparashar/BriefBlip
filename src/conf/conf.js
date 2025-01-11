const conf = {
    nhost_region: String(import.meta.env.VITE_NHOST_REGION),
    nhost_subdomain: String(import.meta.env.VITE_NHOST_SUBDOMAIN),
    n8n_url: String(import.meta.env.VITE_N8N_URL)
}
export default conf;