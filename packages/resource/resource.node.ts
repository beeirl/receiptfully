import { Resource as ResourceBase } from "sst"

export const Resource = new Proxy(
  {},
  {
    get(_target, prop: keyof typeof ResourceBase) {
      const value = ResourceBase[prop]
      return value
    },
  },
) as Record<string, any>
