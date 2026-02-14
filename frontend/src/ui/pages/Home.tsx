import React, { useCallback, useEffect, useMemo, useState } from "react"
import SocketHandler, { socket } from "./test/socket/socket"

export default function Home() {
  const [textContent, setTextContent] = useState<string>("")
  const io = useMemo(() => new SocketHandler(socket), [])

  // 1️⃣ Only update state on change
  const handleContent = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextContent(e.target.value)
    },
    []
  )

  // 2️⃣ Debounce emit (5 seconds idle)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (textContent.trim().length > 0) {
        io.sendMsg(textContent)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [textContent, io])

  // 3️⃣ Register receiver once
  useEffect(() => {
    io.reciveMsg(setTextContent)
  }, [io])

  return (
    <div className="mt-10 max-w-3xl mx-auto">
      <textarea
        value={textContent}
        onChange={handleContent}
        className="w-full rounded-2xl border border-gray-300 p-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={10}
        placeholder="This is text editor"
      />
    </div>
  )
}
