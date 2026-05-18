import { create } from 'zustand'

type State = {
  query: string
  setQuery: (q: string) => void
}

export const useSearchStore = create<State>((set) => ({
  query: '',
  setQuery: (q) => set({ query: q }),
}))

export default useSearchStore
