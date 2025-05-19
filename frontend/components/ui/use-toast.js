"use client"

import { useEffect, useState } from "react"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000000

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const toastTimeouts = new Map()

export const toastState = {
  toasts: [],
  listeners: new Set(),
  subscribe(listener) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  },
  notify() {
    this.listeners.forEach((listener) => listener(this.toasts))
  },
  addToast(toast) {
    const id = toast.id || genId()
    const newToast = { ...toast, id }

    this.toasts = [newToast, ...this.toasts].slice(0, TOAST_LIMIT)
    this.notify()

    return id
  },
  dismissToast(toastId) {
    const toastTimeout = toastTimeouts.get(toastId)
    if (toastTimeout) {
      clearTimeout(toastTimeout)
      toastTimeouts.delete(toastId)
    }

    this.toasts = this.toasts.map((t) => (t.id === toastId ? { ...t, open: false } : t))
    this.notify()

    setTimeout(() => {
      this.toasts = this.toasts.filter((t) => t.id !== toastId)
      this.notify()
    }, TOAST_REMOVE_DELAY)
  },
}

export function useToast() {
  const [toasts, setToasts] = useState(toastState.toasts)

  useEffect(() => {
    return toastState.subscribe(setToasts)
  }, [])

  return {
    toasts,
    toast: (props) => toastState.addToast(props),
    dismiss: (toastId) => toastState.dismissToast(toastId),
  }
}
