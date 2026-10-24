
/**
 * @author Ryan Balieiro
 * @date 2025-05-10
 */

export const _fileUtils = {
    BASE_URL: import.meta.env.BASE_URL,

    download: (url) => {
        window.open(_fileUtils.resolvePath(url), "_blank")
    },

    loadJSON: async (path) => {
        try {
            const resolvedPath = _fileUtils.resolvePath(path)
            const response = await fetch(resolvedPath)
            const contentType = response.headers.get("content-type") || ""

            if (!response.ok || !contentType.includes("application/json")) {
                throw new Error(
                    `Request failed: ${response.status} ${response.statusText} — ${resolvedPath}`
                )
            }

            return await response.json()
        } catch (error) {
            console.error(`Failed to load JSON from ${path}:`, error)
            throw error
        }
    },

    resolvePath: (path) => {
        if (/^https?:\/\//i.test(path)) {
            return path
        }

        const baseUrl = _fileUtils.BASE_URL || "/"
        const cleanBase = baseUrl.endsWith("/")
            ? baseUrl
            : `${baseUrl}/`
        const cleanPath = path.replace(/^\/+/, "")

        return `${cleanBase}${cleanPath}`
    },
}
