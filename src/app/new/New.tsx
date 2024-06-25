"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { createBox } from "./actions"

export default function New() {
  const [items, setItems] = useState([{ name: "", amount: "" }])
  const [selected, setSelected] = useState(false)

  const { pending } = useFormStatus()

  const createBoxWithItems = createBox.bind(null, items)

  const change = (index: number, field: string, value: string) => {
    const newItems = [...items] as any
    newItems[index][field] = value
    setItems(newItems)
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => {
          setItems([...items, { name: "", amount: "" }])
        }}
        className="rounded bg-gray-600 p-2"
      >
        Add More Items
      </button>

      <form action={createBoxWithItems} className="flex flex-col gap-2">
        {items.map((item, i) => {
          return (
            <div key={i} className="flex gap-2">
              <input
                value={item.name}
                onChange={(e) => change(i, "name", e.target.value)}
                placeholder="Name"
                className="w-full rounded bg-gray-700 p-2"
              />
              <input
                value={item.amount}
                onChange={(e) => change(i, "amount", e.target.value)}
                type="number"
                placeholder="Amount"
                className="w-full rounded bg-gray-700 p-2"
              />
            </div>
          )
        })}

        <input
          name="tags"
          placeholder="Tags"
          className="rounded bg-gray-700 p-2"
        />

        <div className="flex items-center">
          <label
            htmlFor="file"
            tabIndex={0}
            className={
              "w-full cursor-pointer rounded p-2 text-center " +
              (selected ? "bg-green-500" : "bg-red-500")
            }
          >
            {selected ? "File Selected" : "Select File"}
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            onChange={() => setSelected(true)}
            className="hidden"
          />
        </div>

        <button
          disabled={pending}
          className="rounded bg-gray-600 p-2 disabled:cursor-not-allowed disabled:bg-gray-500"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
