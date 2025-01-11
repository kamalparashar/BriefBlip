import { NhostClient } from "@nhost/react"
import conf from "../conf/conf.js"

const nhost = new NhostClient({
  subdomain: conf.nhost_subdomain,
  region: conf.nhost_region
})

export default nhost