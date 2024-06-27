"use client"

import Link from "next/link"
import { useFormState } from "react-dom"
import { addUser, search } from "./actions"

export default function Admin() {
  const [state, formAction] = useFormState(addUser, { message: "", error: "" })
  const [searchState, searchFormAction] = useFormState(search, [])

  return (
    <>
      <p>Search</p>
      <form action={searchFormAction} className="mb-4 flex flex-col gap-2">
        <div className="flex items-center">
          <p>Sort by: </p>
          <select
            name="filter"
            className="ml-2 rounded border-2 border-gray-700 bg-background p-2"
          >
            <option value="item">Item</option>
            <option value="tag">Tag</option>
          </select>
        </div>

        <input
          name="query"
          placeholder="Query"
          className="rounded border-2 border-gray-700 bg-background p-2"
        />

        <button className="rounded bg-gray-400 p-2 text-background">
          Search
        </button>
      </form>

      {searchState.map((thing: any, i) => {
        return (
          <div key={i}>
            {thing.name ? (
              <div className="mb-3">
                <p>
                  {thing.name}: {thing.amount}
                </p>
                <Link href={"/" + thing.boxId} className="underline">
                  Box {thing.boxId}
                </Link>
              </div>
            ) : (
              <div className="mb-2">
                <Link href={"/" + thing.id} className="underline">
                  Box {thing.id}
                </Link>
              </div>
            )}
          </div>
        )
      })}

      <p className="mt-20">Add User</p>
      <form action={formAction} className="flex flex-col gap-2">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="rounded border-2 border-gray-700 bg-background p-2"
        />

        <button className="rounded bg-gray-400 p-2 text-background">
          Add User
        </button>
      </form>

      {state.message && <p className="text-green-500">{state.message}</p>}
      {state.error && <p className="text-red-500">{state.error}</p>}
    </>
  )
}
